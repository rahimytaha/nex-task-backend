# NexTask Backend 🚀

**A professional, secure, and scalable task management backend built with NestJS and TypeScript**

NexTask Backend is a full-featured RESTful API for modern task management applications. It supports user authentication, task CRUD operations, checklists, deadlines, scheduling/reminders, and analytics with a clean, modular architecture ready for production.

## Features
- 🏗️ **Modular Architecture** — Separate modules for auth, tasks, users, database, scheduling, and common utilities
- 🔐 **JWT Authentication** — Secure login/register with Guards and protected routes
- 🗄️ **Database Persistence** — Configured via environment variables (TypeORM supported)
- ⏰ **Task Scheduling** — Cron jobs and reminders for deadlines
- 📝 **Advanced Task Management** — Dynamic tasks, checklists, priorities, progress tracking, and chart data support
- 📊 **Analytics Ready** — Data aggregation for dashboards
- 🧪 **Comprehensive Testing** — Unit and e2e tests with Jest
- ⚙️ **Professional Tooling** — ESLint (flat config), Prettier, Winston logging, global ValidationPipe
- 🔒 **Security Best Practices** — Helmet, CORS, rate limiting ready, sensitive data masking in logs
- 📚 **Beautiful API Documentation** — Swagger/OpenAPI with blue theme, Bearer auth support, and detailed examples
- ☁️ **Deployment Ready** — Easy to containerize (Docker support recommended)

## Technologies Used
- **NestJS** — Progressive Node.js framework
- **TypeScript** — Type-safe development
- **Winston** — Advanced logging with file/console output
- **class-validator & class-transformer** — Input validation
- **@nestjs/swagger** — API documentation
- **JWT** — Authentication
- **Jest** — Testing framework

## Project Structure
```
nex-task-backend/
├── public/                   # Static files (Swagger custom theme)
│   └── swagger/
│       └── theme-feeling-blue.css  # Custom blue theme for Swagger UI
├── src/                      # Main source code
│   ├── auth/                 # Authentication module (JWT, Guards, login/register)
│   ├── common/               # Shared utilities (interceptors, pipes, logger, filters)
│   │   ├── interceptors/     # LoggingInterceptor for request/response logging
│   │   └── logger/           # Winston custom logger configuration
│   ├── database/             # Database configuration (.env support)
│   ├── schedule/             # Scheduling module for reminders/cron jobs
│   ├── task/                 # Core task management (controllers, services, DTOs, entities)
│   ├── users/                # User management and profiles
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts               # Bootstrap with Swagger, ValidationPipe, Winston logger
├── test/                     # Unit and e2e tests
│   └── app.e2e-spec.ts
├── .env.example              # Environment variables template
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── tsconfig.json
├── tsconfig.build.json
└── README.md                 
```

## Prerequisites
- Node.js v18 or higher
- npm or pnpm/yarn
- Database (PostgreSQL recommended, SQLite for development)

## Installation & Running Locally
```bash
git clone https://github.com/rahimytaha/nex-task-backend.git
cd nex-task-backend

npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your DB_URL, JWT_SECRET, etc.

# Development mode (hot-reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

Server runs on `http://localhost:3000` by default.

## API Documentation
Visit **http://localhost:3000/api** for interactive Swagger UI with:
- Beautiful blue theme
- Bearer JWT authorization (enter token without "Bearer" prefix)
- Detailed examples and validation

## Logging
- Professional Winston logging with request/response tracking via global LoggingInterceptor
- Logs to console (colored) and files (`logs/error.log`, `logs/combined.log`)
- Context-aware with timestamps, levels (error, warn, info, debug), and stack traces

## Testing
```bash
npm run test           # Unit tests
npm run test:watch     # Watch mode
npm run test:e2e       # End-to-end tests
npm run test:cov       # Coverage report
```

## Deployment
- Ready for Docker/Kubernetes
- Recommended: Add Dockerfile and docker-compose.yml
- For AWS: Use `@nestjs/mau`

## Security Notes
- Global ValidationPipe with whitelist enabled
- Protected routes with AuthGuard('jwt')
- Sensitive data masked in logs
- Add Helmet and Throttler for production

## Contributing
Contributions welcome! Open issues or submit pull requests.

## Resources
- NestJS Documentation: https://docs.nestjs.com
- Swagger Module: https://docs.nestjs.com/openapi/introduction

## License
MIT License — Free to use, modify, and distribute.

---

**Built with ❤️ by rahimytaha**  
This project evolved from a basic NestJS starter to a production-ready task management backend with authentication, advanced logging, beautiful Swagger docs, and modular design.  

If you find it useful, give it a ⭐ star! Let's build amazing task apps together 🚀