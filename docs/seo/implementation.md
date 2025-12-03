# SEO Implementation Guide

This guide explains how SEO is implemented in the CMS and how to integrate it with the frontend.

## Architecture Overview

SEO in this CMS follows a **component-based approach**:

1. **SEO Component** (`shared.seo`) - Reusable SEO fields added to content types
2. **Meta Social Component** (`shared.meta-social`) - Platform-specific social metadata
3. **Organization Component** (`shared.organization`) - Publisher data for JSON-LD
4. **Global Settings** - Site-wide defaults and fallbacks

## Content Types with SEO

| Content Type | SEO Component | JSON-LD Type       |
| ------------ | ------------- | ------------------ |
| Article      | Yes           | BlogPosting        |
| Glossary     | Yes           | DefinedTerm        |
| Directory    | Yes           | WebPage + ItemList |
| Legal Page   | Yes           | WebPage            |
| Global       | defaultSeo    | -                  |

## Data Flow

```text
Content SEO Fields
       ↓
Global defaultSeo (fallback)
       ↓
Content Fields (final fallback)
       ↓
Frontend Metadata Generation
       ↓
HTML Meta Tags + JSON-LD
```

## API Queries

### Fetching Content with SEO

Always populate the SEO component and its nested fields:

```bash
# Article with full SEO
/api/articles?populate[seo][populate]=*&populate[author]=*&populate[cover]=*&populate[category]=*

# Global settings
/api/global?populate[defaultSeo][populate]=*&populate[organization][populate]=*&populate=favicon,siteLogo
```

### Example Response Structure

```json
{
    "data": {
        "id": 1,
        "attributes": {
            "title": "Article Title",
            "description": "Article description",
            "slug": "article-slug",
            "seo": {
                "metaTitle": "Custom SEO Title",
                "metaDescription": "Custom meta description",
                "metaImage": { "url": "/uploads/image.jpg" },
                "keywords": "keyword1, keyword2",
                "canonicalURL": null,
                "metaRobots": "index,follow",
                "metaSocial": [
                    {
                        "socialNetwork": "Facebook",
                        "title": "Facebook-specific title",
                        "description": "Facebook description",
                        "image": null
                    }
                ]
            }
        }
    }
}
```

## Frontend Integration

### 1. Create SEO Utility

```typescript
// lib/seo.ts
import { Metadata } from "next";

interface SeoData {
    metaTitle?: string;
    metaDescription?: string;
    metaImage?: { url: string };
    keywords?: string;
    canonicalURL?: string;
    metaRobots?: string;
    metaSocial?: Array<{
        socialNetwork: "Facebook" | "Twitter";
        title?: string;
        description?: string;
        image?: { url: string };
    }>;
}

export function generateMetadata(
    content: {
        title: string;
        description?: string;
        seo?: SeoData;
        cover?: { url: string };
    },
    global: { siteName: string; siteUrl: string; defaultSeo?: SeoData },
    type: string,
    slug: string
): Metadata {
    const seo = content.seo || {};
    const defaultSeo = global.defaultSeo || {};

    const title = seo.metaTitle || defaultSeo.metaTitle || content.title;
    const description =
        seo.metaDescription ||
        defaultSeo.metaDescription ||
        content.description;
    const image =
        seo.metaImage?.url || defaultSeo.metaImage?.url || content.cover?.url;

    const facebook = seo.metaSocial?.find(
        (s) => s.socialNetwork === "Facebook"
    );
    const twitter = seo.metaSocial?.find((s) => s.socialNetwork === "Twitter");

    return {
        title,
        description,
        keywords: seo.keywords,
        robots: seo.metaRobots || "index,follow",
        alternates: {
            canonical: seo.canonicalURL || `${global.siteUrl}/${type}/${slug}`,
        },
        openGraph: {
            title: facebook?.title || title,
            description: facebook?.description || description,
            images: image ? [{ url: image }] : [],
            type: type === "article" ? "article" : "website",
            siteName: global.siteName,
        },
        twitter: {
            card: "summary_large_image",
            title: twitter?.title || title,
            description: twitter?.description || description,
            images: image ? [image] : [],
        },
    };
}
```

### 2. Use in Page Components

```typescript
// app/articles/[slug]/page.tsx
import { generateMetadata as genMeta } from "@/lib/seo";

export async function generateMetadata({ params }) {
    const article = await getArticle(params.slug);
    const global = await getGlobal();
    return genMeta(article, global, "articles", params.slug);
}
```

## i18n Considerations

-   SEO fields are localized - fetch with locale parameter
-   Slugs are NOT localized (same across all locales)
-   Generate hreflang tags for available locales
-   Canonical URL should include locale path

## canonicalURL Field Format

**Important**: The `canonicalURL` field must include the full protocol (scheme) and host:

-   **Correct**: `https://thetrend.tech/articles/my-article`
-   **Incorrect**: `/articles/my-article` (relative path - will be appended to base URL)
-   **Incorrect**: `thetrend.tech/articles/my-article` (missing protocol)

If left empty, the frontend should generate the canonical URL from the base URL and slug. Always validate URLs before publishing to ensure proper SEO indexing.

```typescript
// Generate hreflang tags
const locales = ["en", "es", "de"];
const hreflangs = locales.map((locale) => ({
    hreflang: locale,
    href: `${siteUrl}/${locale}/${type}/${slug}`,
}));
```

## Validation

Test structured data with:

-   [Google Rich Results Test](https://search.google.com/test/rich-results)
-   [Schema.org Validator](https://validator.schema.org/)

Test social previews with:

-   [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
-   [Twitter Card Validator](https://cards-dev.twitter.com/validator)
