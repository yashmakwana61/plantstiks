export const SIDEBAR = [
  { label: "Dashboard", items: [{ label: "Dashboard", to: "/cms", module: "dashboard" }] },
  {
    label: "Content",
    items: [
      { label: "Pages", to: "/cms/c/pages", module: "pages" },
      { label: "Homepage", to: "/cms/homepage", module: "homepage" },
      { label: "Navigation", to: "/cms/single/navigation", module: "navigation" },
      { label: "Footer", to: "/cms/single/footer", module: "footer" },
      { label: "Blog", to: "/cms/c/blog", module: "blog" },
      { label: "Case Studies", to: "/cms/c/case_studies", module: "case_studies" },
      { label: "FAQs", to: "/cms/c/faqs", module: "faqs" },
    ],
  },
  {
    label: "Products",
    items: [
      { label: "Products", to: "/cms/c/products", module: "products" },
      { label: "Preforms", to: "/cms/c/preforms", module: "preforms" },
      { label: "Bottle Moulds", to: "/cms/c/moulds", module: "moulds" },
      { label: "Applications", to: "/cms/c/applications", module: "applications" },
    ],
  },
  {
    label: "Science",
    items: [{ label: "Technical Documents", to: "/cms/c/documents", module: "documents" }],
  },
  {
    label: "Media",
    items: [{ label: "Media Library", to: "/cms/media", module: "media" }],
  },
  {
    label: "Leads",
    items: [{ label: "Leads & Enquiries", to: "/cms/leads", module: "leads" }],
  },
  {
    label: "SEO",
    items: [
      { label: "Page SEO", to: "/cms/c/pages", module: "pages", note: "edit page → SEO tab" },
      { label: "Redirects", to: "/cms/c/redirects", module: "seo" },
      { label: "Sitemap", to: "/cms/sitemap", module: "seo" },
    ],
  },
  {
    label: "Settings",
    items: [
      { label: "Website Settings", to: "/cms/single/settings", module: "settings" },
      { label: "Users", to: "/cms/users", module: "users" },
      { label: "Audit Log", to: "/cms/audit", module: "audit" },
    ],
  },
];

const SEO_FIELDS = [
  { k: "seo.title", label: "SEO TITLE", type: "text" },
  { k: "seo.meta_description", label: "META DESCRIPTION", type: "textarea" },
  { k: "seo.canonical", label: "CANONICAL URL", type: "text" },
  { k: "seo.og_title", label: "OG TITLE", type: "text" },
  { k: "seo.og_description", label: "OG DESCRIPTION", type: "textarea" },
  { k: "seo.og_image", label: "OG IMAGE", type: "media" },
  { k: "seo.schema_type", label: "SCHEMA TYPE", type: "text", placeholder: "Product, Article, WebPage…" },
  { k: "seo.no_index", label: "NO INDEX", type: "bool" },
];

const WORKFLOW = ["draft", "in_review", "approved", "published", "archived"];

