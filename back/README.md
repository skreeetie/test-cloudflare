# CF Web Monorepo

[🇷🇺 Russian version](README.ru.md)

Modern single-page web application based on Cloudflare Workers with a monorepo structure.

🌐 **Demo:** https://cf-web-monorepo.whiletruedoend.workers.dev/

## Features

- 🚀 One-click deployment with CI/CD pipeline
- 🔄 Type synchronization between backend and frontend
- 📈 Out-of-the-box horizontal scaling
- 💾 Easy-to-implement caching system via KV integration
- 🗄️ Simpliest connection to storage and databases
- 🛠️ Development and testing environments
- 📚 Auto-generated API documentation

## Quick Start

### Requirements

- Node.js (LTS version recommended)
- npm
- Cloudflare account

### Initial Setup

1. **Configure wrangler.json:**
   - Modify `wrangler.json` according to your needs. Use `wrangler.docs.json` for a quick overview of configuration parameters. Detailed documentation available in [Cloudflare Workers docs](https://developers.cloudflare.com/workers/)
   - After changing Wrangler resources (D1, KV, etc.), run:
     ```bash
     npm run cf-typegen
     ```
     This will generate TypeScript types for your resources

2. **Prepare dist folder:**
   - Backend requires the `dist` folder to exist before running
   - Either create an empty `dist` folder
   - Or build the frontend with `npm run build`

3. **Set up D1 database:**
   - Create a D1 database via Cloudflare dashboard
   - Update D1 configuration in `wrangler.json` with your database details

### Development

There are several ways to run the development environment:

1. **Combined build and watch mode:**
```bash
npm run build
npm run dev
```
Note: Hot reload for frontend doesn't work in this mode, only for backend.

2. **Separate frontend and backend development:**
```bash
npm run fdev  # Frontend development server
npm run dev   # Backend development server
```

In this mode, frontend hot reload works.

### Deployment

Deploy the application with a single command:

```bash
npm run deploy
```

## API Documentation

Auto-generated API documentation is available at:
```
/api/docs
```

## Database Migrations

To manage the database schema:

```bash
# Create a new migration
npm run makemigrations

# Apply migrations locally
npm run migrate --db=DATABASE_NAME_FROM_WRANGLER_JSON
# Apply migrations remotely for dev/test/production databases
npm run migrate:dev --db=DATABASE_NAME_FROM_WRANGLER_JSON
npm run migrate:test --db=DATABASE_NAME_FROM_WRANGLER_JSON
npm run migrate:prod --db=DATABASE_NAME_FROM_WRANGLER_JSON
```

## Project Structure

```
.
├── src/                    # Frontend source code
├── backendSrc/            # Backend source code
│   ├── migrations/        # Database migrations
│   └── types/            # Backend type definitions
├── shared/                # Shared types and utilities
├── worker-configuration.d.ts  # Worker environment variables interface
├── public/               # Static resources
├── dist/                 # Build output
├── drizzle.config.ts    # Drizzle ORM configuration for migrations
├── wrangler.toml        # Cloudflare Workers configuration
├── .dev.vars            # Environment variables for local development
├── .env                 # Environment variables for frontend/backend migrations
└── tsconfig.json        # TypeScript configuration
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the terms of the license file included in the repository.
