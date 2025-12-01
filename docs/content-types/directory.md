# Directory

Resource listings with curated links and categorization.

## Schema Location
`src/api/directory/content-types/directory/schema.json`

## Fields

| Field | Type | Required | Localized | Description |
|-------|------|----------|-----------|-------------|
| `title` | string | Yes | Yes | Directory listing name |
| `description` | text | Yes | Yes | Listing description |
| `slug` | uid | Yes | No | URL-friendly identifier |
| `content` | dynamiczone | No | Yes | Additional content blocks |
| `links` | component | No | Yes | Resource links (repeatable shared.link) |
| `image` | media | Yes | No | Featured image |
| `imageAlt` | string | Yes | Yes | Image alt text |
| `category` | relation | No | - | Categories (manyToMany to Directory Category) |
| `seo` | component | No | Yes | SEO metadata (shared.seo) |

## Options
- **Draft & Publish**: Enabled
- **i18n**: Enabled

## API Endpoints
```
GET    /api/directories
GET    /api/directories/:id
POST   /api/directories
PUT    /api/directories/:id
DELETE /api/directories/:id
```

## Query Examples
```bash
# Get directory with links and SEO
/api/directories?populate[seo][populate]=*&populate=image,links,category

# Filter by category
/api/directories?filters[category][slug][$eq]=tools
```

## JSON-LD Schema
Directory pages generate `WebPage` with `ItemList` for the links collection. See [JSON-LD Guide](../seo/json-ld.md).

## pSEO Notes
Directory listings work well for programmatic SEO - create category-based resource pages like "Best [category] tools" or "[topic] resources".
