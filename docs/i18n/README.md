# Internationalization (i18n)

This CMS uses Strapi's i18n plugin to support multiple languages.

## Supported Locales

| Code | Language |
|------|----------|
| `en` | English (default) |
| `es` | Spanish |

Locales are configured in `config/plugins.js`.

## Field Localization Behavior

Strapi's i18n plugin allows field-level localization configuration:

- **`localized: true`** - Field can have different values per locale
- **`localized: false`** - Field is **shared** across all locales (changing it in one locale changes it everywhere)

## Field Localization Strategy

### Localized Fields (different per language)
- `title`, `name` - User-facing titles
- `description` - Content summaries
- `blocks`, `content` - Rich content (articles, pages)
- `seo` - SEO metadata
- `cover`, `video`, `image` - Media assets (can be different per locale)
- `imageAlt` - Image alt text

### Non-Localized Fields (shared across all languages)
- `slug` - URL identifiers (enforced via lifecycle hooks)
- `highlighted`, `callout` - Feature flags
- `email` - Author email
- `avatar` - Author profile photo (same person regardless of language)
- Relations (`author`, `category`, `tags`)

## Slug Behavior

**Slugs are managed exclusively by the default locale (English).**

- When creating a new locale version, the slug is automatically copied from the English version
- Slug changes on non-default locales are ignored (enforced server-side)
- Updating the English slug automatically syncs to all other locale versions

This ensures consistent URLs across languages: `/en/articles/my-article` and `/es/articles/my-article` use the same slug.

## Creating Localized Content

1. Create content in English (default locale) first
2. Switch to another locale in the admin panel
3. The slug field will be pre-filled and locked
4. Translate the localizable fields (title, description, content)
5. Save the localized version

## API Usage

Query content by locale using the `locale` parameter:

```bash
# Get English articles
/api/articles?locale=en

# Get Spanish articles
/api/articles?locale=es

# Get all locales for a specific article
/api/articles?filters[slug][$eq]=my-article&locale=all
```

## Lifecycle Hooks Implementation

Slug synchronization is implemented via Strapi 5 lifecycle hooks. Each content type with a slug field has a `lifecycles.js` file.

### Hooks Overview

| Hook | Purpose |
|------|---------|
| `beforeCreate` | Copy slug from default locale when creating a new locale version |
| `beforeUpdate` | Prevent slug changes on non-default locales |
| `afterUpdate` | Sync slug changes from default locale to all other locales |

### Strapi 5 Best Practices

The lifecycle hooks follow these Strapi 5 patterns:

1. **Access data via `event.params.data`** (not `event.data`)
2. **Use async functions** for hooks that need to await operations
3. **Use `setImmediate()`** in `afterUpdate` to defer operations that call `strapi.documents().update()` - this prevents interference with the parent update operation
4. **Check if locale entry exists** before updating to avoid errors

### Example Implementation

```javascript
// src/api/article/content-types/article/lifecycles.js
const DEFAULT_LOCALE = 'en';

module.exports = {
  async beforeCreate(event) {
    const { params } = event;
    const data = params?.data;
    const locale = data?.locale;
    const documentId = data?.documentId;

    if (locale && locale !== DEFAULT_LOCALE && documentId) {
      const defaultEntry = await strapi.documents('api::article.article').findOne({
        documentId,
        locale: DEFAULT_LOCALE,
        fields: ['slug'],
      });
      if (defaultEntry?.slug) {
        data.slug = defaultEntry.slug;
      }
    }
  },

  async beforeUpdate(event) {
    const { params } = event;
    const data = params?.data;
    const locale = data?.locale;

    if (locale && locale !== DEFAULT_LOCALE && data?.slug !== undefined) {
      delete data.slug;
    }
  },

  afterUpdate(event) {
    const { result, params } = event;
    const locale = params?.data?.locale || result?.locale;
    const documentId = params?.data?.documentId || result?.documentId;
    const newSlug = result?.slug;

    if (locale === DEFAULT_LOCALE && newSlug && documentId) {
      // IMPORTANT: Use setImmediate to defer the operation
      setImmediate(async () => {
        // ... sync slug to other locales
      });
    }
  },
};
```

### Content Types with Slug Lifecycle Hooks

- `article`
- `category`
- `tag`
- `directory`
- `directory-category`
- `glossary`
- `glossary-category`
- `legal-page`
