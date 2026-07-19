# Architecture

This document explains the architectural decisions behind the Spring Boot Starter Template.

The goal of this template is not just to provide working code, but to provide a scalable, maintainable foundation that can be reused across multiple backend projects.

---

# Architectural Goals

The project is designed around the following principles:

- Separation of Concerns
- Single Responsibility Principle
- Feature-Based Organization
- Thin Controllers
- Business Logic Isolation
- Standardized API Contracts
- Centralized Error Handling
- Easy Scalability
- Production-Ready Structure

---

# Overall Request Lifecycle

Every incoming request follows the same flow.

```
HTTP Request
        │
        ▼
Controller
        │
        ▼
Service
        │
        ▼
Repository
        │
        ▼
Hibernate / JPA
        │
        ▼
Database
```

The response follows the reverse path.

```
Database
        │
        ▼
Repository
        │
        ▼
Service
        │
        ▼
Controller
        │
        ▼
ApiResponses
        │
        ▼
HTTP Response
```

Each layer has one responsibility.

---

# Layer Responsibilities

## Controller

Controllers are responsible only for HTTP communication.

Responsibilities:

- Receive requests
- Validate incoming DTOs
- Call services
- Return standardized responses

Controllers **must never**

- Access repositories
- Contain business logic
- Perform database operations

Example

```java
return ApiResponses.ok(
    "User fetched successfully.",
    userService.getUserById(id)
);
```

---

## Service

The service layer contains the application's business logic.

Responsibilities:

- Implement business rules
- Validate business constraints
- Coordinate repositories
- Throw business exceptions

Examples

- Email already exists
- User not found
- Password validation
- Authorization checks

Services should never contain HTTP-related code.

---

## Repository

Repositories are responsible for data persistence.

Responsibilities

- CRUD operations
- Database queries
- Entity retrieval

Repositories should never contain business logic.

---

## Entity

Entities represent database tables.

Responsibilities

- Persist application data
- Define relationships
- Database mapping

Entities should never be exposed directly through APIs.

---

## DTO

DTOs (Data Transfer Objects) define communication between clients and the application.

```
Request

↓

Request DTO

↓

Entity

↓

Response DTO

↓

Client
```

Separating DTOs from entities provides

- Better security
- Stable API contracts
- Easier versioning
- Validation support

---

## Mapper

Mappers convert

```
Request DTO
        │
        ▼
Entity
        │
        ▼
Response DTO
```

Keeping mapping separate keeps services focused only on business logic.

---

# Feature-Based Architecture

Instead of grouping classes by type

```
controllers/

repositories/

services/
```

the project groups classes by feature.

```
user/

    controller/

    dto/

    entity/

    mapper/

    repository/

    service/
```

Benefits

- Better modularity
- Easier navigation
- Features remain self-contained
- Easier extraction into microservices later

---

# Common Package

Shared infrastructure is placed inside the `common` package.

Current structure

```
common

├── endpoints
├── exception
└── response
```

As the project grows this package may also contain

```
common

config/

constants/

security/

utils/

validation/

logging/

events/
```

Everything inside `common` should be reusable across multiple features.

---

# Standardized Responses

Every endpoint returns the same response format.

Example

```json
{
    "success": true,
    "status": 200,
    "message": "User fetched successfully.",
    "data": {},
    "timestamp": "..."
}
```

This structure is provided by

```
ApiResponse

↓

ApiResponses
```

Instead of manually constructing `ResponseEntity` objects inside every controller, controllers delegate response creation to `ApiResponses`.

Example

```java
return ApiResponses.created(
    "User created successfully.",
    user
);
```

Benefits

- Consistent API contract
- Cleaner controllers
- Easier frontend integration
- Centralized response formatting

---

# Exception Handling

All exceptions are handled centrally.

Flow

```
Controller

↓

Service

↓

throw ApiException(...)

↓

GlobalExceptionHandler

↓

ApiResponses.error(...)

↓

Client
```

Example

```java
throw ApiException.notFound(
    "User not found."
);
```

Response

```json
{
    "success": false,
    "status": 404,
    "message": "User not found.",
    "data": null,
    "timestamp": "..."
}
```

Benefits

- No repetitive try-catch blocks
- Consistent error responses
- Easier maintenance
- Centralized error management

---

# Endpoint Management

Endpoints are centralized.

Instead of

```java
@RequestMapping("/api/v1/users")
```

controllers use

```java
@RequestMapping(UserEndpoints.BASE)
```

Benefits

- Single source of truth
- Easier API versioning
- Cleaner controllers
- No duplicated route strings

---

# Environment Configuration

The project separates environment configuration from database configuration.

Environment profiles

```
application.yml

application-dev.yml

application-prod.yml

application-test.yml
```

Database profiles

```
application-mysql.yml

application-postgres.yml

application-h2.yml
```

Environment variables are loaded through

```
.env

.env.local

.env.example
```

This allows switching environments without changing source code.

---

# Dependency Flow

Dependencies should always move downward.

```
Controller
        │
        ▼
Service
        │
        ▼
Repository
        │
        ▼
Database
```

Allowed

```
Controller → Service

Service → Repository
```

Not Allowed

```
Controller → Repository

Repository → Service

Entity → Controller
```

Maintaining this dependency direction keeps the architecture clean and prevents tight coupling.

---

# Current Architecture

```
src

common

    endpoints

    exception

    response

user

    controller

    dto

        request

        response

    entity

    mapper

    repository

    service

        impl
```

Every new feature should follow the same structure.

---

# Future Architecture

The next evolution of this template introduces authentication.

```
auth

controller/

dto/

entity/

repository/

service/

mapper/
```

along with shared security infrastructure

```
common

security

config

filters

jwt

oauth

passkeys
```

The goal is to extend the architecture without changing its fundamental principles.

Every feature remains self-contained while shared infrastructure stays inside the `common` package.

---

# Guiding Principle

> Controllers handle HTTP.

> Services handle business logic.

> Repositories handle persistence.

> Entities represent data.

> DTOs represent communication.

> Mappers translate between them.

Keeping each layer focused on a single responsibility results in code that is easier to understand, test, extend, and maintain.