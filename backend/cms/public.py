from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel, EmailStr
from typing import Optional
from bson import ObjectId
from .core import db, iso, public_view, notify
from .storage import ensure_object

router = APIRouter(prefix="/api")

ALLOWED_MEDIA = {
    "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp",
    "image/avif": ".avif", "image/svg+xml": ".svg", "video/mp4": ".mp4", "application/pdf": ".pdf",
}


class EnquiryIn(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    country: Optional[str] = None
    industry: Optional[str] = None
    application: Optional[str] = None
    productInterest: Optional[str] = None
    productId: Optional[str] = None
    expectedVolume: Optional[str] = None
    currentPackaging: Optional[str] = None
    requiredVolume: Optional[str] = None
    estimatedQuantity: Optional[str] = None
    message: Optional[str] = None
    source: Optional[str] = "website"
    utmSource: Optional[str] = None
    utmMedium: Optional[str] = None
    utmCampaign: Optional[str] = None


class SampleIn(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    country: Optional[str] = None
    product: Optional[str] = None
    productId: Optional[str] = None
    quantity: Optional[str] = None
    application: Optional[str] = None
    bottleVolume: Optional[str] = None
    message: Optional[str] = None


async def create_lead(payload: dict, lead_type: str):
    lead = {
        **payload,
        "type": lead_type,
        "status": "New",
        "notes": [],
        "assigned_to": None,
        "created_at": iso(),
    }
    res = await db.leads.insert_one(lead)
    label = {"product_enquiry": "New product enquiry", "sample": "New sample request", "contact": "New website enquiry"}.get(lead_type, "New lead")
    await notify(label, f"{payload.get('name')} — {payload.get('company') or payload.get('email')}", "lead", "/cms/leads")
    return str(res.inserted_id)


@router.get("/content")
async def get_content():
    settings = await db.settings.find_one()
    navigation = await db.navigation.find_one()
    footer = await db.footer.find_one()
    home = await db.home_sections.find_one()
    preforms = await db.preforms.find({"status": "published"}).sort("sort_order", 1).to_list(50)
    applications = await db.applications.find({"published": True}).sort("sort_order", 1).to_list(50)
    docs = await db.documents.find({"status": "published"}).sort("sort_order", 1).to_list(50)
    faqs = await db.faqs.find({"published": True}).sort("sort_order", 1).to_list(50)
    products = await db.products.find({"status": "published"}).sort("sort_order", 1).to_list(50)
    redirects = await db.redirects.find({"enabled": True}).to_list(200)
    pages = await db.pages.find({"status": "published"}, {"slug": 1, "seo": 1}).to_list(200)
    return {
        "settings": public_view(settings),
        "navigation": public_view(navigation),
        "footer": public_view(footer),
        "home_sections": [public_view(s) for s in (home or {}).get("sections", [])],
        "preforms": [public_view(p) for p in preforms],
        "applications": [public_view(a) for a in applications],
        "documents": [public_view(d) for d in docs],
        "faqs": [public_view(f) for f in faqs],
        "products": [public_view(p) for p in products],
        "pages": [{"slug": p.get("slug"), "seo": p.get("seo") or {}} for p in pages],
        "redirects": [{"old_path": r["old_path"], "new_path": r["new_path"], "type": r.get("type", "301")} for r in redirects],
    }


@router.get("/pages/{slug:path}")
async def get_page(slug: str, preview: bool = False):
    q = {"slug": f"/{slug}".replace("//", "/")}
    if not preview:
        q["status"] = "published"
    page = await db.pages.find_one(q, sort=[("updated_at", -1)])
    if not page:
        raise HTTPException(status_code=404, detail="Page not found")
    return public_view(page)


@router.post("/enquiries")
async def post_enquiry(input: EnquiryIn):
    pid = await create_lead(input.model_dump(), "product_enquiry" if input.productId else "contact")
    return {"ok": True, "id": pid}


@router.post("/sample-requests")
async def post_sample(input: SampleIn):
    pid = await create_lead(input.model_dump(), "sample")
    return {"ok": True, "id": pid}


async def _media_doc(media_id: str):
    try:
        doc = await db.media.find_one({"_id": ObjectId(media_id)})
    except Exception:
        doc = None
    return doc or await db.media.find_one({"_id": media_id})


@router.get("/media/{media_id}")
async def media_file(media_id: str):
    m = await _media_doc(media_id)
    if not m:
        raise HTTPException(status_code=404, detail="Not found")
    data, ctype = await ensure_object(m)
    return Response(content=data, media_type=ctype or m.get("mime", "application/octet-stream"),
                    headers={"Cache-Control": "public, max-age=86400"})


@router.get("/documents/{doc_id}/pdf")
async def document_pdf(doc_id: str):
    d = await db.documents.find_one({"_id": doc_id})
    if not d or d.get("visibility") != "public" or not d.get("pdf_media_id"):
        raise HTTPException(status_code=404, detail="Not available")
    m = await _media_doc(d["pdf_media_id"])
    if not m:
        raise HTTPException(status_code=404, detail="File missing")
    data, _ = await ensure_object(m)
    return Response(content=data, media_type="application/pdf",
                    headers={"Content-Disposition": f'inline; filename="{m.get("filename", "document.pdf")}"'})


@router.get("/sitemap.xml")
async def sitemap():
    base = "https://www.plantstiksbottle.in"
    urls = ["/", "/products", "/products/preforms", "/products/bottles", "/products/caps", "/products/jars", "/products/trays", "/products/customization", "/technology", "/materials", "/technology/material", "/technology/decomposition", "/technology/testing", "/applications", "/about", "/sustainability", "/certifications", "/manufacturing-partners", "/resources", "/resources/catalogue", "/resources/technical", "/contact"]
    for c, cond in [("pages", {"status": "published"}), ("products", {"status": "published"}), ("applications", {"published": True}), ("blog", {"status": "published"}), ("case_studies", {"published": True})]:
        async for d in db[c].find(cond, {"slug": 1}):
            slug = d.get("slug")
            if slug and slug not in urls:
                urls.append(slug if slug.startswith("/") else f"/{slug}")
    xml = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        xml.append(f"<url><loc>{base}{u}</loc></url>")
    xml.append("</urlset>")
    return Response(content="\n".join(xml), media_type="application/xml")


@router.get("/health")
async def health():
    return {"status": "ok"}
