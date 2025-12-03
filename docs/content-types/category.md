# Category

Article categorization for organizing blog content.

## Schema Location

`src/api/category/content-types/category/schema.json`

## Fields

| Field         | Type     | Required | Localized | Description                  |
| ------------- | -------- | -------- | --------- | ---------------------------- |
| `name`        | string   | Yes      | Yes       | Category name                |
| `slug`        | uid      | Yes      | No        | URL-friendly identifier      |
| `description` | text     | No       | Yes       | Category description         |
| `articles`    | relation | -        | -         | Related articles (oneToMany) |
| `tags`        | relation | -        | -         | Related tags (manyToMany)    |

## Options

-   **Draft & Publish**: Disabled
-   **i18n**: Enabled

## API Endpoint

```http
GET /api/categories
```
