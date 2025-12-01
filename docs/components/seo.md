# SEO Component

Search engine optimization metadata for pages and content.

## Schema Location
`src/components/shared/seo.json`

## Fields

| Field | Type | Required | Localized | Max Length | Description |
|-------|------|----------|-----------|------------|-------------|
| `metaTitle` | string | No | Yes | 60 | Page title for search results |
| `metaDescription` | text | No | Yes | 160 | Page description for search results |
| `metaImage` | media | No | No | - | Default image for social sharing |
| `keywords` | string | No | Yes | 255 | Comma-separated keywords |
| `canonicalURL` | string | No | Yes | - | Canonical URL override |
| `metaRobots` | enum | No | No | - | Indexing directive |
| `metaSocial` | component | No | Yes | - | Platform-specific social metadata |

## metaRobots Options
- `index,follow` (default) - Index page, follow links
- `index,nofollow` - Index page, don't follow links
- `noindex,follow` - Don't index, follow links
- `noindex,nofollow` - Don't index, don't follow links

## Usage

Add to any content type:
```json
"seo": {
  "type": "component",
  "repeatable": false,
  "component": "shared.seo",
  "pluginOptions": {
    "i18n": { "localized": true }
  }
}
```

## Fallback Chain

When SEO fields are empty, the frontend uses this fallback chain:
1. Page-specific SEO fields
2. Global defaultSeo fields
3. Content fields (title, description, cover image)

## Best Practices

### Meta Title
- Keep under 60 characters
- Include primary keyword
- Make it compelling and descriptive
- Google truncates titles around 60 characters

### Meta Description
- Keep under 160 characters
- Summarize the page content
- Include a call-to-action
- Use target keywords naturally

### Keywords
- Use 3-5 relevant keywords per page
- Separate with commas
- Focus on long-tail keywords for better targeting

### Canonical URL
- Use when content appears at multiple URLs
- Set to the preferred/primary URL
- If empty, frontend generates from slug

See [SEO Best Practices](../seo/best-practices.md) for detailed guidelines.
