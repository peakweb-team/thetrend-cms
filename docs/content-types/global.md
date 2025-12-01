# Global

Site-wide settings, branding, and default SEO configuration.

## Schema Location
`src/api/global/content-types/global/schema.json`

## Fields

| Field | Type | Required | Localized | Description |
|-------|------|----------|-----------|-------------|
| `siteName` | string | Yes | Yes | Site name (max 60 chars) |
| `siteDescription` | text | Yes | Yes | Site description (max 160 chars) |
| `siteUrl` | string | Yes | No | Base URL (e.g., "https://example.com") |
| `favicon` | media | No | No | Site favicon (images only) |
| `siteLogo` | media | No | No | Site logo for branding and JSON-LD |
| `defaultSeo` | component | No | Yes | Default SEO metadata (shared.seo) |
| `organization` | component | No | Yes | Organization details for JSON-LD (shared.organization) |

## Options
- **Draft & Publish**: Disabled (always published)
- **i18n**: Enabled

## API Endpoint
```
GET /api/global
```

## Query Examples
```bash
# Get global settings with all SEO data
/api/global?populate[defaultSeo][populate]=*&populate[organization][populate]=*&populate=favicon,siteLogo
```

## Purpose

Global settings serve as:
1. **Site branding** - Name, logo, favicon
2. **SEO defaults** - Fallback meta tags when page-specific SEO is not set
3. **JSON-LD publisher** - Organization data for structured data
4. **Base URL** - Used for canonical URLs and JSON-LD

## Best Practices

### siteName
- Keep under 60 characters
- Use your brand name
- This appears in browser tabs as fallback

### siteDescription
- Keep under 160 characters
- Describe your site's purpose
- Used as default meta description

### siteUrl
- Include protocol (https://)
- No trailing slash
- Used for canonical URLs and JSON-LD

### Organization
- `name`: Display name
- `legalName`: Official registered name
- `url`: Organization website
- `logo`: High-resolution logo (min 112x112px for Google)
- `sameAs`: JSON array of social profile URLs
  ```json
  ["https://twitter.com/handle", "https://linkedin.com/company/name"]
  ```
