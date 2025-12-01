# Organization Component

Organization/publisher details for JSON-LD structured data.

## Schema Location
`src/components/shared/organization.json`

## Fields

| Field | Type | Required | Localized | Description |
|-------|------|----------|-----------|-------------|
| `name` | string | Yes | Yes | Organization display name |
| `legalName` | string | No | No | Official registered name |
| `url` | string | No | No | Organization website URL |
| `logo` | media | No | No | Organization logo (min 112x112px) |
| `sameAs` | json | No | No | Social profile URLs array |

## sameAs Field

JSON array of URLs linking to the organization's presence on other platforms:

```json
[
  "https://twitter.com/yourhandle",
  "https://www.linkedin.com/company/yourcompany",
  "https://www.facebook.com/yourpage",
  "https://www.instagram.com/yourhandle",
  "https://www.youtube.com/channel/yourchannel"
]
```

## Usage

Used in the Global single type to provide publisher information for JSON-LD structured data across all content.

## JSON-LD Output

The Organization component generates Schema.org Organization markup:

```json
{
  "@type": "Organization",
  "name": "Company Name",
  "legalName": "Company Legal Name Inc.",
  "url": "https://example.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://example.com/logo.png"
  },
  "sameAs": [
    "https://twitter.com/example",
    "https://linkedin.com/company/example"
  ]
}
```

## Logo Requirements

For Google rich results:
- Minimum: 112 x 112 pixels
- Recommended: 272 x 92 pixels (rectangular) or 200 x 200 pixels (square)
- Format: PNG, JPEG, GIF, SVG, or WebP
- Background: White or transparent preferred
