# MERN Blogging Platform – Arnifi Coding Assignment

A full-stack multi-user blogging platform built with the MERN stack (MongoDB, Express.js, React, Node.js). Authenticated users can create, view, edit, and delete blogs. Users can also explore other blogs, filter by category or author, and manage their personal blog posts.

---

## Live Demo & Repository

- **Deployed App**: [https://blogger-nine-taupe.vercel.app/](https://blogger-nine-taupe.vercel.app/)
- **Deployed Backend**: [https://blogger-enky.onrender.com/](https://blogger-enky.onrender.com/)
- **Frontend Repo**: [https://github.com/samiraghav/blogger/tree/main/Frontend](https://github.com/samiraghav/blogger/tree/main/Frontend)
- **Backend Repo**: [https://github.com/samiraghav/blogger/tree/main/Backend](https://github.com/samiraghav/blogger/tree/main/Backend)

---

## Features

### Authentication
- JWT-based secure login/signup.
- Passwords hashed using `bcryptjs`.
- Only authenticated users can access protected APIs.

### Blog Management
- Create, Read, Update, Delete (CRUD) functionality.
- Users can only update/delete their own blogs.
- View all blogs (even by other users).
- Filtering by category and author via query params.

### API Endpoints

| Method | Endpoint            | Access       | Description                        |
|--------|---------------------|--------------|------------------------------------|
| POST   | /auth/signup        | Public       | Register a new user                |
| POST   | /auth/login         | Public       | Authenticate and receive JWT       |
| GET    | /blogs              | Protected    | Get all blogs                      |
| GET    | /blogs?category=..  | Protected    | Filter blogs by category/author    |
| POST   | /blogs              | Protected    | Create a new blog                  |
| PUT    | /blogs/:id          | Protected    | Update blog (if user is owner)     |
| DELETE | /blogs/:id          | Protected    | Delete blog (if user is owner)     |

---

## Technologies Used

### Backend
- **Node.js + Express.js**
- **MongoDB Atlas** + Mongoose
- **JWT for Authentication**
- **bcryptjs for password hashing**
- MVC folder structure with modular routing

### Frontend
- **React + Redux Toolkit**
- **React Router DOM**
- **Tailwind CSS** for UI
- **SweetAlert2** for notifications
- **Axios** for API integration

---

## Folder Structure

### Backend (`/backend`)
- /config → DB connection & JWT config
- /controllers → Business logic for blogs and auth
- /models → Mongoose models (User, Blog)
- /routes → API routes (auth, blogs)
- /middleware → Auth protection middleware
- /Frontend (`/frontend`)
- /features → Redux slices and API logic
- /components → Reusable UI components (BlogCard, Filter, Navbar, etc.)
- /pages → Route pages: Login, Signup, Blogs, MyBlogs, Edit, Create
- /utils → Formatters and helpers

---

## 🧪 How to Run Locally

### 1. Clone Repositories
```bash
git clone https://github.com/samiraghav/blogger
```

### 2. Backend Setup

cd Backend
npm install
- Create `.env` with:
```bash
    MONGO_URI=xx
    PORT=4000
    JWT_SECRET=xx
    CLOUDINARY_CLOUD_NAME=xx
    CLOUDINARY_API_KEY=xx
    CLOUDINARY_API_SECRET=xx
```

npm start

### 3. Frontend Setup
- cd Frontend
- npm install
- Create `.env` with:
```bash
    VITE_API_BASE_URL=http://localhost:4000
```
- npm run dev

### Best Practices Followed
- Modular, clean MVC structure

- Proper use of HTTP status codes

- Protected routes with access control

- Responsive and accessible UI

- Git used for version control with meaningful commits
