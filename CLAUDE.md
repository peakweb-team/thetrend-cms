# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Strapi 5.28.0 headless CMS** for a blog application. It provides a REST API for managing articles, authors, categories, and site-wide settings. The admin panel is built with React 18 + Vite, and the backend uses SQLite by default (with MySQL/PostgreSQL support).

## Development Commands

```bash
npm run develop        # Start dev server with auto-reload (admin at /admin)
npm run build         # Build admin panel for production
npm run start         # Start in production mode (no auto-reload)
npm run seed:example  # Load sample data (categories, authors, articles)
```

**First time setup**: Run `npm run develop` to initialize the admin user, then optionally run `npm run seed:example` to load sample content.

## Architecture Overview

### Strapi Module Pattern

Every content type follows the same structure:
```
src/api/{contentType}/
├── content-types/{contentType}/schema.json  # Data model definition
├── controllers/{contentType}.js             # HTTP handlers (auto-generated)
├── services/{contentType}.js                # Business logic (auto-generated)
└── routes/{contentType}.js                  # REST routes (auto-generated)
```

All controllers/services/routes use Strapi's factory pattern (`createCoreController`, `createCoreService`, `createCoreRouter`) which auto-generates standard CRUD operations. Customize by extending the factories.

### Content Model Architecture

**Collection Types** (multiple entries):
- `article`: Blog posts with title, slug, description, dynamic content blocks (DynamicZone), cover image, optional video, author/category/tags relations, and boolean flags (highlighted, callout)
- `author`: Content creators with name, avatar, email, bio, and repeatable social media links (X, LinkedIn)
- `category`: Article categorization with name, slug, description, and tags relation
- `tag`: Article and category tagging with name, slug, description, articles relation, and categories relation

**Single Types** (one entry):
- `global`: Site-wide settings (site name, description, favicon, default SEO)
- `about`: About page with dynamic content blocks

**Relationships**:
```
Article n:1 Author (manyToOne)
Article n:1 Category (manyToOne)
Article n:m Tag (manyToMany)
Category n:m Tag (manyToMany)
```

**Article Schema Fields**:
- `title`: string - Article title
- `description`: text (max 80 chars) - Short description/excerpt
- `slug`: uid - Auto-generated from title
- `cover`: media - Cover image (optional)
- `video`: media - Video upload (optional, videos only)
- `blocks`: DynamicZone - Main content (rich-text, media, quotes, sliders)
- `author`: relation - Article author (manyToOne)
- `category`: relation - Article category (manyToOne)
- `tags`: relation - Article tags (manyToMany)
- `highlighted`: boolean - Flag for featured/highlighted articles (default: false)
- `callout`: boolean - Flag for callout articles (default: false)

**Reusable Components** (in `src/components/shared/`):

DynamicZone components (used in articles and about page):
- `shared.media`: Single file/image
- `shared.quote`: Quote block with author attribution
- `shared.rich-text`: Markdown content
- `shared.slider`: Image carousel (multiple files)

Repeatable components:
- `shared.social-media`: Social media link with platform enum (x, linkedin) and URL - used in author profiles

### Configuration Files

- `config/database.js`: Database connection (supports SQLite/MySQL/PostgreSQL via `DATABASE_CLIENT` env var)
- `config/server.js`: Server host, port, admin JWT, API tokens, webhooks
- `config/admin.js`: Admin panel authentication and settings
- `config/api.js`: REST API defaults (pagination limits: default 25, max 100)
- `config/middlewares.js`: Express middleware stack (CORS, security, body parsing)
- `config/plugins.js`: Plugin configuration

### Bootstrap & Seed Data

**`src/bootstrap.js`**: Runs on application startup
- Checks if seed data has been loaded (via plugin store flag)
- Loads sample content from `data/data.json` and `data/uploads/`
- Sets public role permissions (read-only access to articles, authors, categories, tags, about, global)

**Important**: The seed script creates relationships between articles, authors, and categories, then publishes articles by setting `publishedAt`. Without this, articles remain in draft state.

## Database Configuration

The database type is selected via the `DATABASE_CLIENT` environment variable:
- `sqlite` (default): Uses `.tmp/data.db`, no additional config needed
- `mysql`: Requires `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
- `postgres`: Same as MySQL plus `DATABASE_SCHEMA` (defaults to 'public')

All database types support SSL with `DATABASE_SSL` and optional `DATABASE_SSL_KEY`, `DATABASE_SSL_CERT`, `DATABASE_SSL_CA`.

## API Structure

REST endpoints are auto-generated:
```
GET    /api/articles              # List with pagination
GET    /api/articles/:id          # Single article
POST   /api/articles              # Create (requires auth)
PUT    /api/articles/:id          # Update (requires auth)
DELETE /api/articles/:id          # Delete (requires auth)
```

**Query examples**:
```bash
# Filter by category slug
/api/articles?filters[category][slug][$eq]=tech

# Populate relations
/api/articles?populate=*

# Sort and paginate
/api/articles?sort=createdAt:desc&pagination[page]=1&pagination[pageSize]=10
```

## Type System

TypeScript definitions are auto-generated in `types/generated/`:
- `contentTypes.d.ts`: Content type schemas
- `components.d.ts`: Component schemas

These update automatically when you modify schemas. Import them for type-safe Strapi queries.

## Admin Panel Customization

Admin customization files are in `src/admin/`:
- `app.example.js`: Locale config, bootstrap function for admin startup logic
- `vite.config.example.js`: Vite build config with path aliases

Rename these files (remove `.example`) to enable customizations.

## Key Strapi Patterns

### Accessing Strapi Services
```javascript
// In controllers, services, or bootstrap
strapi.documents('api::article.article').findMany({ ... });
strapi.documents('api::article.article').create({ ... });
strapi.plugin('upload').service('upload').upload({ ... });
```

### Custom Controller Extensions
```javascript
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async findOne(ctx) {
    // Custom logic before
    const response = await super.findOne(ctx);
    // Custom logic after
    return response;
  },
}));
```

### Lifecycle Hooks
Add lifecycle hooks in `src/api/{contentType}/content-types/{contentType}/lifecycles.js`:
```javascript
module.exports = {
  beforeCreate(event) {
    // Runs before creating an entry
  },
  afterCreate(event) {
    // Runs after creating an entry
  },
};
```

## Important Notes

- **Draft vs Published**: Content requires `publishedAt` to be visible via the API. Use the publish button in the admin or set `publishedAt: new Date()` programmatically.
- **Media Uploads**: Use `strapi.plugin('upload').service('upload').upload()` to handle file uploads. Media is stored in `public/uploads/`.
- **Permissions**: Public role permissions are set in bootstrap. For authenticated requests, use API tokens (configured in Settings > API Tokens).
- **Relations**: When creating content with relations, pass the relation ID in the data payload (e.g., `{ author: authorId }`).
