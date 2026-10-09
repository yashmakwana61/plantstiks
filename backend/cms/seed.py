from .core import db, iso
from datetime import datetime, timezone


def to_iso_date(d):
    try:
        return datetime.strptime(d, "%d/%m/%Y").replace(tzinfo=timezone.utc).isoformat()
    except Exception:
        return None


NAV_ITEMS = [
    {"label": "Products", "to": "/products", "enabled": True, "items": [
        {"label": "Compostable Bottles", "to": "/products/bottles"},
        {"label": "Preforms", "to": "/products/preforms"},
        {"label": "Caps & Closures", "to": "/products/caps"},
        {"label": "Jars & Containers", "to": "/products/jars"},
        {"label": "Custom Packaging", "to": "/products/customization"},
    ]},
    {"label": "Technology", "to": "/technology", "enabled": True, "items": [
        {"label": "Materials", "to": "/materials"},
        {"label": "Plant-Based Material", "to": "/technology/material"},
        {"label": "Performance", "to": "/technology#performance"},
        {"label": "Decomposition", "to": "/technology/decomposition"},
        {"label": "Testing & Validation", "to": "/technology/testing"},
        {"label": "Certifications", "to": "/certifications"},
    ]},
    {"label": "Applications", "to": "/applications", "enabled": True, "items": [
        {"label": "Water", "to": "/applications/water"},
        {"label": "Hospitality", "to": "/applications/hospitality"},
        {"label": "Personal Care", "to": "/applications/personal-care"},
        {"label": "Pharma", "to": "/applications/pharma"},
        {"label": "FMCG", "to": "/applications/fmcg"},
    ]},
    {"label": "Network", "to": "/manufacturing-partners", "enabled": True, "items": [
        {"label": "Manufacturing Partners", "to": "/manufacturing-partners"},
        {"label": "From Material to Market", "to": "/technology"},
        {"label": "Global Markets", "to": "/about#scale"},
        {"label": "Partner With Us", "to": "/manufacturing-partners"},
    ]},
    {"label": "About", "to": "/about", "enabled": True, "items": [
        {"label": "Our Story", "to": "/about"},
        {"label": "Our Journey", "to": "/about#journey"},
        {"label": "Sustainability", "to": "/sustainability"},
        {"label": "Certifications", "to": "/certifications"},
        {"label": "FAQs", "to": "/resources#faqs"},
    ]},
    {"label": "Resources", "to": "/resources", "enabled": True, "items": [
        {"label": "Catalogue", "to": "/resources/catalogue"},
        {"label": "Technical Documents", "to": "/resources/technical"},
        {"label": "FAQs", "to": "/resources#faqs"},
    ]},
]

SETTINGS = {
    "brand": {"name": "PLANTSTIKS", "primary_color": "#002A2A", "secondary_color": "#2E7D5E", "logo_media_id": None, "favicon": None},
    "contact": {
        "phones": ["9313938006", "8800211680"],
        "phones_display": ["93139 38006", "88002 11680"],
        "email": "business@plantstiksbottle.in",
        "address_lines": ["Siddhraj Z Square,", "East-307, Kudasan,", "Gandhinagar – 382421"],
        "website": "www.plantstiksbottle.in",
    },
    "social": {"linkedin": "", "instagram": "", "youtube": "", "other": ""},
    "seo_defaults": {
        "title": "Plantstiks | Compostable & Plant-Based Packaging Solutions India & Global",
        "description": "Plantstiks develops advanced plant-based materials and compostable packaging including bottles, preforms, caps, containers, trays, cups, labels and custom packaging solutions for businesses in India and global markets.",
        "og_image": None,
    },
    "analytics": {"google_analytics": "", "search_console": "", "meta_pixel": ""},
    "copyright": "© {year} Plantstiks. All rights reserved.",
    "whatsapp": "919313938006",
}

