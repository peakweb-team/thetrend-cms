# Directory Category

Categorization for directory listings.

## Schema Location
`src/api/directory-category/content-types/directory-category/schema.json`

## Fields

| Field | Type | Required | Localized | Description |
|-------|------|----------|-----------|-------------|
| `name` | string | Yes | Yes | Category name |
| `slug` | uid | Yes | No | URL-friendly identifier |
| `description` | text | No | Yes | Category description |
| `directories` | relation | - | - | Related directory entries (manyToMany) |

## Options
- **Draft & Publish**: Disabled
- **i18n**: Enabled

## API Endpoint
```
GET /api/directory-categories
```
