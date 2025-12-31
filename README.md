
# 🛒 E-Commerce Web Application

**Spring Boot REST API & Next.js Frontend**

---

## 📌 Project Description

This is a **full-stack e-commerce web application** with:

* **Spring Boot REST API** for backend services
* **Next.js frontend** for user interaction
* **Neon (Serverless PostgreSQL)** database for data persistence

The application supports:

* User authentication & JWT-based authorization
* Product & category management
* Shopping cart and order processing

The backend follows **RESTful API principles**, and the frontend provides a responsive, modern UI.

---

## 🧰 Technology Stack

### Backend

* Java 17
* Spring Boot
* Spring Data JPA (Hibernate)
* Spring Security + JWT Authentication
* PostgreSQL (Neon)
* Swagger / OpenAPI

### Frontend

* Next.js + TypeScript
* Tailwind CSS
* Fetch API

### Tools

* Git & GitHub
* Postman (API testing)
* Neon (Cloud PostgreSQL)

---

## ⚙️ Setup and Run Instructions

### 🔹 Backend (Spring Boot)

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/abenezer7813/GFive-Ecommerce1.git
cd backend
```

#### 2️⃣ Configure application properties

Spring Boot **does not use `.env` files by default**.
Set your database and JWT settings in:

```
backend/src/main/resources/application.properties
```

```properties
spring.datasource.url=jdbc:postgresql://<neon-host>/<db-name>?sslmode=require
spring.datasource.username=<neon-username>
spring.datasource.password=<neon-password>

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

jwt.secret=your_jwt_secret
jwt.expiration=86400000
```

> ⚠️ Ensure SSL is enabled when using Neon (`sslmode=require`).

#### 3️⃣ Run the backend

```bash
./mvnw spring-boot:run
```

Backend server:

```
http://localhost:8081
```

Swagger UI:

```
http://localhost:8081/swagger-ui.html
```

---

### 🔹 Frontend (Next.js)

#### 1️⃣ Navigate to the frontend folder

```bash
cd frontend
```

#### 2️⃣ Install dependencies

```bash
npm install
```

#### 3️⃣ Configure environment variables

Create `.env.local` in the frontend folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

> ⚠️ `NEXT_PUBLIC_` prefix is required to expose the variable to the browser.
> ⚠️ Add `.env.local` to `.gitignore` to avoid committing secrets.

#### 4️⃣ Run the frontend

```bash
npm run dev
```

Frontend server:

```
http://localhost:3000
```

---

## 🔐 Authentication & Security

* JWT-based authentication
* Passwords encrypted with **BCrypt**
* Public endpoints: login & registration
* Protected endpoints require a JWT in the `Authorization` header:

```
Authorization: Bearer <token>
```

---

## 🔗 Sample API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Users

```http
GET    /api/users
GET    /api/users/{id}
PUT    /api/users/{id}
DELETE /api/users/{id}
```

### Products

```http
POST   /api/products
GET    /api/products
GET    /api/products/{id}
PUT    /api/products/{id}
DELETE /api/products/{id}
```

### Categories

```http
POST   /api/categories
GET    /api/categories
PUT    /api/categories/{id}
DELETE /api/categories/{id}
```

### Cart

```http
POST   /api/cart/add
GET    /api/cart
DELETE /api/cart/remove/{itemId}
```

### Orders

```http
POST   /api/orders
GET    /api/orders
GET    /api/orders/{id}
```

---

## 🗄 Database

* Uses **Neon**, a **serverless cloud PostgreSQL database**
* Fully PostgreSQL-compatible
* Works seamlessly with **Spring Data JPA & Hibernate**

---

## 📁 Project Structure

```text
your-project/
├── backend/        # Spring Boot REST API
│   ├── src/
│   └── pom.xml
├── frontend/       # Next.js frontend
│   ├── pages/ or app/
│   └── package.json
└── README.md       # This file
```

---

## 👥 GitHub Collaboration

* Backend and frontend maintained in separate folders
* Clean, meaningful Git commits
* Contributions tracked via GitHub commit history

---

## Notes

* Backend: Use `application.properties` (IntelliJ compatible)
* Frontend: Use `.env.local` with `NEXT_PUBLIC_` prefix
* Do **not** commit secrets to GitHub


