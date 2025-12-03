# Glossary

Define terms, acronyms, and concepts with detailed explanations.

## Schema Location

`src/api/glossary/content-types/glossary/schema.json`

## Fields

| Field         | Type        | Required | Localized | Description                                  |
| ------------- | ----------- | -------- | --------- | -------------------------------------------- |
| `title`       | string      | Yes      | Yes       | Term name                                    |
| `acronym`     | string      | No       | Yes       | Abbreviation/acronym (e.g., "SEO", "API")    |
| `description` | text        | Yes      | Yes       | Short definition                             |
| `slug`        | uid         | Yes      | No        | URL-friendly identifier                      |
| `content`     | dynamiczone | No       | Yes       | Extended explanation blocks                  |
| `image`       | media       | No       | No        | Featured image                               |
| `imageAlt`    | string      | No       | Yes       | Image alt text                               |
| `category`    | relation    | No       | -         | Categories (manyToMany to Glossary Category) |
| `links`       | component   | No       | Yes       | Related links (repeatable shared.link)       |
| `seo`         | component   | No       | Yes       | SEO metadata (shared.seo)                    |

## Options

-   **Draft & Publish**: Enabled
-   **i18n**: Enabled

## API Endpoints

```http
GET    /api/glossaries
GET    /api/glossaries/:id
POST   /api/glossaries
PUT    /api/glossaries/:id
DELETE /api/glossaries/:id
```

## Query Examples

```bash
# Get glossary with SEO
/api/glossaries?populate[seo][populate]=*&populate=image,category

# Filter by category
/api/glossaries?filters[category][slug][$eq]=marketing-terms
```

## JSON-LD Schema

Glossary entries generate `DefinedTerm` structured data with `termCode` for acronyms. See [JSON-LD Guide](../seo/json-ld.md).

## pSEO Notes

Glossary is ideal for programmatic SEO - create hundreds of term definitions targeting long-tail keywords like "what is [term]" or "[acronym] meaning".
