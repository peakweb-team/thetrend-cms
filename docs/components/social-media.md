# Social Media Component

Author social media profile links.

## Schema Location

`src/components/shared/social-media.json`

## Fields

| Field      | Type   | Required | Localized | Description                             |
| ---------- | ------ | -------- | --------- | --------------------------------------- |
| `platform` | enum   | Yes      | No        | Platform: "x" (Twitter/X) or "linkedIn" |
| `url`      | string | Yes      | No        | Profile URL                             |

## Usage

Used in Author content type for social profile links.

## Example

```json
[
    {
        "platform": "x",
        "url": "https://x.com/authorhandle"
    },
    {
        "platform": "linkedIn",
        "url": "https://linkedin.com/in/authorname"
    }
]
```
