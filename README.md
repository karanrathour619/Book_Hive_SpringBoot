# 📚 Book Hive - Full-Stack Book Store Application

Book Hive is a modern, responsive full-stack online book store application built with **Spring Boot 3** and **PostgreSQL** on the backend, and **React + Vite + Tailwind CSS** on the frontend.

---

## 🌟 Key Features

- **Book Catalog**: Browse trending and recommended books filtered by categories (Business, Technology, Fiction, Horror, Adventure).
- **Shopping Cart & Wishlist**: Manage items, calculate total pricing, and navigate to checkout.
- **Order Management**: Submit orders with shipping details, review order history by customer email.
- **Admin Dashboard**:
  - Secure JWT authentication.
  - Add, update, and delete books (with image upload support).
  - Business analytics: Total orders, total revenue, trending books count, and monthly sales trends.
- **Authentication**:
  - Admin login protected by **Spring Security** & **BCrypt** password encryption.
  - Role-based JWT bearer token verification.

---

## 🛠️ Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2**
- **Spring Data JPA** & **Hibernate**
- **PostgreSQL** (with H2 embedded fallback support for local testing)
- **Spring Security** & **JJWT (0.12.6)**
- **Maven**
- **Docker**

### Frontend
- **React 18**
- **Vite**
- **Redux Toolkit** & **RTK Query**
- **Tailwind CSS**
- **Axios**, **React Router DOM 6**, **Swiper**, **Chart.js**

---

## 📁 Project Structure

```
Book_Hive/
├── backend-springboot/       # Java Spring Boot backend
│   ├── src/main/java/com/bookhive/
│   │   ├── config/           # CORS, Security, and Static Resource configs
│   │   ├── controller/       # REST API Controllers (Books, Orders, Auth, Admin)
│   │   ├── dto/              # Request / Response DTOs
│   │   ├── model/            # JPA Entities (Book, Order, User)
│   │   ├── repository/       # Spring Data JPA Repositories
│   │   ├── security/         # JWT filter and utility classes
│   │   ├── service/          # Business logic layer
│   │   └── init/             # Default data initialization (admin user & starter books)
│   ├── pom.xml               # Maven dependencies
│   └── Dockerfile            # Container build configuration
│
└── frontend/                 # React + Vite frontend
    ├── src/
    │   ├── components/       # Navbar, Footer, Login, AdminLogin
    │   ├── context/          # Auth Context
    │   ├── pages/            # Home, Cart, Orders, Dashboard, Book management
    │   ├── redux/            # RTK Query APIs & Cart Slice
    │   └── utils/            # Base URL and helper functions
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Java 17+**
- **Maven 3.8+**
- **Node.js 18+** & **npm**

---

### 1. Run Backend (Spring Boot)

Navigate to the `backend-springboot` folder:
```bash
cd backend-springboot
```

Package and run the application:
```bash
mvn clean package -DskipTests
java -jar target/bookhive-backend-1.0.0.jar
```
*Or directly via Maven:*
```bash
mvn spring-boot:run
```

- **Backend URL**: `http://localhost:5000`
- **Health Check**: `http://localhost:5000/`
- **Database Console (H2)**: `http://localhost:5000/h2-console`
  - JDBC URL: `jdbc:h2:file:./data/bookhive;MODE=PostgreSQL;DATABASE_TO_LOWER=TRUE;DEFAULT_NULL_ORDERING=HIGH`
  - Username: `sa`
  - Password: *(leave blank)*

#### Default Admin Credentials:
- **Username**: `admin`
- **Password**: `admin123`

---

### 2. Run Frontend (React + Vite)

In a new terminal, navigate to the `frontend` folder:
```bash
cd frontend
```

Install dependencies and start the dev server:
```bash
npm install
npm run dev
```

- **Frontend URL**: `http://localhost:5173`
- **Admin Portal**: `http://localhost:5173/admin`

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/` | Public | Health check |
| `POST` | `/api/auth/admin` | Public | Admin login, returns JWT token |
| `GET` | `/api/books` | Public | Fetch all books (sorted newest first) |
| `GET` | `/api/books/{id}` | Public | Fetch single book by ID |
| `POST` | `/api/books/create-book` | Admin (JWT) | Create book with image upload (`multipart/form-data`) |
| `PUT` | `/api/books/edit/{id}` | Admin (JWT) | Update book information or cover image |
| `DELETE` | `/api/books/{id}` | Admin (JWT) | Delete book by ID |
| `POST` | `/api/orders` | Public | Place a new customer order |
| `GET` | `/api/orders/email/{email}` | Public | Fetch orders by customer email |
| `GET` | `/api/admin` | Public | Dashboard aggregate statistics |
| `GET` | `/uploads/{filename}` | Public | Serve uploaded cover images |

---

