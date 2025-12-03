# Rich Text Component

Markdown content blocks for long-form text.

## Schema Location
`src/components/shared/rich-text.json`

## Fields

| Field | Type | Required | Localized | Description |
|-------|------|----------|-----------|-------------|
| `body` | richtext | No | Yes | Markdown content |

## Usage

Used in DynamicZone blocks for:
- Article content
- Glossary explanations
- Directory descriptions
- Legal page content

## Markdown Support

The rich text field supports standard Markdown:
- Headings (# ## ###)
- Bold (**text**)
- Italic (*text*)
- Links ([text](url))
- Lists (- item or 1. item)
- Code blocks
- Blockquotes (> text)
