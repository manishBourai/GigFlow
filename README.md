# 📘 GigFlow – Mini Freelance Marketplace

## 🧾 Overview

**GigFlow** is a mini freelance marketplace platform built with the **MERN stack** (MongoDB, Express, React, Node) using:

- **React** for the frontend UI  
- **Zustand** for client-side state management  
- **Axios** for API calls  
- **TailwindCSS** for styling  
- **Express / Node.js** for backend APIs  
- **MongoDB (Mongoose)** for database  

The application allows **clients** to post gigs and **freelancers** to browse and apply for them with a modern, responsive UI.

---

## 🛠 Technology Stack

| Layer | Technology |
|------|------------|
| Frontend | React, TailwindCSS |
| State Management | Zustand |
| HTTP Client | Axios |
| Routing | React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | JWT (httpOnly cookies) |
| Package Manager | pnpm |

---

## 🚀 Features

### 🔐 Authentication
- User registration (Client / Freelancer roles)
- Secure login using JWT stored in httpOnly cookies
- Logout functionality
- Persistent login using `/auth/me`

### 👤 User Profiles
- Public user profile page
- View posted gigs
- Display role, bio, and skills

### 💼 Gigs
- Create gigs (Client only)
- Browse all gigs
- Gig detail page
- Apply to gigs (Freelancer only)
- Prevent duplicate applications
- Applied gigs are marked and disabled

### 🎨 UI / UX
- TailwindCSS-based responsive design
- Modern card layouts
- Loading & error states
- Role-based navigation

---

## 📁 Project Structure

```
gigflow/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── App.jsx
│   └── tailwind.config.js
├── server/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
└── README.md
```

---

## ⚙️ Local Setup Instructions

### ✅ Prerequisites
- Node.js (v16+)
- pnpm
- MongoDB (local or Atlas)

---

### 🔹 Backend Setup

```bash
cd server
pnpm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
NODE_ENV=development
```

Run backend:

```bash
pnpm dev
```

Backend runs on `http://localhost:5000`

---

### 🔹 Frontend Setup

```bash
cd client
pnpm install
pnpm dev
```

Frontend runs on `http://localhost:5173`

---

## 🔗 API Endpoints

### Auth
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
```

### Gigs
```
GET  /api/gigs
GET  /api/gigs/:id
POST /api/gigs
POST /api/gigs/:id/apply
```

### Users
```
GET /api/auth/:id
```

---

## 📌 Notes for Job Assignment

- Demonstrates full-stack MERN skills
- Secure authentication with cookies
- Clean state management using Zustand
- Scalable project structure
- Production-ready patterns

---



**Your Name**  
Full Stack Developer  
