# Tag

Content tagging for articles and categories.

## Schema Location
`src/api/tag/content-types/tag/schema.json`

## Fields

| Field | Type | Required | Localized | Description |
|-------|------|----------|-----------|-------------|
| `name` | string | Yes | Yes | Tag name |
| `slug` | uid | Yes | No | URL-friendly identifier |
| `description` | text | No | Yes | Tag description |
| `articles` | relation | - | - | Related articles (manyToMany) |
| `categories` | relation | - | - | Related categories (manyToMany) |

## Options
- **Draft & Publish**: Disabled
- **i18n**: Enabled

## API Endpoint
```
GET /api/tags
```
