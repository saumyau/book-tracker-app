# 📚 Book Tracker App

A full-stack Book Tracker app with a **React frontend** and **Spring Boot backend** that allows users to track books (add, view, delete, etc.). Data is stored in an in-memory H2 database (or can be configured to use MySQL/PostgreSQL).

---

## 🎯 Overall Goal

You're building a full-stack Book Tracker app that:
- Lets users **track books** (add, view, delete, etc.)
- Has a **React frontend** and a **Spring Boot backend**
- Stores data in H2 (or another database)

---

## 📦 Backend: Spring Boot (`book-tracker-backend`)

### 🔑 Key Files and Their Purpose

| File / Folder                    | Purpose                                                                 |
|----------------------------------|-------------------------------------------------------------------------|
| `BookTrackerApplication.java`    | Main class that bootstraps the Spring Boot app                         |
| `controller/BookController.java` | REST controller for API endpoints like GET/POST/DELETE                 |
| `model/Book.java`                | Entity class annotated with `@Entity`, maps to the `books` table       |
| `repository/BookRepository.java` | Interface extending `JpaRepository`, enables DB operations             |
| `resources/application.properties` | Configures DB (e.g., H2/MySQL), server port, etc.                     |
| `pom.xml`                        | Defines dependencies and plugins for Spring Boot, JPA, H2, etc.        |

### ⚙️ Backend Data Flow

1. React frontend sends HTTP requests to endpoints like `/api/books`
2. `BookController` handles these requests and uses `BookRepository` for DB operations
3. `Book` entity maps to the database and gets stored or fetched accordingly
4. JSON responses are returned to the frontend

---

## 💻 Frontend: React (`book-tracker-frontend`)

### 🔑 Key Files and Their Purpose

| File / Folder                  | Purpose                                                                   |
|-------------------------------|---------------------------------------------------------------------------|
| `src/App.js`                  | Main React component; sets up routes and high-level state                 |
| `src/components/BookList.js` | Fetches and displays list of books from the backend                       |
| `src/components/AddBook.js`  | Form to add new books by POSTing to the backend                           |
| `src/components/BookItem.js` | Renders each book (with options like delete)                              |
| `package.json`               | Lists project dependencies (React, Axios) and scripts like `npm start`    |
| `.env` (optional)            | Stores backend API URL as an environment variable                         |
| `public/index.html`          | Base HTML template for React app                                          |
| `src/index.js`               | Entry point that renders `<App />` into the DOM                           |

### ⚙️ Frontend Data Flow

1. `BookList` fetches books via `GET /api/books` using `axios` or `fetch`
2. JSON data is rendered in `BookItem` components
3. `AddBook` sends new book data via a `POST` request to `/api/books`
4. On success, the list updates via state change or a re-fetch

---

## 🔗 Connecting Frontend and Backend

To allow communication between frontend (port 3000) and backend (port 8080), you must enable **CORS** in the backend:


@CrossOrigin(origins = "http://localhost:3000")

Frontend requests go to: http://localhost:8080/api/books
While the frontend app runs on: http://localhost:3000


How to Run (Flow Recap)
🔙 Backend
cd book-tracker-backend/
mvn spring-boot:run
Backend will start on: http://localhost:8080

🔜 Frontend
cd book-tracker-frontend/
npm install      # Run this only the first time
npm start
Frontend will start on: http://localhost:3000


