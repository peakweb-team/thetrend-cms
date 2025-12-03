# Meta Social Component

Platform-specific social sharing metadata for Facebook Open Graph and Twitter Cards.

## Schema Location
`src/components/shared/meta-social.json`

## Fields

| Field | Type | Required | Localized | Max Length | Description |
|-------|------|----------|-----------|------------|-------------|
| `socialNetwork` | enum | Yes | No | - | Platform: "Facebook" or "Twitter" |
| `title` | string | No | Yes | 60 | Platform-specific title |
| `description` | text | No | Yes | 65 | Platform-specific description |
| `image` | media | No | No | - | Platform-specific image |

## Usage

This component is nested within the SEO component as a repeatable field. Add entries for Facebook and/or Twitter when you need platform-specific overrides.

## When to Use

Use Meta Social when you want different content for each platform:
- Different title/description tone for each audience
- Platform-optimized images (different dimensions)
- A/B testing social engagement

## Image Dimensions

### Facebook (Open Graph)
- Recommended: 1200 x 630 pixels
- Minimum: 600 x 315 pixels
- Aspect ratio: 1.91:1

### Twitter Cards
- Recommended: 1200 x 600 pixels
- Minimum: 300 x 157 pixels
- Aspect ratio: 2:1

## Fallback Behavior

If no Meta Social entry exists for a platform:
1. Falls back to SEO component's metaTitle/metaDescription/metaImage
2. Falls back to content fields (title, description, cover)
