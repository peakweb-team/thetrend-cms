# Link Component

External links with label and URL.

## Schema Location
`src/components/shared/link.json`

## Fields

| Field | Type | Required | Localized | Description |
|-------|------|----------|-----------|-------------|
| `label` | string | Yes | Yes | Link text |
| `url` | string | Yes | No | Link URL |

## Usage

Used as repeatable component in:
- Glossary (related links)
- Directory (resource links)

## JSON-LD Usage

In Directory content type, links are used to generate `ItemList` structured data:

```json
{
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Link Label",
      "url": "https://example.com"
    }
  ]
}
```