FOOTER = {
    "description": "Packaging, reinvented by plants. Advanced materials. Better packaging. A cleaner future.",
    "columns": [
        {"title": "Products", "links": [{"label": "Compostable Bottles", "to": "/products/bottles"}, {"label": "Preforms", "to": "/products/preforms"}, {"label": "Caps & Closures", "to": "/products/caps"}, {"label": "Jars & Containers", "to": "/products/jars"}, {"label": "Custom Packaging", "to": "/products/customization"}]},
        {"title": "Technology", "links": [{"label": "Materials", "to": "/materials"}, {"label": "Plant-Based Material", "to": "/technology/material"}, {"label": "Performance", "to": "/technology#performance"}, {"label": "Decomposition", "to": "/technology/decomposition"}, {"label": "Testing & Validation", "to": "/technology/testing"}]},
        {"title": "Applications", "links": [{"label": "Water", "to": "/applications/water"}, {"label": "Hospitality", "to": "/applications/hospitality"}, {"label": "Personal Care", "to": "/applications/personal-care"}, {"label": "Pharma", "to": "/applications/pharma"}, {"label": "FMCG", "to": "/applications/fmcg"}]},
    ],
    "legal": [{"label": "Privacy Policy", "to": "/privacy"}, {"label": "Terms", "to": "/terms"}, {"label": "Cookie Policy", "to": "/cookies"}],
    "newsletter_cta": "",
}

PREFORMS = [
    {"name": "Plantstiks 13.5g Preform", "weight_grams": 13.5, "volume_range": "~150 ml – 500 ml", "use_cases": ["Small pack sizes", "Lightweight applications", "Samples", "Travel packs", "Single-serve bottles"], "status": "published", "sort_order": 1, "notes": "", "image": None},
    {"name": "Plantstiks 19g Preform", "weight_grams": 19, "volume_range": "~200 ml – 1 L", "use_cases": ["Water", "Beverages", "Personal care liquids"], "status": "published", "sort_order": 2, "notes": "", "image": None},
    {"name": "Plantstiks 36g Preform", "weight_grams": 36, "volume_range": "~500 ml – 2 L", "use_cases": ["Bulk water", "Edible liquids", "Refill packs"], "status": "published", "sort_order": 3, "notes": "", "image": None},
]

MOULDS = [
    {"name": "13.5g Preform Mould", "weight": "13.5g", "neck_size": "Needs Verification", "bottle_volume": "~150 ml – 500 ml", "colour": "Natural", "finish": "Needs Verification", "uv_protection": "Needs Verification", "application": "Small pack sizes, samples, travel packs", "notes": "", "availability": "Available", "featured": False, "sort_order": 1},
    {"name": "19g Preform Mould", "weight": "19g", "neck_size": "Needs Verification", "bottle_volume": "~200 ml – 1 L", "colour": "Natural", "finish": "Needs Verification", "uv_protection": "Needs Verification", "application": "Water, beverages, personal care liquids", "notes": "", "availability": "Available", "featured": True, "sort_order": 2},
    {"name": "36g Preform Mould", "weight": "36g", "neck_size": "Needs Verification", "bottle_volume": "~500 ml – 2 L", "colour": "Natural", "finish": "Needs Verification", "uv_protection": "Needs Verification", "application": "Bulk water, edible liquids, refill packs", "notes": "", "availability": "Available", "featured": False, "sort_order": 3},
]

APPLICATIONS = [
    {"name": "Packaged Drinking Water", "slug": "water", "short_description": "Differentiated, sustainable water packaging.", "long_description": "Plant-based bottles, preforms and caps for water brands seeking differentiated sustainable packaging.", "benefits": [], "published": True, "sort_order": 1, "related_products": [], "notes": ""},
    {"name": "Hospitality", "slug": "hospitality", "short_description": "Premium bottles for hotels and events.", "long_description": "Custom branded plant-based water bottles for hotels, resorts, restaurants, cafés, events and institutions.", "benefits": [], "published": True, "sort_order": 2, "related_products": [], "notes": ""},
    {"name": "Still Beverages & Juices", "slug": "beverages", "short_description": "Fresh from fill to fridge.", "long_description": "Bottle formats for juices and selected beverage applications.", "benefits": [], "published": True, "sort_order": 3, "related_products": [], "notes": ""},
    {"name": "Personal Care & Cosmetics", "slug": "personal-care", "short_description": "Premium you can hold.", "long_description": "Custom bottles, jars, caps and containers designed around branding, functionality and sustainability.", "benefits": [], "published": True, "sort_order": 4, "related_products": [], "notes": ""},
    {"name": "Pharmaceuticals & Nutraceuticals", "slug": "pharma", "short_description": "Validated before it ships.", "long_description": "Plant-based rigid packaging developed subject to required compatibility, stability and regulatory validation.", "benefits": [], "published": True, "sort_order": 5, "related_products": [], "notes": ""},
    {"name": "FMCG", "slug": "fmcg", "short_description": "Built for scale.", "long_description": "Custom plant-based packaging development for brands reducing dependence on conventional fossil-based packaging.", "benefits": [], "published": True, "sort_order": 6, "related_products": [], "notes": ""},
    {"name": "Corporate & Institutional", "slug": "institutional", "short_description": "Measurable alternatives, at campus scale.", "long_description": "Sustainable packaging programs for organizations, universities, campuses, events and institutions.", "benefits": [], "published": True, "sort_order": 7, "related_products": [], "notes": ""},
    {"name": "Food & Beverage", "slug": "food-packaging", "short_description": "Formats for every counter.", "long_description": "Bottles, cups, trays, containers, lids and other selected food and beverage formats.", "benefits": [], "published": True, "sort_order": 8, "related_products": [], "notes": ""},
]