export const SCHEMAS = {
  pages: {
    label: "Pages", workflow: true, nameField: "title",
    columns: [
      { k: "title", label: "PAGE" }, { k: "slug", label: "URL", mono: true },
      { k: "status", label: "STATUS", type: "badge" }, { k: "updated_at", label: "UPDATED", type: "date" },
    ],
    fields: [
      { k: "title", label: "PAGE NAME", type: "text" },
      { k: "internal_name", label: "INTERNAL NAME", type: "text" },
      { k: "slug", label: "URL SLUG", type: "text", placeholder: "/about" },
      { k: "template", label: "TEMPLATE", type: "select", options: ["standard", "home", "product"] },
      { k: "featured_image", label: "FEATURED IMAGE", type: "media" },
      { k: "status", label: "STATUS", type: "select", options: WORKFLOW },
      { label: "SEO", type: "sub", fields: SEO_FIELDS },
    ],
  },
  products: {
    label: "Products", workflow: true, nameField: "name",
    columns: [
      { k: "name", label: "PRODUCT" }, { k: "sku", label: "SKU", mono: true },
      { k: "type", label: "TYPE" }, { k: "status", label: "STATUS", type: "badge" },
      { k: "updated_at", label: "UPDATED", type: "date" },
    ],
    filters: [{ k: "type", label: "TYPE", options: ["preform", "bottle", "cap", "label", "other"] }, { k: "status", label: "STATUS", options: WORKFLOW }],
    fields: [
      { k: "name", label: "PRODUCT NAME", type: "text" },
      { k: "slug", label: "URL SLUG", type: "text", placeholder: "/products/bottles", tip: "matches the public page — e.g. /products/preforms" },
      { k: "sku", label: "INTERNAL SKU", type: "text" },
      { k: "type", label: "PRODUCT TYPE", type: "select", options: ["preform", "bottle", "cap", "label", "other"] },
      { k: "status", label: "STATUS", type: "select", options: WORKFLOW },
      { k: "short_description", label: "SHORT DESCRIPTION", type: "textarea" },
      { k: "long_description", label: "LONG DESCRIPTION", type: "textarea", rows: 5 },
      { k: "weight", label: "WEIGHT", type: "text", placeholder: "e.g. 19g" },
      { k: "neck_size", label: "NECK SIZE", type: "text", tip: "Needs Verification if unsure" },
      { k: "volume_range", label: "BOTTLE VOLUME RANGE", type: "text", placeholder: "~200 ml – 1 L" },
      { k: "applications", label: "APPLICATIONS", type: "tags" },
      { k: "benefits", label: "BENEFITS", type: "tags" },
      { k: "images", label: "PRODUCT IMAGES", type: "medialist" },
      { k: "gallery", label: "GALLERY", type: "medialist" },
      { k: "featured", label: "FEATURED", type: "bool" },
      { k: "sort_order", label: "SORT ORDER", type: "number" },
      { label: "SEO", type: "sub", fields: SEO_FIELDS },
    ],
  },
  preforms: {
    label: "Preforms", workflow: true, nameField: "name",
    columns: [
      { k: "name", label: "PREFORM" }, { k: "weight_grams", label: "WEIGHT", type: "num" },
      { k: "volume_range", label: "BOTTLE RANGE" }, { k: "status", label: "STATUS", type: "badge" },
    ],
    fields: [
      { k: "name", label: "PREFORM NAME", type: "text" },
      { k: "tagline", label: "POSITIONING LABEL", type: "text", placeholder: "e.g. BALANCED PERFORMANCE" },
      { k: "weight_grams", label: "WEIGHT (GRAMS)", type: "number" },
      { k: "volume_range", label: "TYPICAL BOTTLE RANGE", type: "text", placeholder: "~200 ml – 1 L" },
      { k: "use_cases", label: "USE CASES", type: "tags" },
      { k: "status", label: "STATUS", type: "select", options: WORKFLOW },
      { k: "image", label: "IMAGE", type: "media" },
      { k: "notes", label: "TECHNICAL NOTES", type: "textarea" },
      { k: "sort_order", label: "SORT ORDER", type: "number" },
    ],
  },
  moulds: {
    label: "Bottle Moulds", nameField: "name",
    columns: [
      { k: "name", label: "MOULD" }, { k: "weight", label: "WEIGHT" },
      { k: "bottle_volume", label: "VOLUME" }, { k: "colour", label: "COLOUR" },
      { k: "availability", label: "AVAILABILITY", type: "badge" },
    ],
    filters: [
      { k: "colour", label: "COLOUR", options: ["Natural", "Milky White", "Amber", "Custom", "Needs Verification"] },
      { k: "availability", label: "AVAILABILITY", options: ["Available", "In Use", "Retired", "Needs Verification"] },
    ],
    fields: [
      { k: "name", label: "MOULD NAME", type: "text" },
      { k: "weight", label: "WEIGHT", type: "text" },
      { k: "neck_size", label: "NECK SIZE", type: "text", tip: "Needs Verification if unsure" },
      { k: "bottle_volume", label: "BOTTLE VOLUME", type: "text" },
      { k: "colour", label: "COLOUR", type: "select", options: ["Natural", "Milky White", "Amber", "Custom", "Needs Verification"] },
      { k: "finish", label: "FINISH", type: "select", options: ["Gloss", "Matte", "Needs Verification"] },
      { k: "uv_protection", label: "UV PROTECTION", type: "select", options: ["Yes", "No", "Needs Verification"] },
      { k: "application", label: "APPLICATION", type: "text" },
      { k: "image", label: "IMAGE", type: "media" },
      { k: "notes", label: "TECHNICAL NOTES", type: "textarea" },
      { k: "availability", label: "AVAILABILITY", type: "select", options: ["Available", "In Use", "Retired", "Needs Verification"] },
      { k: "featured", label: "FEATURED", type: "bool" },
      { k: "sort_order", label: "SORT ORDER", type: "number" },
    ],
  },
  applications: {
    label: "Applications", nameField: "name",
    columns: [
      { k: "name", label: "APPLICATION" }, { k: "slug", label: "SLUG", mono: true },
      { k: "published", label: "PUBLISHED", type: "bool" }, { k: "sort_order", label: "ORDER", type: "num" },
    ],
    fields: [
      { k: "name", label: "APPLICATION NAME", type: "text" },
      { k: "slug", label: "SLUG", type: "text" },
      { k: "short_description", label: "SHORT DESCRIPTION", type: "textarea" },
      { k: "long_description", label: "LONG DESCRIPTION", type: "textarea", rows: 4 },
      { k: "hero_image", label: "HERO IMAGE", type: "media" },
      { k: "gallery", label: "GALLERY", type: "medialist" },
      { k: "related_products", label: "RELATED PRODUCTS", type: "tags" },
      { k: "benefits", label: "BENEFITS", type: "tags" },
      { k: "notes", label: "TECHNICAL NOTES", type: "textarea" },
      { k: "published", label: "PUBLISHED", type: "bool" },
      { k: "sort_order", label: "SORT ORDER", type: "number" },
      { label: "SEO", type: "sub", fields: SEO_FIELDS },
    ],
  },
  documents: {
    label: "Technical Documents", workflow: true, nameField: "name",
    columns: [
      { k: "name", label: "DOCUMENT" }, { k: "doc_type", label: "TYPE" },
      { k: "organization", label: "ORGANIZATION" }, { k: "status", label: "STATUS", type: "badge" },
      { k: "visibility", label: "VISIBILITY", type: "badge" },
    ],
    filters: [
      { k: "doc_type", label: "TYPE", options: ["Material Identification", "Migration Testing", "Packaging Testing", "Food Contact", "ASTM Testing", "Certification", "Technical Report", "Other"] },
      { k: "status", label: "STATUS", options: WORKFLOW },
    ],
    fields: [
      { k: "name", label: "DOCUMENT NAME", type: "text" },
      { k: "doc_type", label: "DOCUMENT TYPE", type: "select", options: ["Material Identification", "Migration Testing", "Packaging Testing", "Food Contact", "ASTM Testing", "Certification", "Technical Report", "Other"] },
      { k: "organization", label: "TESTING ORGANIZATION", type: "text" },
      { k: "report_number", label: "REPORT NUMBER", type: "text", tip: "Needs Verification if unsure" },
      { k: "issue_date", label: "ISSUE DATE", type: "date" },
      { k: "applicable_product", label: "APPLICABLE PRODUCT", type: "text" },
      { k: "material", label: "MATERIAL", type: "text" },
      { k: "summary", label: "SUMMARY (WHAT IT STATES)", type: "textarea", rows: 4 },
      { k: "pdf_media_id", label: "PDF FILE", type: "media" },
      { k: "visibility", label: "VISIBILITY", type: "select", options: ["public", "private"] },
      { k: "status", label: "STATUS", type: "select", options: WORKFLOW },
      { k: "category", label: "CATEGORY", type: "select", options: ["MATERIAL", "FOOD SAFETY", "MIGRATION", "BIODEGRADABILITY", "COMPOSTABILITY", "REGULATORY", "TECHNICAL TESTING"] },
      { k: "review_date", label: "REVIEW DATE", type: "date" },
      { k: "notes", label: "NOTES", type: "textarea" },
      { k: "sort_order", label: "SORT ORDER", type: "number" },
    ],
  },
  blog: {
    label: "Blog", workflow: true, nameField: "title",
    columns: [
      { k: "title", label: "TITLE" }, { k: "category", label: "CATEGORY" },
      { k: "status", label: "STATUS", type: "badge" }, { k: "publish_date", label: "PUBLISH DATE", type: "date" },
    ],
    fields: [
      { k: "title", label: "TITLE", type: "text" },
      { k: "slug", label: "SLUG", type: "text" },
      { k: "excerpt", label: "EXCERPT", type: "textarea" },
      { k: "content", label: "CONTENT", type: "textarea", rows: 10 },
      { k: "featured_image", label: "FEATURED IMAGE", type: "media" },
      { k: "author", label: "AUTHOR", type: "text" },
      { k: "category", label: "CATEGORY", type: "text" },
      { k: "tags", label: "TAGS", type: "tags" },
      { k: "related_products", label: "RELATED PRODUCTS", type: "tags" },
      { k: "related_applications", label: "RELATED APPLICATIONS", type: "tags" },
      { k: "status", label: "STATUS", type: "select", options: WORKFLOW },
      { k: "publish_date", label: "PUBLISH DATE", type: "date" },
      { label: "SEO", type: "sub", fields: SEO_FIELDS },
    ],
  },
  case_studies: {
    label: "Case Studies", nameField: "title",
    columns: [
      { k: "title", label: "CASE STUDY" }, { k: "client", label: "CLIENT" },
      { k: "industry", label: "INDUSTRY" }, { k: "publicly_approved", label: "PUBLIC", type: "bool" },
    ],
    fields: [
      { k: "title", label: "TITLE", type: "text" },
      { k: "client", label: "CLIENT", type: "text", tip: "never public without approval" },
      { k: "industry", label: "INDUSTRY", type: "text" },
      { k: "challenge", label: "CHALLENGE", type: "textarea" },
      { k: "solution", label: "PLANTSTIKS SOLUTION", type: "textarea" },
      { k: "results", label: "RESULTS", type: "textarea" },
      { k: "quote", label: "QUOTE", type: "textarea" },
      { k: "images", label: "IMAGES", type: "medialist" },
      { k: "products_used", label: "PRODUCT USED", type: "tags" },
      { k: "application", label: "APPLICATION", type: "text" },
      { k: "published", label: "PUBLISHED", type: "bool" },
      { k: "publicly_approved", label: "PUBLICLY APPROVED", type: "bool", tip: "client name stays private until approved" },
      { label: "SEO", type: "sub", fields: SEO_FIELDS },
    ],
  },
  faqs: {
    label: "FAQs", nameField: "question",
    columns: [
      { k: "question", label: "QUESTION" }, { k: "category", label: "CATEGORY" },
      { k: "published", label: "PUBLISHED", type: "bool" },
    ],
    fields: [
      { k: "question", label: "QUESTION", type: "text" },
      { k: "answer", label: "ANSWER", type: "textarea", rows: 4 },
      { k: "category", label: "CATEGORY", type: "text" },
      { k: "related_product", label: "RELATED PRODUCT", type: "text" },
      { k: "related_application", label: "RELATED APPLICATION", type: "text" },
      { k: "sort_order", label: "SORT ORDER", type: "number" },
      { k: "published", label: "PUBLISHED", type: "bool" },
    ],
  },
  redirects: {
    label: "Redirects", nameField: "old_path",
    columns: [
      { k: "old_path", label: "OLD URL", mono: true }, { k: "new_path", label: "NEW URL", mono: true },
      { k: "type", label: "TYPE" }, { k: "enabled", label: "ENABLED", type: "bool" },
    ],
    fields: [
      { k: "old_path", label: "OLD URL", type: "text", placeholder: "/old-page" },
      { k: "new_path", label: "NEW URL", type: "text", placeholder: "/new-page" },
      { k: "type", label: "REDIRECT TYPE", type: "select", options: ["301", "302"] },
      { k: "enabled", label: "ENABLED", type: "bool" },
    ],
  },
};

