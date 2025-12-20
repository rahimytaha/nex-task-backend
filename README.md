```markdown
# NexTask Backend 🚀

A powerful and scalable backend API for a modern task management application, built with **NestJS** and **TypeScript**.

This is the backend repository for **NexTask** — a professional task management system. It provides RESTful APIs for managing tasks, including advanced features like dynamic task handling, checklists, and chart data integration.

Powered by NestJS, the project follows best practices with a clean, modular, and production-ready architecture.

## Features
- 🏗️ **Modular NestJS Architecture** — Clear separation of concerns
- 📝 **Full TypeScript Support** — Type-safe code for reliability
- 🧪 **Comprehensive Testing** — Unit and end-to-end tests with Jest
- ⚙️ **Modern Tooling** — ESLint (flat config), Prettier, and Nest CLI
- 📊 **Advanced Task Management** — Dynamic tasks, checklist support, and chart data functions
- ☁️ **Deployment Ready** — Easy to build and deploy on various platforms

## Technologies Used
- **NestJS** — Progressive Node.js framework
- **TypeScript** — Strongly typed superset of JavaScript
- **Node.js** — Server runtime
- **Jest** — Testing framework

## Project Structure

```plaintext
nex-task-backend/
├── .vscode/                  # Recommended VS Code settings and extensions
├── src/                      # Main source code
│   ├── main.ts               # Application entry point and bootstrap
│   ├── app.module.ts         # Root module importing all features
│   ├── app.controller.ts     # Root controller (e.g., health check)
│   ├── app.service.ts        # Root service (if needed)
│   └── ...                   # Feature modules (tasks with dynamic logic, checklists, etc.)
├── test/                     # Test suite
│   ├── app.e2e-spec.ts       # End-to-end tests example
│   └── ...                   # Unit tests for services and controllers
├── .gitignore                # Files and folders to ignore in Git
├── .prettierrc               # Code formatting rules
├── eslint.config.mjs         # ESLint configuration (modern flat format)
├── nest-cli.json             # NestJS CLI settings
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Exact dependency versions
├── tsconfig.json             # TypeScript compiler options
├── tsconfig.build.json       # TypeScript options for production build
└── README.md                 # This documentation file
```

### Key Files & How They Work
- **`src/main.ts`**: Bootstraps the Nest application, enables global pipes, interceptors, and configurations.
- **`src/app.module.ts`**: The root module that organizes and imports all feature modules (e.g., TasksModule).
- **Feature Modules** (inside `src/`): Follow NestJS conventions — controllers handle routes, services contain business logic, DTOs validate input, and entities define data models.
- **`test/`**: Jest-powered tests ensuring code quality (unit tests for individual components, e2e for full API flows).
- **Configuration files**: `tsconfig*.json`, `eslint.config.mjs`, `.prettierrc` keep code consistent and error-free.

The project evolved from a standard NestJS template with custom enhancements for task checklists and dynamic data handling.

## Prerequisites
- Node.js v18 or higher
- npm (or yarn/pnpm)

## Installation & Running Locally
```bash
git clone https://github.com/rahimytaha/nex-task-backend.git
cd nex-task-backend

npm install

# Development mode (with hot-reload)
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The server runs on `http://localhost:3000` by default.

## Available Scripts
```bash
npm run start          # Run in production mode
npm run start:dev      # Development with watch mode
npm run start:debug    # Debug mode
npm run build          # Compile TypeScript to JavaScript
npm run test           # Run unit tests
npm run test:watch     # Tests in watch mode
npm run test:e2e       # End-to-end tests
npm run test:cov       # Test coverage report
npm run lint           # Run ESLint
```

## Testing
```bash
npm run test           # Unit tests
npm run test:e2e       # End-to-end tests
npm run test:cov       # Coverage report
```

## Deployment
The project is ready for deployment on platforms like Vercel, AWS, or Heroku. For AWS, you can use NestJS's official Mau tool:
```bash
npm install -g @nestjs/mau
mau deploy
```

## Contributing
Contributions are welcome! Open issues, submit pull requests, or suggest improvements.

## Resources
- Official NestJS Documentation: https://docs.nestjs.com
- TypeScript Documentation: https://www.typescriptlang.org

## License
MIT License — Free to use, modify, and distribute.

---

**Built with ❤️ by rahimytaha**  
If this project helps you, don't forget to ⭐ star the repo! 🚀
```