DOCS = [
    {"name": "CIPET — Material Identification", "doc_type": "Material Identification", "organization": "CIPET", "report_number": "Needs Verification", "issue_date": None, "applicable_product": "PLA Bottle", "material": "PLA", "summary": "The tested sample is identified as a PLA bottle. Material identification reports Poly Lactic Acid (PLA).", "pdf_media_id": None, "visibility": "private", "status": "published", "category": "MATERIAL", "review_date": None, "notes": "Scope limited to the tested sample."},
    {"name": "Indian Institute of Packaging — Specific Migration", "doc_type": "Migration Testing", "organization": "Indian Institute of Packaging", "report_number": "Needs Verification", "issue_date": None, "applicable_product": "PLA Bottle", "material": "PLA", "summary": "The sample is identified as PLA and specific migration testing was carried out. The listed requirements are marked “Complies”.", "pdf_media_id": None, "visibility": "private", "status": "published", "category": "MIGRATION", "review_date": None, "notes": "Complies applies to the listed tested parameters only."},
    {"name": "Compliance Results — Tested Parameters", "doc_type": "Technical Report", "organization": "Needs Verification", "report_number": "Needs Verification", "issue_date": None, "applicable_product": "PLA Bottle", "material": "PLA", "summary": "Report lists PLA as the material and shows compliance results for the tested parameters.", "pdf_media_id": None, "visibility": "private", "status": "published", "category": "TECHNICAL TESTING", "review_date": None, "notes": ""},
    {"name": "Food-Grade Documentation", "doc_type": "Food Contact", "organization": "Needs Verification", "report_number": "", "issue_date": None, "applicable_product": "Bottles & Preforms", "material": "PLA", "summary": "Catalogue states 0% migration. Full food-safety documentation can be shared for your evaluation.", "pdf_media_id": None, "visibility": "private", "status": "draft", "category": "FOOD SAFETY", "review_date": None, "notes": "Placeholder — upload document."},
    {"name": "Biodegradability Dossier", "doc_type": "Technical Report", "organization": "Needs Verification", "report_number": "", "issue_date": None, "applicable_product": "System", "material": "PLA", "summary": "The material is plant-based and biodegradable. Documented evidence shared with serious enquiries — no timelines published without support.", "pdf_media_id": None, "visibility": "private", "status": "draft", "category": "BIODEGRADABILITY", "review_date": None, "notes": "Placeholder — upload document."},
    {"name": "Compostability Documentation", "doc_type": "Certification", "organization": "Needs Verification", "report_number": "", "issue_date": None, "applicable_product": "System", "material": "PLA", "summary": "Industrially compostable packaging system. Documentation shared contextually with the relevant certificates for each market.", "pdf_media_id": None, "visibility": "private", "status": "draft", "category": "COMPOSTABILITY", "review_date": None, "notes": "Placeholder — upload document."},
]

