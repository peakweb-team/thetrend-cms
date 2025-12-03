# Author

Content creators with profile information and social links.

## Schema Location

`src/api/author/content-types/author/schema.json`

## Fields

| Field         | Type      | Required | Localized | Description                                   |
| ------------- | --------- | -------- | --------- | --------------------------------------------- |
| `name`        | string    | Yes      | Yes       | Author name                                   |
| `avatar`      | media     | No       | No        | Profile image                                 |
| `email`       | email     | No       | No        | Contact email                                 |
| `bio`         | text      | No       | Yes       | Author biography                              |
| `socialMedia` | component | No       | No        | Social links (repeatable shared.social-media) |
| `articles`    | relation  | -        | -         | Authored articles (oneToMany)                 |

## Options

-   **Draft & Publish**: Disabled
-   **i18n**: Enabled

## API Endpoint

```http
GET /api/authors
```

## JSON-LD Usage

Author data is used in Article JSON-LD as the `author` property with `@type: Person`.
