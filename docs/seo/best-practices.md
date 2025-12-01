# SEO Content Best Practices

Guidelines for creating SEO-optimized content in the CMS.

## Meta Title

| Attribute | Guideline |
|-----------|-----------|
| **Max length** | 60 characters |
| **Purpose** | Primary title shown in search results |
| **Fallback** | Content title field |

### Tips
- Include primary keyword near the beginning
- Make it compelling and click-worthy
- Be descriptive and accurate
- Avoid keyword stuffing
- Each page should have a unique title

### Examples
- Good: "Complete Guide to TypeScript Generics | YourSite"
- Bad: "TypeScript TypeScript Guide TypeScript Tutorial TypeScript"

## Meta Description

| Attribute | Guideline |
|-----------|-----------|
| **Max length** | 160 characters |
| **Purpose** | Description shown in search results |
| **Fallback** | Content description field |

### Tips
- Summarize the page content accurately
- Include a call-to-action when appropriate
- Use target keywords naturally
- Write for humans, not search engines
- Make each description unique

### Examples
- Good: "Learn TypeScript generics with practical examples. Master type parameters, constraints, and utility types in this comprehensive guide."
- Bad: "This page is about TypeScript. Read about TypeScript here. TypeScript information."

## Keywords

| Attribute | Guideline |
|-----------|-----------|
| **Format** | Comma-separated list |
| **Max length** | 255 characters |
| **Recommended** | 3-5 keywords per page |

### Tips
- Focus on relevant, specific keywords
- Include long-tail variations
- Match user search intent
- Don't repeat the same keyword

### Example
```
typescript generics, type parameters, generic functions, typescript advanced types
```

## Canonical URL

| Attribute | Guideline |
|-----------|-----------|
| **Purpose** | Prevent duplicate content issues |
| **Default** | Auto-generated from slug |

### When to Set
- Content accessible at multiple URLs
- Paginated content (point to page 1)
- URL parameters that don't change content
- Cross-domain syndication

### Example
If your article appears at both:
- `/articles/my-post`
- `/articles/my-post?utm_source=twitter`

Set canonical to: `https://example.com/articles/my-post`

## Meta Robots

| Value | Meaning |
|-------|---------|
| `index,follow` | Index page, follow links (default) |
| `index,nofollow` | Index page, don't follow links |
| `noindex,follow` | Don't index, but follow links |
| `noindex,nofollow` | Don't index, don't follow links |

### When to Use noindex
- Thank you / confirmation pages
- Internal search results
- Paginated archives (beyond page 1)
- Duplicate or thin content
- User-specific pages

## Social Sharing Images

### Facebook (Open Graph)
| Attribute | Value |
|-----------|-------|
| **Recommended size** | 1200 x 630 pixels |
| **Minimum size** | 600 x 315 pixels |
| **Aspect ratio** | 1.91:1 |
| **Format** | PNG, JPEG |

### Twitter Cards
| Attribute | Value |
|-----------|-------|
| **Recommended size** | 1200 x 600 pixels |
| **Minimum size** | 300 x 157 pixels |
| **Aspect ratio** | 2:1 |
| **Format** | PNG, JPEG, GIF |

### Tips
- Use high-contrast, readable text (if any)
- Include branding subtly
- Avoid too much text (Facebook may reduce reach)
- Test with platform debuggers

## Content Length Guidelines

| Content Type | Recommended Length | Purpose |
|-------------|-------------------|---------|
| **Article** | 1,500-2,500 words | Pillar/cornerstone content |
| **Article** | 800-1,200 words | Standard blog posts |
| **Glossary** | 100-300 words | Concise definitions |
| **Directory** | Variable | Comprehensive resource lists |
| **Legal Page** | As needed | Legal compliance |

## URL Structure

### Best Practices
- Use descriptive, readable slugs
- Keep URLs short but meaningful
- Use hyphens to separate words
- Avoid special characters
- Don't include dates (unless necessary)

### Examples
- Good: `/articles/typescript-generics-guide`
- Bad: `/articles/2024/01/15/the-complete-and-comprehensive-guide-to-typescript-generics-for-beginners-and-experts`

## Internal Linking

- Link to related content within your site
- Use descriptive anchor text
- Create topic clusters with pillar pages
- Update old content with links to new content

## Programmatic SEO (pSEO)

### Glossary Strategy
- Target "what is [term]" queries
- Target "[acronym] meaning" queries
- Create comprehensive term coverage
- Interlink related terms

### Directory Strategy
- Target "best [category] tools" queries
- Target "[topic] resources" queries
- Keep listings updated and curated
- Add unique value beyond just links

### Template Quality
- Each page should provide unique value
- Don't just swap variables in templates
- Add contextual, relevant information
- Include user-generated content where possible