FAQS = [
    {"question": "What is Plantstiks?", "answer": "Plantstiks is an advanced material and packaging technology company developing plant-based material formulations and sustainable packaging solutions including bottles, preforms, caps, containers, trays, cups and other packaging applications.", "category": "Company", "sort_order": 1, "published": True},
    {"question": "Does Plantstiks manufacture biodegradable bottles?", "answer": "Plantstiks develops plant-based and compostable bottle solutions using materials and proprietary formulations selected according to the application. The exact environmental claim depends on the material grade, certification and applicable end-of-life conditions.", "category": "Product", "sort_order": 2, "published": True},
    {"question": "What materials does Plantstiks use?", "answer": "Our technology platform works with plant-based and compostable polymers including PLA, PHA and proprietary blends developed for different packaging applications.", "category": "Material", "sort_order": 3, "published": True},
    {"question": "Are Plantstiks bottles compostable?", "answer": "Specific Plantstiks products can be designed using compostable materials. Compostability should be assessed according to the exact material/product certification and applicable standard rather than making a blanket claim across every product.", "category": "Product", "sort_order": 4, "published": True},
    {"question": "What is PLA packaging?", "answer": "PLA, or polylactic acid, is a bio-based polymer commonly derived from renewable feedstocks and used in various packaging applications. End-of-life claims depend on the specific grade and certified conditions.", "category": "Material", "sort_order": 5, "published": True},
    {"question": "What is PHA packaging?", "answer": "PHA refers to a family of biopolymers produced through biological processes. PHA materials are increasingly explored for sustainable packaging applications because of their bio-based origin and potential end-of-life advantages.", "category": "Material", "sort_order": 6, "published": True},
    {"question": "Does Plantstiks provide custom packaging?", "answer": "Yes. Plantstiks can work with brands on custom materials, bottle designs, preforms, containers, caps, moulds and other packaging formats subject to technical feasibility and commercial volumes.", "category": "Service", "sort_order": 7, "published": True},
    {"question": "Can Plantstiks supply internationally?", "answer": "Plantstiks is developing its supply and manufacturing network for customers in India and international markets. Export requirements are evaluated based on destination, product, volume, certification and logistics.", "category": "Company", "sort_order": 8, "published": True},
    {"question": "Can existing packaging manufacturers work with Plantstiks?", "answer": "Yes. Qualified manufacturers with compatible injection moulding, preform, bottle blowing, extrusion, thermoforming or related infrastructure can apply to join the Plantstiks manufacturing network.", "category": "Network", "sort_order": 9, "published": True},
    {"question": "Can I request samples?", "answer": "Yes. Businesses can submit their product, volume and packaging requirements to the Plantstiks team for sample availability, development options and commercial quotation.", "category": "Service", "sort_order": 10, "published": True},
]

PRODUCTS = [
    {"name": "Compostable Bottles", "slug": "/products/bottles", "sku": "PS-BTL", "type": "bottle", "status": "published", "short_description": "Plant-based bottles engineered for water, beverages, hospitality, personal care, nutraceutical, pharmaceutical and other selected applications.", "long_description": "Available in multiple capacities, shapes, neck finishes, colours and custom designs. Packaged drinking water, still beverages, hospitality water, juices and selected beverages, personal care products, nutraceuticals, pharmaceutical packaging, institutional packaging and custom brand applications.", "featured": True, "sort_order": 1},
    {"name": "Compostable Preforms", "slug": "/products/preforms", "sku": "PS-PRF", "type": "preform", "status": "published", "short_description": "Plant-based preforms designed for scalable bottle manufacturing.", "long_description": "Plantstiks works with manufacturers and brands to develop preform weights, neck configurations and bottle designs based on product and processing requirements.", "featured": True, "sort_order": 2},
    {"name": "Compostable Caps & Closures", "slug": "/products/caps", "sku": "PS-CAP", "type": "cap", "status": "published", "short_description": "Plant-based cap and closure solutions engineered to complement bottles and preforms.", "long_description": "A sustainable bottle needs more than a sustainable body. Plantstiks develops plant-based cap and closure solutions while maintaining functionality, sealing and brand compatibility.", "featured": True, "sort_order": 3},
    {"name": "Jars & Containers", "slug": "/products/jars", "sku": "PS-JAR", "type": "other", "status": "published", "short_description": "Plant-based rigid packaging for food, nutraceuticals, personal care, cosmetics, hospitality and FMCG.", "long_description": "Plant-based rigid packaging for food products, dry foods, nutraceuticals, personal care, cosmetics, hospitality, FMCG and specialty applications. Custom shapes, sizes and material grades can be developed based on product requirements.", "featured": True, "sort_order": 4},
    {"name": "Trays, Cups & Lids", "slug": "/products/trays", "sku": "PS-TRY", "type": "other", "status": "published", "short_description": "Thermoformed plant-based packaging — food trays, clamshells, cups, lids, deli and takeaway packaging.", "long_description": "Plantstiks material technology can be processed into thermoformed packaging such as food trays, clamshell containers, cups, lids, deli containers, produce packaging, takeaway packaging and institutional food packaging.", "featured": True, "sort_order": 5},
    {"name": "Labels, Films & Shrink Solutions", "slug": "/products/labels", "sku": "PS-LBL", "type": "label", "status": "published", "short_description": "An integrated packaging ecosystem covering bottles, closures, labels, films and other components.", "long_description": "Packaging sustainability should not stop at the container. Plantstiks is developing an integrated packaging ecosystem to help brands transition toward more complete sustainable packaging systems.", "featured": True, "sort_order": 6},
    {"name": "Custom Packaging", "slug": "/products/customization", "sku": "PS-CST", "type": "other", "status": "published", "short_description": "Material formulation, mould development, product engineering and packaging development for unique requirements.", "long_description": "Material selection and formulation, bottle and container design, preform development, weight optimization, neck-finish selection, cap development, mould coordination, prototype development, manufacturing trials, performance validation, packaging testing and scale-up support.", "featured": False, "sort_order": 7},
]