export const SINGLETON_SCHEMAS = {
  settings: {
    label: "Website Settings",
    fields: [
      { label: "BRAND", type: "sub" },
      { k: "brand.name", label: "BRAND NAME", type: "text" },
      { k: "brand.primary_color", label: "PRIMARY COLOR", type: "color" },
      { k: "brand.secondary_color", label: "SECONDARY COLOR", type: "color" },
      { label: "CONTACT", type: "sub" },
      { k: "contact.email", label: "EMAIL", type: "text" },
      { k: "contact.website", label: "WEBSITE", type: "text" },
      { k: "contact.phones", label: "PHONE NUMBERS", type: "tags" },
      { k: "contact.phones_display", label: "PHONE DISPLAY FORMAT", type: "tags" },
      { k: "contact.address_lines", label: "ADDRESS LINES", type: "tags" },
      { k: "whatsapp", label: "WHATSAPP NUMBER (with country code)", type: "text" },
      { label: "SOCIAL", type: "sub" },
      { k: "social.linkedin", label: "LINKEDIN", type: "text" },
      { k: "social.instagram", label: "INSTAGRAM", type: "text" },
      { k: "social.youtube", label: "YOUTUBE", type: "text" },
      { label: "SEO DEFAULTS", type: "sub" },
      { k: "seo_defaults.title", label: "DEFAULT SEO TITLE", type: "text" },
      { k: "seo_defaults.description", label: "DEFAULT META DESCRIPTION", type: "textarea" },
      { k: "seo_defaults.og_image", label: "DEFAULT OG IMAGE", type: "media" },
      { label: "ANALYTICS", type: "sub" },
      { k: "analytics.google_analytics", label: "GOOGLE ANALYTICS ID", type: "text" },
      { k: "analytics.search_console", label: "SEARCH CONSOLE", type: "text" },
      { k: "analytics.meta_pixel", label: "META PIXEL", type: "text" },
    ],
  },
  navigation: {
    label: "Navigation",
    fields: [
      { k: "items", label: "MENU ITEMS", type: "list", fields: [
        { k: "label", label: "LABEL", type: "text" },
        { k: "to", label: "URL", type: "text" },
        { k: "enabled", label: "ENABLED", type: "bool" },
        { k: "items", label: "SUB ITEMS", type: "list", fields: [
          { k: "label", label: "LABEL", type: "text" },
          { k: "to", label: "URL", type: "text" },
        ]},
      ]},
    ],
  },
  footer: {
    label: "Footer",
    fields: [
      { k: "description", label: "FOOTER DESCRIPTION", type: "textarea" },
      { k: "columns", label: "NAVIGATION COLUMNS", type: "list", fields: [
        { k: "title", label: "COLUMN TITLE", type: "text" },
        { k: "links", label: "LINKS", type: "list", fields: [
          { k: "label", label: "LABEL", type: "text" },
          { k: "to", label: "URL", type: "text" },
        ]},
      ]},
      { k: "legal", label: "LEGAL LINKS", type: "list", fields: [
        { k: "label", label: "LABEL", type: "text" },
        { k: "to", label: "URL", type: "text" },
      ]},
      { k: "newsletter_cta", label: "NEWSLETTER CTA", type: "text" },
    ],
  },
};

