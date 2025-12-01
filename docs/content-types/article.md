# Article

Blog posts and news articles with rich content, author attribution, and SEO support.

## Schema Location
`src/api/article/content-types/article/schema.json`

## Fields

| Field | Type | Required | Localized | Description |
|-------|------|----------|-----------|-------------|
| `title` | string | Yes | Yes | Article headline |
| `description` | text | Yes | Yes | Short excerpt/summary |
| `slug` | uid | Yes | No | URL-friendly identifier (auto-generated from title) |
| `cover` | media | No | No | Cover image |
| `video` | media | No | No | Video content (videos only) |
| `author` | relation | No | - | Author (manyToOne to Author) |
| `category` | relation | No | - | Category (manyToOne to Category) |
| `tags` | relation | No | - | Tags (manyToMany to Tag) |
| `blocks` | dynamiczone | No | Yes | Rich content blocks (rich-text, media, quote, slider) |
| `highlighted` | boolean | No | No | Feature flag for highlighted articles (default: false) |
| `callout` | boolean | No | No | Feature flag for callout articles (default: false) |
| `seo` | component | No | Yes | SEO metadata (shared.seo) |

## Options
- **Draft & Publish**: Enabled
- **i18n**: Enabled

## API Endpoints
```
GET    /api/articles
GET    /api/articles/:id
POST   /api/articles
PUT    /api/articles/:id
DELETE /api/articles/:id
```

## Query Examples
```bash
# Get articles with all relations
/api/articles?populate=*

# Get articles with SEO data
/api/articles?populate[seo][populate]=*&populate[author]=*&populate[cover]=*

# Filter by category
/api/articles?filters[category][slug][$eq]=technology

# Get highlighted articles
/api/articles?filters[highlighted][$eq]=true
```

## JSON-LD Schema
Articles generate `BlogPosting` structured data. See [JSON-LD Guide](../seo/json-ld.md).