PAGES = [
    {"title": "Home", "internal_name": "Home", "slug": "/", "template": "home", "status": "published", "sections": [], "featured_image": None},
    {"title": "Products", "internal_name": "Products Overview", "slug": "/products", "template": "standard", "status": "published", "sections": [], "featured_image": None},
    {"title": "Preforms", "internal_name": "Preforms Product", "slug": "/products/preforms", "template": "product", "status": "published", "sections": [], "featured_image": None},
    {"title": "Bottles", "internal_name": "Bottles Product", "slug": "/products/bottles", "template": "product", "status": "published", "sections": [], "featured_image": None},
    {"title": "Technology", "internal_name": "Technology", "slug": "/technology", "template": "standard", "status": "published", "sections": [], "featured_image": None},
    {"title": "Materials", "internal_name": "Material Technology", "slug": "/materials", "template": "standard", "status": "published", "sections": [], "featured_image": None},
    {"title": "Applications", "internal_name": "Applications", "slug": "/applications", "template": "standard", "status": "published", "sections": [], "featured_image": None},
    {"title": "Sustainability", "internal_name": "Sustainability", "slug": "/sustainability", "template": "standard", "status": "published", "sections": [], "featured_image": None},
    {"title": "Testing & Validation", "internal_name": "Science & Testing", "slug": "/technology/testing", "template": "standard", "status": "published", "sections": [], "featured_image": None},
    {"title": "Certifications", "internal_name": "Certifications", "slug": "/certifications", "template": "standard", "status": "published", "sections": [], "featured_image": None},
    {"title": "About", "internal_name": "About Us", "slug": "/about", "template": "standard", "status": "published", "sections": [], "featured_image": None},
    {"title": "Manufacturing Partners", "internal_name": "Manufacturing Network", "slug": "/manufacturing-partners", "template": "standard", "status": "published", "sections": [], "featured_image": None},
    {"title": "Resources", "internal_name": "Resources", "slug": "/resources", "template": "standard", "status": "published", "sections": [], "featured_image": None},
    {"title": "Contact", "internal_name": "Contact", "slug": "/contact", "template": "standard", "status": "published", "sections": [], "featured_image": None},
]

