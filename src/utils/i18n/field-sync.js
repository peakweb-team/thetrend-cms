'use strict';

/**
 * Creates i18n field enforcement lifecycle hooks for non-localized fields.
 *
 * For fields with `localized: false` in the schema, Strapi automatically shares
 * the value across all locales. This utility ensures users can only edit these
 * fields on the default locale (preventing confusion in the admin panel):
 *
 * - beforeCreate: Copy fields from default locale when creating new locale version
 * - beforeUpdate: Block field changes on non-default locales
 *
 * @param {string} uid - Strapi content type UID (e.g., 'api::article.article')
 * @param {Object} [options] - Configuration options
 * @param {string} [options.defaultLocale='en'] - The default/source locale
 * @param {string[]} [options.fields=['slug']] - Fields to enforce (must be localized: false)
 * @returns {Object} Strapi lifecycle hooks object
 *
 * @example
 * // Basic usage - enforce slug field editing on default locale only
 * module.exports = createI18nFieldSync('api::article.article');
 *
 * @example
 * // Multiple fields
 * module.exports = createI18nFieldSync('api::product.product', {
 *   fields: ['slug', 'sku'],
 * });
 */
function createI18nFieldSync(uid, options = {}) {
  const config = {
    defaultLocale: options.defaultLocale ?? 'en',
    fields: options.fields ?? ['slug'],
  };

  return {
    async beforeCreate(event) {
      const { params } = event;
      const data = params?.data;
      const locale = data?.locale;
      const documentId = data?.documentId;

      if (locale && locale !== config.defaultLocale && documentId) {
        const defaultEntry = await strapi.documents(uid).findOne({
          documentId,
          locale: config.defaultLocale,
          fields: config.fields,
        });

        if (defaultEntry) {
          for (const field of config.fields) {
            if (defaultEntry[field] !== undefined) {
              data[field] = defaultEntry[field];
            }
          }
        }
      }
    },

    async beforeUpdate(event) {
      const { params } = event;
      const data = params?.data;
      const locale = data?.locale;

      // Block field changes on non-default locales
      // Users should only edit synced fields (like slug) on the default locale
      if (locale && locale !== config.defaultLocale) {
        for (const field of config.fields) {
          if (data?.[field] !== undefined) {
            delete data[field];
          }
        }
      }
    },

    // Note: afterUpdate sync is intentionally omitted for fields with localized: false
    // Strapi automatically shares non-localized field values across all locales.
    // The beforeCreate and beforeUpdate hooks above ensure users can only edit
    // these fields on the default locale, while Strapi handles the actual sync.
  };
}

module.exports = { createI18nFieldSync };
