# Spring Boot Starter Template

A production-ready Spring Boot starter built with Java 17 and Spring Boot 3.

Designed to eliminate repetitive backend setup by providing a reusable foundation with clean architecture, standardized API responses, centralized exception handling, feature-based organization and authentication-ready infrastructure.

---

# 🏗 Tech Stack

| Category | Technology |
|----------|------------|
| Language | Java 17 |
| Framework | Spring Boot 3 |
| ORM |  Spring Data JPA |
| Build Tool | Maven |
| Databases | MySQL, PostgreSQL |
| Utilities | Lombok |

---

## Project Structure

```
src
└── main
    ├── java
    │   └── com.template.auths
    │
    │       ├── common
    │       │
    │       ├── endpoints
    │       ├── exception
    │       ├── response
    │       │
    │       └── ...
    │
    │       ├── user
    │       │
    │       ├── controller
    │       ├── dto
    │       │   ├── request
    │       │   └── response
    │       ├── entity
    │       ├── mapper
    │       ├── repository
    │       ├── service
    │       │   └── impl
    │       └── ...
    │
    └── resources
        ├── application.yml
        ├── application-dev.yml
        ├── application-prod.yml
        ├── application-test.yml
        ├── application-mysql.yml
        ├── application-postgres.yml
        └── application-h2.yml
```

The project follows a feature-based architecture, where every feature owns its controller, service, repository, entity, mapper, and DTOs. Shared functionality is placed under the common package.

Refer to architecture.md for detailed architecture information.

---

## How To Run

1. Clone the Repo

    ```git clone https://github.com/STRO09/BackendTemplates.git```


2. Switch to this branch

    ```git checkout -b SpringBootv1NoAuth```


3. Copy the Readme and replace with your config

    ```cp .env.example .env```


4. Run your Springboot Application

    ```mvn spring-boot:run```

---

# 📦 Features

Currently implemented:

- Sample User CRUD
  - Request validation
  - Standardized API responses
  - Global exception handling
  - Centralized endpoint management


---

# 🎯 Design Goals

This template aims to provide:

- Clean architecture
  - Consistent project structure
  - Minimal boilerplate
  - Production-ready foundations
  - Easy scalability
  - Reusable backend template for future projects

---

# 📖 Documentation

Additional architecture documentation will be available inside the `docs/` directory as the project evolves.

---

# 📜 License

This project is intended as an open-source reusable Spring Boot starter template.