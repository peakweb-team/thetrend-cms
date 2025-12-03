# Glossary Category

Categorization for glossary terms.

## Schema Location
`src/api/glossary-category/content-types/glossary-category/schema.json`

## Fields

| Field | Type | Required | Localized | Description |
|-------|------|----------|-----------|-------------|
| `name` | string | Yes | Yes | Category name |
| `slug` | uid | Yes | No | URL-friendly identifier |
| `description` | text | No | Yes | Category description |
| `glossaries` | relation | - | - | Related glossary entries (manyToMany) |

## Options
- **Draft & Publish**: Disabled
- **i18n**: Enabled

## API Endpoint
```
GET /api/glossary-categories
```