export const HERO_CONTENT_FIELDS = [
  { k: "eyebrow", label: "EYEBROW", type: "text" },
  { k: "tagline", label: "TAGLINE", type: "text" },
  { k: "description", label: "DESCRIPTION", type: "textarea", rows: 4 },
  { k: "primary_cta.label", label: "PRIMARY CTA LABEL", type: "text" },
  { k: "primary_cta.to", label: "PRIMARY CTA URL", type: "text" },
  { k: "secondary_cta.label", label: "SECONDARY CTA LABEL", type: "text" },
  { k: "secondary_cta.to", label: "SECONDARY CTA URL", type: "text" },
  { k: "tertiary_cta.label", label: "TERTIARY CTA LABEL", type: "text" },
  { k: "tertiary_cta.to", label: "TERTIARY CTA URL", type: "text" },
  { k: "trust_line", label: "TRUST LINE", type: "tags" },
  { k: "chip_1.label", label: "FLOATING CHIP 1 LABEL", type: "text" },
  { k: "chip_1.value", label: "FLOATING CHIP 1 VALUE", type: "text" },
  { k: "chip_2.label", label: "FLOATING CHIP 2 LABEL", type: "text" },
  { k: "chip_2.value", label: "FLOATING CHIP 2 VALUE", type: "text" },
  { k: "image_media_id", label: "HERO IMAGE", type: "media" },
  { k: "video_url", label: "VIDEO URL", type: "text" },
];

export const LEAD_STATUSES = ["New", "Contacted", "Qualified", "Sample Requested", "Testing", "Quotation", "Won", "Lost"];
export const ROLES = ["super_admin", "content_manager", "product_manager", "technical_manager", "marketing_manager", "sales_manager", "reviewer"];
