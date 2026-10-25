# Modern Full-Stack MERN Blog Platform

A responsive, high-performance blog platform featuring 3D Three.js canvas effects, Lenis smooth scrolling, GSAP animations, JWT authentication, and MongoDB integration.

---

## 📁 Clean Repository Structure

```
36-blog-wrriting/
├── backend/                  # Express + MongoDB API Server
│   ├── controllers/          # Auth, Blog, User, and Debug Controllers
│   ├── middleware/           # JWT Verification Middleware
│   ├── models/               # Mongoose Schemas (User, Blog, Comment, Notification)
│   ├── routes/               # API Routes
│   ├── utilities/            # Cloudinary Upload Utility
│   ├── .env.example          # Backend Environment Template
│   ├── package.json
│   └── server.js             # API Entry Point (Port 3001)
├── frontend/                 # Vite + React 19 Client
│   ├── src/
│   │   ├── components/       # 3D Scene, Navbar, Magnetic, SmoothScroll, Cursor
│   │   ├── context/          # User Authentication Context
│   │   ├── pages/            # Home, Feed, BlogDetail, CreateBlog, Profile, Login, Signup
│   │   └── utils/            # Axios API Client & Animations
│   ├── .env.example          # Frontend Environment Template
│   ├── index.html
│   ├── package.json
│   └── vite.config.js        # Vite Config (Port 5179)
├── API_TESTING_GUIDE.md      # Backend API Testing Guide
├── DEVELOPMENT_CHECKLIST.md  # Feature Implementation Checklist
├── GETTING_STARTED.md        # Comprehensive Setup Guide
├── PROJECT_SUMMARY.md        # Architecture & Status Overview
├── install-all.bat           # One-Click Dependency Installer
├── start-all.bat             # One-Click Dual Server Launcher
├── .gitignore                # Root Gitignore
├── package.json              # Root Workspace Config
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ or v20+
- **MongoDB**: Running locally on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI

### 2. Install Dependencies
Double-click `install-all.bat` or run:
```bash
# Backend
cd backend && npm install --legacy-peer-deps

# Frontend
cd ../frontend && npm install --legacy-peer-deps
```

### 3. Environment Setup

#### Backend (`backend/.env`)
Copy `backend/.env.example` to `backend/.env`:
```env
PORT=3001
MONGO_URL=mongodb://127.0.0.1:27017/blog-app
JWT_SECRET=supersecret_jwt_key_replace_in_production
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

#### Frontend (`frontend/.env`)
Copy `frontend/.env.example` to `frontend/.env`:
```env
VITE_API_URL=http://localhost:3001/api
```

### 4. Running the Application
Double-click `start-all.bat` or run separately:

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

- **Frontend App**: `http://localhost:5179`
- **Backend API**: `http://localhost:3001/api`

---

## 🛠️ Cleanups & Fixes Applied
1. **Restructured Nested & Typo Folders**: Eliminated deep nested `log wrriting/blog/blog/` path and relocated `backend/` and `frontend/` to clean top-level directories.
2. **Removed Stale Duplicate Files**: Deleted orphaned partial `src/` directory from the legacy directory tree.
3. **Fixed CSS Syntax Error**: Repaired missing closing brace and truncated CSS block at the end of `pages.css`.
4. **Enhanced API Client**: Added configurable `import.meta.env.VITE_API_URL` with automatic Bearer token interceptor in `api.js`.
5. **Configured Port Synchronization**: Fixed `vite.config.js` to serve on port `5179` matching the backend CORS and documentation.
6. **Removed OS Junk**: Cleaned out macOS `.DS_Store` files and updated root `.gitignore`.
7. **Provided One-Click Launchers**: Added `install-all.bat` and `start-all.bat` for streamlined developer workflow.

---

## License & Attribution
- Original Repository Origin: `https://github.com/AVISHJAIN9/blog-wrriting`
- Licensed under the **ISC License**.
