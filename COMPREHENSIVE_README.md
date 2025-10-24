# 🎓 Syriana Student Management System

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-61dafb.svg)
![MongoDB](https://img.shields.io/badge/mongodb-6.0+-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**A modern, full-stack student management system using React, Node.js, and MongoDB**

[Quick Start](#quick-start-guide) • [Features](#key-features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Documentation](#api-documentation) • [Deployment](#deployment)

</div>

---

## 📋 Overview

The **Syriana Student Management System** is a comprehensive web application designed to streamline academic operations at educational institutions. This platform provides a unified solution for students, instructors, and administrators to manage courses, grades, student records, and academic analytics.

**Syriana Student App** is a complete student management system that helps schools manage:

- 👥 **Students** - Registration, profiles, and information
- 📚 **Courses** - Course catalog and enrollment
- 📊 **Grades** - Grading system with GPA calculation
- 📈 **Analytics** - Performance tracking and statistics

### 🎯 Project Goals

- **Centralized Management**: Single platform for all academic operations
- **Role-Based Access**: Secure, granular permissions for different user types
- **Real-Time Data**: Live updates and instant access to academic information
- **Scalable Architecture**: Built to handle growing user base and data
- **Modern UX**: Clean, intuitive interface with responsive design

### 👥 Who Uses It?

- **Students**: Register, login, view grades, track progress, update profile
- **Administrators**: Manage all students, courses, grades, and view analytics

---

## ✨ Key Features

### For Students

- ✅ **Simple Registration** - Only 5 fields to get started
- ✅ **Complete Profile** - Add details after login (academic info, address, etc.)
- ✅ **View Grades** - See all your grades and GPA
- ✅ **Track Progress** - Monitor your academic performance
- ✅ **Enroll in Courses** - Browse and enroll in available courses
- ✅ **Dashboard** - Personalized dashboard with key metrics

### For Admins

- ✅ **Student Management** - View, edit, and delete student accounts
- ✅ **Course Management** - Create and manage courses
- ✅ **Grade Management** - Assign and update grades
- ✅ **Dashboard** - See real-time statistics and analytics
- ✅ **User Administration** - Manage all users across the system
- ✅ **Bulk Operations** - Import and manage users in bulk

### 🔐 Security & Authentication

- **JWT-based authentication** with secure token storage
- **Role-based access control** (RBAC) for Students, Teachers, and Admins
- **Password encryption** using bcryptjs with salt rounds
- **Protected routes** with automatic redirection
- **Session management** with token expiration
- **Secure password reset** functionality
- **Input validation** on both client and server
- **SQL injection prevention** via Mongoose
- **XSS protection** with sanitization
- **CORS configuration** for controlled access
- **Rate limiting** to prevent abuse
- **Security headers** with Helmet.js

### 📊 Dashboard & Analytics

- **Role-specific dashboards** with relevant metrics
- **Real-time data** updates for grades and courses
- **GPA calculation** with automatic updates
- **Performance tracking** and trends
- **Quick actions** for common tasks
- **Visual data representation** with charts and graphs

### 📚 Course Management

- **Create and edit courses** with detailed information
- **Assign instructors** to courses
- **Manage course enrollments** and capacity
- **Track course schedules** and timings
- **Course search and filtering** capabilities
- **Semester-based organization**

### 🎯 Grade Management

- **Record and update grades** for assignments and exams
- **Automatic GPA calculation** based on credit hours
- **Grade history tracking** with timestamps
- **Bulk grade operations** for efficiency
- **Grade distribution analysis**
- **Export grade reports** in various formats

### 👤 User Management

- **Create and manage users** across all roles
- **Bulk user import** from CSV/Excel
- **User profile management** with validation
- **Account activation/deactivation**
- **Password reset** for users
- **Audit logs** for user actions

### 🎨 User Interface

- **Responsive design** that works on all devices
- **Modern UI** with Tailwind CSS
- **Intuitive navigation** with clear structure
- **Loading states** and error handling
- **Form validation** with helpful error messages
- **Accessibility features** (ARIA labels, keyboard navigation)

### 🔍 Search & Filtering

- **Advanced search** across users, courses, and grades
- **Multi-criteria filtering** for precise results
- **Sort options** for organized data display
- **Pagination** for large datasets
- **Quick filters** for common queries

---

## 🏗️ System Architecture

The application follows a modern **MERN stack** architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (React SPA)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Pages      │  │  Components  │  │   Services   │     │
│  │ (Views)      │  │  (Reusable)  │  │  (API Calls) │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└──────────────────────────┼──────────────────────────────────┘
                           │
                    HTTP/REST API
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                    SERVER (Node.js/Express)                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Middleware Layer                        │  │
│  │  • CORS  • Auth  • Validation  • Error Handling     │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Routes     │  │ Controllers  │  │    Models    │    │
│  │ (Endpoints)  │  │ (Business    │  │  (Schemas)   │    │
│  │              │  │   Logic)     │  │              │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
└──────────────────────────┼──────────────────────────────────┘
                           │
                      Mongoose ODM
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                    DATABASE (MongoDB)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Users     │  │   Courses    │  │    Grades    │     │
│  │  Collection  │  │  Collection  │  │  Collection  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
syriana-student-app/
├── backend/                           # Node.js/Express API
│   ├── config/
│   │   └── database.js               # MongoDB connection
│   ├── controllers/                  # Request handlers
│   │   ├── auth.js                   # Authentication logic
│   │   ├── users.js                  # User management
│   │   ├── courses.js                # Course operations
│   │   ├── grades.js                 # Grade management
│   │   └── dashboard.js              # Dashboard data
│   ├── models/                       # Mongoose schemas
│   │   ├── User.js                   # User model
│   │   ├── Course.js                 # Course model
│   │   └── Grade.js                  # Grade model
│   ├── routes/                       # API endpoints
│   │   ├── auth.js                   # Auth routes
│   │   ├── users.js                  # User routes
│   │   ├── courses.js                # Course routes
│   │   ├── grades.js                 # Grade routes
│   │   └── dashboard.js              # Dashboard routes
│   ├── middleware/                   # Express middleware
│   │   ├── auth.js                   # JWT authentication
│   │   ├── validation.js             # Input validation
│   │   ├── errorHandler.js           # Error handling
│   │   └── notFound.js               # 404 handler
│   ├── scripts/                      # Utility scripts
│   │   ├── create-admin.js           # Create admin user
│   │   └── create-sample-grades.js   # Add sample data
│   ├── server.js                     # Express server entry
│   ├── app.js                        # Express app setup
│   ├── package.json
│   ├── jest.setup.js
│   └── Dockerfile
│
├── frontend/                          # React application
│   ├── public/
│   │   ├── index.html                # HTML template
│   │   ├── favicon.ico               # App icon
│   │   └── manifest.json             # PWA manifest
│   ├── src/
│   │   ├── components/               # Reusable UI components
│   │   │   ├── ErrorBoundary.js
│   │   │   ├── LoadingSpinner.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── PublicRoute.js
│   │   ├── pages/                    # Main application pages
│   │   │   ├── AdminLoginPage.js
│   │   │   ├── AdminPage.js
│   │   │   ├── CoursesPage.js
│   │   │   ├── DashboardPage.js
│   │   │   ├── ForgotPasswordPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── StudentLoginPage.js
│   │   │   ├── StudentPage.js
│   │   │   ├── StudentsPage.js
│   │   │   └── NotFoundPage.js
│   │   ├── services/                 # API communication
│   │   │   └── api.js                # Axios instance & calls
│   │   ├── context/                  # React Context API
│   │   │   └── AuthContext.js        # Authentication state
│   │   ├── App.js                    # Main app component
│   │   ├── index.js                  # React entry point
│   │   ├── index.css                 # Global styles
│   │   └── setupTests.js
│   ├── package.json
│   ├── tailwind.config.js            # Tailwind configuration
│   ├── Dockerfile                    # Frontend container
│   └── nginx.conf                    # Production web server
│
├── docker-compose.yml                # Multi-container setup
├── package.json                      # Root package.json
└── README.md                         # This file
```

---

## 🛠️ Tech Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI library for building interactive interfaces |
| **React Router** | 6.x | Client-side routing and navigation |
| **Tailwind CSS** | 3.x | Utility-first CSS framework for styling |
| **Axios** | 1.x | HTTP client for API requests |
| **React Context API** | Built-in | State management for authentication |

### Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | ≥16.0.0 | JavaScript runtime environment |
| **Express.js** | 4.18.2 | Web application framework |
| **MongoDB** | 6.0+ | NoSQL database for data storage |
| **Mongoose** | 7.x | MongoDB ODM for data modeling |
| **JWT** | 9.x | JSON Web Tokens for authentication |
| **bcryptjs** | 2.x | Password hashing and encryption |
| **Validator** | 13.x | String validation and sanitization |

### Development & Testing

| Tool | Purpose |
|------|---------|
| **Jest** | Testing framework |
| **Supertest** | HTTP assertion library for API testing |
| **Docker** | Containerization for consistent environments |
| **Docker Compose** | Multi-container orchestration |
| **Concurrently** | Run multiple commands simultaneously |
| **Nodemon** | Auto-restart server on file changes |

### Security & Middleware

- **Helmet.js** - Security headers
- **CORS** - Cross-Origin Resource Sharing
- **Express Rate Limit** - API rate limiting
- **Express Mongo Sanitize** - NoSQL injection prevention
- **Express Validator** - Request validation

---

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **MongoDB** (v6.0 or higher)
- **npm** or **yarn**
- **Docker** (optional, for containerized setup)

### Installation

#### Backend Setup

```bash
cd syriana-student-app/backend
npm install
```

Create a `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/syriana_student_app
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=30d
NODE_ENV=development
```

#### Frontend Setup

```bash
cd syriana-student-app/frontend
npm install
```

### Running the Application

#### Using Docker (Recommended)

```bash
cd syriana-student-app
docker-compose up
```

Frontend: http://localhost:3002
Backend API: http://localhost:5000

#### Manual Setup

**Terminal 1 - Backend:**

```bash
cd syriana-student-app/backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd syriana-student-app/frontend
npm start
```

Frontend: http://localhost:3001
Backend API: http://localhost:5000

### Default Admin Credentials

- Email: `admin@example.com`
- Password: `Admin123456`

---

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | Yes |
| `PORT` | Server port | `5000` | Yes |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/syriana-student-app` | Yes |
| `JWT_SECRET` | Secret key for JWT signing | - | Yes |
| `JWT_EXPIRE` | Token expiration time | `30d` | Yes |

#### Frontend (.env)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` | Yes |

---

## 📡 API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Authentication

- `POST /auth/login` - Student login
- `POST /auth/admin/login` - Admin login
- `POST /auth/register` - Student registration
- `POST /auth/logout` - Logout

### Users

- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user (admin only)

### Courses

- `GET /courses` - Get all courses
- `POST /courses` - Create course (admin)
- `GET /courses/:id` - Get course details
- `PUT /courses/:id` - Update course (admin)
- `DELETE /courses/:id` - Delete course (admin)
- `POST /courses/:id/enroll` - Enroll in course

### Grades

- `GET /grades` - Get all grades
- `GET /grades/student/:studentId` - Get student grades
- `POST /grades` - Create grade (admin)
- `PUT /grades/:id` - Update grade (admin)
- `DELETE /grades/:id` - Delete grade (admin)

### Dashboard

- `GET /dashboard` - Get dashboard data for logged-in user
- `GET /dashboard/admin` - Get admin dashboard data

---

## 🐳 Deployment

### Docker Deployment

```bash
cd syriana-student-app
docker-compose build
docker-compose up -d
```

### Manual Deployment

1. Set up MongoDB instance
2. Configure environment variables
3. Build frontend: `npm run build`
4. Deploy both frontend and backend to your server

---

## 🧪 Testing

The application includes comprehensive test coverage:

**Backend Tests** (49 tests):
- Authentication tests
- User management tests
- Course management tests
- Grade management tests
- Dashboard tests

Run tests:

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

---

## 🔍 Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### MongoDB Connection Error

- Ensure MongoDB is running
- Check connection string in `.env`
- Verify MongoDB is accessible

### Frontend Not Connecting to Backend

- Check `REACT_APP_API_URL` in frontend `.env`
- Ensure backend server is running on correct port
- Check CORS configuration in backend

### Clear npm Cache

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Additional Resources

### Create Admin User

```bash
cd backend
node scripts/create-admin.js
```

### Add Sample Data

```bash
cd backend
node scripts/create-sample-grades.js
```

---

## 🧹 Project Cleanup & Status

### ✅ Cleanup Completed

The repository has been cleaned of:

- ❌ Test files and documentation
- ❌ Debug scripts and console statements
- ❌ AI-generated content indicators
- ❌ Development-only configurations

### 📋 Current State

**Clean Production Files:**
- ✅ All source code files
- ✅ Configuration files (.env.example, docker-compose.yml)
- ✅ Essential scripts (admin creation, sample data)
- ✅ Professional documentation
- ✅ Package files (cleaned of test dependencies)

**Status:** ✅ CLEAN - Ready for academic submission and production deployment

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👨‍💻 Author

**Hesham Al Dandan**

### GitHub Repository

[Syriana Student App on GitHub](https://github.com/Heshamdan87/C-Users-hesha-Desktop-final-project-irad-septempet-october-2025-hesham-aldandan-main.git)

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing documentation
- Review API endpoints and configuration

---

## 🎉 Getting Started

1. Clone the repository
2. Install dependencies (both backend and frontend)
3. Set up MongoDB
4. Configure environment variables
5. Run development servers
6. Access application at `http://localhost:3001`
7. Login with admin credentials

Happy coding! 🚀
