'use strict';

/**
 * Article Lifecycle Hooks - i18n Slug Synchronization
 *
 * Purpose: Keep slugs consistent across all locale versions of an article.
 * Slugs are managed ONLY by the default locale (English) and automatically
 * synced to all other locales.
 *
 * Why: URLs should remain consistent regardless of language. An article at
 * /en/my-article should also exist at /es/my-article, not /es/mi-articulo.
 *
 * How it works:
 * 1. beforeCreate: When creating a new locale version, copy slug from English
 * 2. beforeUpdate: Block any slug changes on non-English locales
 * 3. afterUpdate: When English slug changes, sync it to all other locales
 */

const DEFAULT_LOCALE = 'en';

module.exports = {
  /**
   * Copy slug from default locale when creating a new locale version
   */
  async beforeCreate(event) {
    const { params } = event;
    const data = params?.data;
    const locale = data?.locale;
    const documentId = data?.documentId;

    // If creating a non-default locale version, copy slug from default locale
    if (locale && locale !== DEFAULT_LOCALE && documentId) {
      const defaultEntry = await strapi.documents('api::article.article').findOne({
        documentId: documentId,
        locale: DEFAULT_LOCALE,
        fields: ['slug'],
      });

      if (defaultEntry?.slug) {
        data.slug = defaultEntry.slug;
      }
    }
  },

  /**
   * Prevent slug changes on non-default locales (enforce immutability)
   */
  async beforeUpdate(event) {
    const { params } = event;
    const data = params?.data;
    const locale = data?.locale;

    // On non-default locales, prevent slug changes by removing it from update data
    // The slug is managed by the default locale only
    if (locale && locale !== DEFAULT_LOCALE && data?.slug !== undefined) {
      delete data.slug;
    }
  },

  /**
   * Sync slug changes from default locale to all other locales
   * Uses setImmediate to defer execution after the current operation completes
   */
  afterUpdate(event) {
    const { result, params } = event;
    const data = params?.data;
    const locale = data?.locale || result?.locale;
    const documentId = data?.documentId || result?.documentId;
    const newSlug = result?.slug;

    // Only sync when updating the default locale and slug exists
    if (locale === DEFAULT_LOCALE && newSlug && documentId) {
      // Defer the sync to run after the current lifecycle completes
      // This prevents interference with the parent update operation
      setImmediate(async () => {
        try {
          const locales = await strapi.plugin('i18n').service('locales').find();
          const otherLocales = locales.filter((l) => l.code !== DEFAULT_LOCALE);

          for (const loc of otherLocales) {
            try {
              // Check if locale version exists and has a different slug
              const localeEntry = await strapi.documents('api::article.article').findOne({
                documentId: documentId,
                locale: loc.code,
                fields: ['slug'],
              });

              // Only update if locale exists and slug is different
              if (localeEntry && localeEntry.slug !== newSlug) {
                await strapi.documents('api::article.article').update({
                  documentId: documentId,
                  locale: loc.code,
                  data: { slug: newSlug },
                });
              }
            } catch (error) {
              // Locale version may not exist yet - that's okay
            }
          }
        } catch (error) {
          strapi.log.error('Error syncing slug to other locales:', error);
        }
      });
    }
  },
};
