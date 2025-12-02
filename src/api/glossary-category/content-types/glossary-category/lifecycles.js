'use strict';

/**
 * Glossary Category Lifecycle Hooks - i18n Slug Synchronization
 *
 * Purpose: Keep slugs consistent across all locale versions of a glossary category.
 * Slugs are managed ONLY by the default locale (English) and automatically
 * synced to all other locales.
 *
 * Why: URLs should remain consistent regardless of language. A category at
 * /en/glossary/categories/technical should also exist at /es/glossary/categories/technical.
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

    if (locale && locale !== DEFAULT_LOCALE && documentId) {
      const defaultEntry = await strapi.documents('api::glossary-category.glossary-category').findOne({
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
   * Prevent slug changes on non-default locales
   */
  async beforeUpdate(event) {
    const { params } = event;
    const data = params?.data;
    const locale = data?.locale;

    if (locale && locale !== DEFAULT_LOCALE && data?.slug !== undefined) {
      delete data.slug;
    }
  },

  /**
   * Sync slug changes from default locale to all other locales
   */
  afterUpdate(event) {
    const { result, params } = event;
    const data = params?.data;
    const locale = data?.locale || result?.locale;
    const documentId = data?.documentId || result?.documentId;
    const newSlug = result?.slug;

    if (locale === DEFAULT_LOCALE && newSlug && documentId) {
      setImmediate(async () => {
        try {
          const locales = await strapi.plugin('i18n').service('locales').find();
          const otherLocales = locales.filter((l) => l.code !== DEFAULT_LOCALE);

          for (const loc of otherLocales) {
            try {
              const localeEntry = await strapi.documents('api::glossary-category.glossary-category').findOne({
                documentId: documentId,
                locale: loc.code,
                fields: ['slug'],
              });

              if (localeEntry && localeEntry.slug !== newSlug) {
                await strapi.documents('api::glossary-category.glossary-category').update({
                  documentId: documentId,
                  locale: loc.code,
                  data: { slug: newSlug },
                });
              }
            } catch (error) {
              // Locale version may not exist yet
            }
          }
        } catch (error) {
          strapi.log.error('Error syncing slug to other locales:', error);
        }
      });
    }
  },
};
