
# Node.js Backend Starter Template

> A production-ready Node.js and Express backend starter designed to provide a clean, scalable foundation for building modern backend applications.

[![Status](https://img.shields.io/badge/status-development-yellow)](#status)
[![License](https://img.shields.io/badge/license-MIT-blue)](#license)

---

## Overview

This template provides a reusable foundation for building production-oriented Node.js backend applications without repeatedly rebuilding the same project structure, infrastructure, and boilerplate.

Originally created as a personal backend starter, it has evolved into a general-purpose template that can serve as a foundation for personal projects and even production applications.

The template focuses on providing:

- Clean and modular architecture
- Feature-based organization
- Database abstraction
- Authentication infrastructure
- Standardized API responses
- Centralized error handling
- Request validation
- Centralized configuration
- Structured logging
- Reusable utilities
- Scalable service and repository layers

The goal is not to provide a complete application, but rather a strong foundation that can be extended according to the requirements of the project being built.



## Tech Stack

| Category | Technology |
| --- | --- |
| Framework | Node.js |
| API | Express.js |
| Specification | ES6+ |
| Database | MongoDB with Mongoose Sample (other dbs Supported as well) |
| Authentication Strategies | JWT, Refresh Token, OAuth, Passkeys |
| Validation | Zod |
| Logging | Custom Logger / Pino |
| Package Manager | npm |



## Features

### Core Infrastructure

- Modular Express application structure
- Centralized environment configuration
- Standardized API responses
- Global error handling
- Custom application errors
- Request validation
- Structured application logging
- Async request handling

### Database

- Repository abstraction
- Database provider layer
- MongoDB/Mongoose implementation
- Generic CRUD repository
- Feature-specific repositories
- Repository initialization and index synchronization

### Authentication

- Password-based authentication
- Secure password hashing with bcrypt
- JWT access tokens
- Configurable access-token transport
  - Bearer token
  - HTTP-only cookie
- Refresh-token sessions
- Refresh-token hashing
- Refresh-token rotation
- Refresh-token reuse prevention
- Session metadata
  - IP address
  - User agent
- Configurable refresh-token cookie transport

### Extensibility

The authentication architecture separates authentication strategies from token transports, allowing additional authentication mechanisms to be introduced without rewriting the core authentication service.

Planned authentication extensions include:

- OAuth
- Passkeys / WebAuthn


## Architecture

The application follows a layered and modular architecture designed to keep business logic independent from infrastructure concerns.

At a high level:

    HTTP Request
         │
         ▼
    Middleware
         │
         ▼
    Controller
         │
         ▼
    Service
         │
         ├── Providers
         ├── Strategies
         └── Utilities
         │
         ▼
    Repository
         │
         ▼
    Database

Authentication introduces additional abstractions for separating:

    Authentication Strategy
            │
            ├── JWT
            └── JWT + Refresh Sessions

    Authentication Transport
            │
            ├── Bearer
            └── Cookie

This allows authentication mechanisms and token delivery mechanisms to evolve independently.

### Detailed Architecture

For the complete architecture, request lifecycle, authentication design, repository abstraction, response handling, exception handling, and folder responsibilities, see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

## Project Structure

    src/
    ├── auth/
    ├── config/
    ├── controllers/
    ├── db/
    ├── middleware/
    ├── routes/
    ├── services/
    └── utils/

The exact responsibilities and relationships between these modules are documented in [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

Clone the repository and switch to this branch:

    git clone https://github.com/STRO09/BackendTemplates.git
    cd BackendTemplates
    git checkout NodejsV1

Install dependencies:

    npm install

Create your environment file:

    cp .env.example .env

Configure the required environment variables and start the development server:

    npm run dev

---

## Environment Configuration

Environment variables are centralized through the application configuration module.

The `.env.example` file contains the available configuration options.

Important configuration includes:

- Database configuration
- JWT configuration
- Refresh-token configuration
- Authentication strategy
- Authentication transport
- Cookie configuration

Environment variables are intentionally kept separate from application logic so that configuration can be changed without modifying the implementation.

---

## Authentication Modes

The template currently supports multiple authentication configurations.

### JWT

    Password
       │
       ▼
    JWT Access Token
       │
       ├── Bearer
       └── Cookie

### JWT + Refresh Tokens

    Password
       │
       ▼
    Access Token + Refresh Token
                  │
                  └── Persisted Refresh Session

Access tokens may be delivered through:

- Authorization Bearer header
- HTTP-only cookie

Refresh tokens are delivered through an HTTP-only cookie.

Refresh tokens are persisted as hashes rather than plaintext values and are rotated when consumed.


## Screenshots & Media

### Screenshots

<!-- Add screenshots here -->

### Demo Video

<!-- Add demo video or GIF here -->

### Architecture Diagram

<!-- Add architecture diagram here -->


## Testing

Testing documentation and automated test coverage will be expanded as the template evolves.



## Future Enhancements

Planned improvements include:

- OAuth 2.0 / OpenID Connect
- Passkeys / WebAuthn
- Logout and session management
- Expanded automated testing
- Rate limiting
- Additional security hardening
- Email verification
- Password reset flows
- Account recovery
- API documentation
- Production deployment examples
- Additional database implementations


## Status

**Development**

The template is actively being developed as part of the Backend Templates project.

The architecture and APIs may change as additional authentication mechanisms, infrastructure, and production-oriented features are introduced.


## Documentation

Additional documentation:

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — Architecture, request lifecycle, authentication, repositories, responses, exceptions, and design decisions.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — Contribution and development guidelines.


## Contributing

Contributions, suggestions, improvements, and discussions are welcome.

Please read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before submitting issues or pull requests.


## License

This project is licensed under the MIT License.

See [`LICENSE`](./LICENSE) for details.

---

## Author

**Sagar Janjoted**

Part of the [`BackendTemplates`](https://github.com/STRO09/BackendTemplates) project.

If you find this template useful, consider giving the repository a ⭐.

