# JSON-LD Structured Data

JSON-LD (JavaScript Object Notation for Linked Data) is generated on the frontend from CMS content. This provides search engines with structured information about your content.

## Overview

| Content Type | Schema.org Type | Purpose |
|-------------|-----------------|---------|
| Article | `BlogPosting` | Blog posts, news articles |
| Glossary | `DefinedTerm` | Definitions, terms, acronyms |
| Directory | `WebPage` + `ItemList` | Resource listings |
| Legal Page | `WebPage` | Legal documents |

## Article Schema (BlogPosting)

```typescript
function generateArticleJsonLd(article, global) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.cover?.url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author?.name,
    },
    publisher: {
      '@type': 'Organization',
      name: global.organization?.name || global.siteName,
      logo: {
        '@type': 'ImageObject',
        url: global.organization?.logo?.url || global.siteLogo?.url,
      },
      sameAs: global.organization?.sameAs || [],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${global.siteUrl}/articles/${article.slug}`,
    },
  };
}
```

### Required Properties
- `headline` - Article title
- `image` - Cover image URL
- `datePublished` - ISO 8601 date

### Recommended Properties
- `author` - Content creator
- `dateModified` - Last update date
- `publisher` - Publishing organization

## Glossary Schema (DefinedTerm)

```typescript
function generateGlossaryJsonLd(glossary, global) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: glossary.title,
    description: glossary.description,
    ...(glossary.acronym && { termCode: glossary.acronym }),
    inDefinedTermSet: glossary.category?.[0]?.name,
  };
}
```

### Properties
- `name` - Term being defined
- `description` - Definition text
- `termCode` - Acronym/abbreviation (optional)
- `inDefinedTermSet` - Category context

## Directory Schema (WebPage + ItemList)

```typescript
function generateDirectoryJsonLd(directory, global) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: directory.title,
    description: directory.description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: directory.links?.map((link, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: link.label,
        url: link.url,
      })) || [],
    },
  };
}
```

### Properties
- `name` - Page title
- `description` - Page description
- `mainEntity.itemListElement` - Array of list items with position

## Legal Page Schema (WebPage)

```typescript
function generateLegalPageJsonLd(page, global) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    dateModified: page.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: global.organization?.name || global.siteName,
    },
  };
}
```

## Implementation in Next.js

```tsx
// app/articles/[slug]/page.tsx
import { generateArticleJsonLd } from '@/lib/json-ld';

export default async function ArticlePage({ params }) {
  const article = await getArticle(params.slug);
  const global = await getGlobal();
  const jsonLd = generateArticleJsonLd(article, global);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Article data={article} />
    </>
  );
}
```

## Testing

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Validates syntax and eligibility for rich results

2. **Schema.org Validator**: https://validator.schema.org/
   - Checks compliance with Schema.org specifications

3. **Google Search Console**: Monitor rich result performance
   - Enhancement reports show errors and valid pages

## Common Issues

### Invalid Date Format
Use ISO 8601 format: `2024-01-15T10:30:00Z`

### Missing Required Properties
BlogPosting requires: headline, image, datePublished

### Incorrect Property Types
Ensure URLs are strings, not objects

### Logo Size
Minimum 112x112px for Google rich results
