# Legal Page

Legal documents such as terms of service, privacy policy, and other compliance content.

## Schema Location
`src/api/legal-page/content-types/legal-page/schema.json`

## Fields

| Field | Type | Required | Localized | Description |
|-------|------|----------|-----------|-------------|
| `slug` | uid | Yes | No | URL-friendly identifier (e.g., "terms-of-service") |
| `title` | string | Yes | Yes | Page title |
| `blocks` | dynamiczone | No | Yes | Content blocks (rich-text, media, quote, slider) |
| `seo` | component | No | Yes | SEO metadata (shared.seo) |

## Options
- **Draft & Publish**: Enabled
- **i18n**: Enabled

## API Endpoints
```
GET    /api/legal-pages
GET    /api/legal-pages/:id
POST   /api/legal-pages
PUT    /api/legal-pages/:id
DELETE /api/legal-pages/:id
```

## Query Examples
```bash
# Get legal page by slug with SEO
/api/legal-pages?filters[slug][$eq]=privacy-policy&populate[seo][populate]=*&populate=blocks
```

## JSON-LD Schema
Legal pages generate `WebPage` structured data with `dateModified`. See [JSON-LD Guide](../seo/json-ld.md).

## Common Legal Pages
- `terms-of-service` - Terms of Service / Terms & Conditions
- `privacy-policy` - Privacy Policy
- `cookie-policy` - Cookie Policy
- `disclaimer` - Disclaimer
- `acceptable-use` - Acceptable Use Policy