HOME_SECTIONS = [
    {"key": "hero", "label": "Hero", "visible": True, "order": 1, "content": {
        "eyebrow": "ADVANCED MATERIALS • PLANT-BASED PACKAGING",
        "headline_lines": ["PACKAGING,", "REINVENTED", "BY PLANTS."],
        "tagline": "Advanced Materials. Better Packaging. A Cleaner Future.",
        "description": "Plantstiks is an advanced material and packaging technology company developing high-performance, plant-based packaging solutions — from compostable bottles, preforms and caps to containers, jars, trays, cups, lids, labels, films and custom packaging. Our platform works with PLA, PHA and proprietary material blends, engineered for real-world applications.",
        "primary_cta": {"label": "EXPLORE OUR SOLUTIONS", "to": "/products"},
        "secondary_cta": {"label": "REQUEST A SAMPLE", "to": "/contact"},
        "tertiary_cta": {"label": "BECOME A MANUFACTURING PARTNER", "to": "/manufacturing-partners"},
        "trust_line": ["MADE FOR INDIA", "ENGINEERED FOR THE WORLD"],
        "chip_1": {"label": "MATERIALS", "value": "PLA • PHA • BLENDS"},
        "chip_2": {"label": "MODEL", "value": "MATERIAL + NETWORK"},
        "image_media_id": None,
        "video_url": "/plantstiks_loop.mp4",
    }},
    {"key": "marquee", "label": "Marquee", "visible": True, "order": 2, "content": {
        "items": ["ADVANCED MATERIALS", "BETTER PACKAGING", "A CLEANER FUTURE", "PLANT-BASED BOTTLES & PREFORMS", "COMPOSTABLE BY DESIGN", "MADE FOR INDIA", "ENGINEERED FOR THE WORLD"],
    }},
    {"key": "network", "label": "Material Technology + Certified Manufacturing Network", "visible": True, "order": 3, "content": {}},
    {"key": "material_story", "label": "Material Story", "visible": True, "order": 4, "content": {}},
    {"key": "preform_selector", "label": "Preform Selector", "visible": True, "order": 5, "content": {}},
    {"key": "configurator", "label": "Bottle Customization", "visible": True, "order": 6, "content": {}},
    {"key": "performance", "label": "Performance", "visible": True, "order": 7, "content": {}},
    {"key": "science", "label": "Science & Testing", "visible": True, "order": 8, "content": {}},
    {"key": "for_brands", "label": "For Brands", "visible": True, "order": 9, "content": {}},
    {"key": "decomposition", "label": "Decomposition / Lifecycle", "visible": True, "order": 10, "content": {}},
    {"key": "applications", "label": "Applications", "visible": True, "order": 11, "content": {}},
    {"key": "global_markets", "label": "Plantstiks at Scale", "visible": True, "order": 12, "content": {}},
    {"key": "trust", "label": "Enterprise Engagements", "visible": True, "order": 13, "content": {}},
    {"key": "why", "label": "Why Plantstiks", "visible": True, "order": 14, "content": {}},
    {"key": "from_material_to_market", "label": "Technical Partnership", "visible": True, "order": 15, "content": {}},
    {"key": "industries", "label": "Industry Selector", "visible": True, "order": 16, "content": {}},
    {"key": "about", "label": "About Plantstiks", "visible": True, "order": 17, "content": {}},
    {"key": "final_cta", "label": "Final CTA", "visible": True, "order": 18, "content": {}},
    {"key": "contact", "label": "Contact", "visible": True, "order": 19, "content": {}},
]

ROLE_USERS = [
    {"role": "content_manager", "name": "Content Manager"},
    {"role": "product_manager", "name": "Product Manager"},
    {"role": "technical_manager", "name": "Technical Manager"},
    {"role": "marketing_manager", "name": "Marketing Manager"},
    {"role": "sales_manager", "name": "Sales Manager"},
    {"role": "reviewer", "name": "Reviewer"},
]


async def seed():
    # users
    if await db.users.count_documents({}) == 0:
        import os
        from .core import hash_password
        await db.users.insert_one({
            "name": "Plantstiks Admin", "email": os.environ.get("ADMIN_EMAIL", "admin@plantstiksbottle.in").lower(),
            "password_hash": hash_password(os.environ.get("ADMIN_PASSWORD", "Plantstiks@2026")),
            "role": "super_admin", "active": True, "created_at": iso(),
        })
        for u in ROLE_USERS:
            await db.users.insert_one({
                "name": u["name"], "email": f"{u['role']}@plantstiksbottle.in".lower(),
                "password_hash": hash_password("Preview@2026"),
                "role": u["role"], "active": True, "created_at": iso(),
            })

    for name, data in [("settings", SETTINGS), ("navigation", {"items": NAV_ITEMS}), ("footer", FOOTER), ("home_sections", {"sections": HOME_SECTIONS})]:
        if await db[name].count_documents({}) == 0:
            await db[name].insert_one({**data, "created_at": iso(), "updated_at": iso()})

    if await db.preforms.count_documents({}) == 0:
        await db.preforms.insert_many([{**p} for p in PREFORMS])
    if await db.moulds.count_documents({}) == 0:
        await db.moulds.insert_many([{**m} for m in MOULDS])
    if await db.applications.count_documents({}) == 0:
        await db.applications.insert_many([{**a, "created_at": iso(), "updated_at": iso()} for a in APPLICATIONS])
    if await db.documents.count_documents({}) == 0:
        await db.documents.insert_many([{**d, "created_at": iso(), "updated_at": iso()} for d in DOCS])
    if await db.faqs.count_documents({}) == 0:
        await db.faqs.insert_many([{**f, "created_at": iso(), "updated_at": iso()} for f in FAQS])
    if await db.products.count_documents({}) == 0:
        await db.products.insert_many([{**p, "applications": [], "benefits": [], "images": [], "gallery": [], "documents": [], "seo": {}, "created_at": iso(), "updated_at": iso()} for p in PRODUCTS])
    if await db.pages.count_documents({}) == 0:
        await db.pages.insert_many([{**p, "seo": {}, "published_at": iso(), "updated_at": iso()} for p in PAGES])
