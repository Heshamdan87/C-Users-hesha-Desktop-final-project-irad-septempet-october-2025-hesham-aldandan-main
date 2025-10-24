# 🎓 Syriana Student App

> A modern, user-friendly student management system for educational institutions

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)]()

## 📖 Table of Contents

- [What is this?](#what-is-this)
- [Key Features](#key-features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 What is this?

**Syriana Student App** is a complete student management system that helps schools manage:

- 👥 **Students** - Registration, profiles, and information
- 📚 **Courses** - Course catalog and enrollment
- 📊 **Grades** - Grading system with GPA calculation
- 📈 **Analytics** - Performance tracking and statistics

### Who uses it?

- **Students**: Register, login, view grades, update their profile
- **Administrators**: Manage all students, courses, grades, and view analytics

---

## ✨ Key Features

### For Students
- ✅ **Simple Registration** - Only 5 fields to get started
- ✅ **Complete Profile** - Add details after login (academic info, address, etc.)
- ✅ **View Grades** - See all your grades and GPA
- ✅ **Track Progress** - Monitor your academic performance

### For Admins
- ✅ **Student Management** - View, edit, and delete student accounts
- ✅ **Course Management** - Create and manage courses
- ✅ **Grade Management** - Assign and update grades
- ✅ **Dashboard** - See real-time statistics and analytics

### Security & Performance
- 🔒 **Secure Authentication** - JWT tokens with bcrypt password hashing
- 🛡️ **Protected Routes** - Role-based access control
- ⚡ **Fast & Responsive** - Optimized for performance

---

---

## 🚀 Quick Start

### Prerequisites

Before you begin, make sure you have installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)

### Installation & Setup

**1. Clone the repository**
```bash
git clone https://github.com/Heshamdan87/final-project-irad-septempet-october-2025-hesham-aldandan.git
cd final-project-irad-septempet-october-2025-hesham-aldandan
```

**2. Setup Backend**
```bash
# Navigate to backend folder
cd syriana-student-app/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings
# (MongoDB connection string, JWT secret, etc.)

# Start the server
npm start
```

You should see: `🚀 Server running on port 5000`

**3. Setup Frontend (in a new terminal)**
```bash
# Navigate to frontend folder
cd syriana-student-app/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

Your browser will open to `http://localhost:3000`

**4. Test Accounts**

Try logging in with these pre-configured accounts:

**Admin Account:**
- Email: `admin@example.com`
- Password: `admin123`

**Student Account:**
- Email: `student@example.com`
- Password: `student123`

---

## 📁 Project Structure

```
syriana-student-app/
│
├── backend/                    # Server-side application
│   ├── config/                # Configuration files
│   │   └── database.js       # MongoDB connection setup
│   │
│   ├── controllers/           # Business logic handlers
│   │   ├── auth.js           # Authentication (login, register)
│   │   ├── users.js          # User management
│   │   ├── courses.js        # Course management
│   │   ├── grades.js         # Grade management
│   │   └── dashboard.js      # Analytics & statistics
│   │
│   ├── models/                # Database schemas
│   │   ├── User.js           # User data structure
│   │   ├── Course.js         # Course data structure
│   │   └── Grade.js          # Grade data structure
│   │
│   ├── routes/                # API endpoints
│   │   ├── auth.js           # /api/auth routes
│   │   ├── users.js          # /api/users routes
│   │   ├── courses.js        # /api/courses routes
│   │   ├── grades.js         # /api/grades routes
│   │   └── dashboard.js      # /api/dashboard routes
│   │
│   ├── middleware/            # Express middleware
│   │   ├── auth.js           # JWT authentication
│   │   ├── errorHandler.js   # Error handling
│   │   └── validation.js     # Input validation
│   │
│   ├── __tests__/             # Automated tests
│   ├── server.js              # Main server file (START HERE!)
│   └── package.json           # Dependencies & scripts
│
├── frontend/                   # Client-side application
│   ├── public/                # Static files
│   └── src/
│       ├── components/        # Reusable UI components
│       │   ├── LoadingSpinner.js
│       │   ├── ProtectedRoute.js
│       │   └── PublicRoute.js
│       │
│       ├── pages/             # Main application screens
│       │   ├── RegisterPage.js      # Student registration
│       │   ├── LoginPage.js         # Login screen
│       │   ├── ProfilePage.js       # Student profile
│       │   ├── AdminPage.js         # Admin dashboard
│       │   ├── StudentsPage.js      # Manage students
│       │   ├── CoursesPage.js       # Manage courses
│       │   └── GradesPage.js        # Manage grades
│       │
│       ├── services/          # API communication
│       │   └── api.js         # HTTP requests to backend
│       │
│       ├── context/           # Global state management
│       │   └── AuthContext.js # User authentication state
│       │
│       ├── App.js             # Main app component (START HERE!)
│       └── index.js           # App entry point
│
└── README.md                   # This file
```

---

## 🛠️ Technologies Used

### Backend Stack
| Technology | Purpose | Why We Use It |
|-----------|---------|---------------|
| **Node.js** | Runtime environment | JavaScript on the server |
| **Express.js** | Web framework | Simple and flexible API building |
| **MongoDB** | Database | Flexible document storage |
| **Mongoose** | ODM | Easy database modeling |
| **JWT** | Authentication | Secure token-based auth |
| **bcryptjs** | Password hashing | Protect user passwords |
| **Jest** | Testing framework | Automated testing |

### Frontend Stack
| Technology | Purpose | Why We Use It |
|-----------|---------|---------------|
| **React** | UI library | Component-based, reactive |
| **React Router** | Routing | Navigate between pages |
| **Tailwind CSS** | Styling | Utility-first, responsive |
| **Axios** | HTTP client | API communication |
| **React Hot Toast** | Notifications | User feedback |

### Security & Tools
| Technology | Purpose |
|-----------|---------|
| **Helmet** | Security headers |
| **CORS** | Cross-origin requests |
| **Rate Limiting** | Prevent spam |
| **Mongo Sanitize** | Prevent injection |
| **XSS Clean** | Prevent script attacks |

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new student | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/me` | Get current user | Yes |
| POST | `/auth/logout` | Logout user | Yes |

### User Endpoints

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| GET | `/users` | Get all users | Yes | Yes |
| GET | `/users/students` | Get all students | Yes | No |
| GET | `/users/:id` | Get specific user | Yes | No |
| POST | `/users` | Create new user | Yes | Yes |
| PUT | `/users/:id` | Update user | Yes | No |
| DELETE | `/users/:id` | Delete user | Yes | Yes |

### Course Endpoints

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| GET | `/courses` | Get all courses | Yes | No |
| GET | `/courses/:id` | Get specific course | Yes | No |
| POST | `/courses` | Create course | Yes | Yes |
| PUT | `/courses/:id` | Update course | Yes | Yes |
| DELETE | `/courses/:id` | Delete course | Yes | Yes |

### Grade Endpoints

| Method | Endpoint | Description | Auth Required | Admin Only |
|--------|----------|-------------|---------------|------------|
| GET | `/grades` | Get all grades | Yes | No |
| GET | `/grades/:id` | Get specific grade | Yes | No |
| POST | `/grades` | Create grade | Yes | Yes |
| PUT | `/grades/:id` | Update grade | Yes | Yes |
| DELETE | `/grades/:id` | Delete grade | Yes | Yes |

### Dashboard Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/dashboard` | Get dashboard data | Yes |
| GET | `/dashboard/students/count` | Get student count | Yes |
| GET | `/dashboard/grades/statistics` | Get grade stats | Yes |

**📝 For detailed API testing**, see `API_TESTING_GUIDE.md` or use `backend/api-tests.http` with REST Client extension.

---

## 🎨 Key Simplifications

This project emphasizes simplicity and usability:

### 1. **Simplified Registration** ✅
- **Before**: 15+ fields required
- **After**: Only 5 fields (firstName, lastName, email, password, confirmPassword)
- **Benefit**: Students can register in 30 seconds

### 2. **Progressive Profile Completion** ✅
- **Concept**: Fill in details when you need them
- **Implementation**: Profile page with 3 organized sections
- **Benefit**: No overwhelming forms

### 3. **Admin-Friendly Management** ✅
- **Features**: 
  - Click-to-edit modals
  - Confirmation dialogs
  - Clear visual feedback
- **Benefit**: Manage students in seconds

### 4. **Clean Code** ✅
- **Comments**: Every function explained
- **Structure**: Logical file organization
- **Naming**: Clear, descriptive variable names
- **Benefit**: Easy to understand and modify

---

## 📚 Additional Documentation

- **📘 PROJECT_GUIDE.md** - Beginner-friendly guide with simple explanations
- **📗 API_TESTING_GUIDE.md** - Complete API testing instructions
- **📙 TESTING_SUMMARY.md** - Quick testing reference

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Hesham Al Dandan**
- Project: IRAD Academy Final Project
- Date: September-October 2025
- GitHub: [@Heshamdan87](https://github.com/Heshamdan87)

---

## 🙏 Acknowledgments

- IRAD Academy for the learning opportunity
- The open-source community for amazing tools
- Everyone who contributes to making education technology better

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [PROJECT_GUIDE.md](PROJECT_GUIDE.md) for common solutions
2. Review the error messages (they usually point to the solution)
3. Check if all dependencies are installed correctly
4. Ensure MongoDB is running

---

**Made with ❤️ for better education management**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Heshamdan87/final-project-irad-septempet-october-2025-hesham-aldandan.git
   cd final-project-irad-septempet-october-2025-hesham-aldandan
   ```

2. **Install backend dependencies**

   ```bash
   cd syriana-student-app/backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

### Database Setup

1. **Start MongoDB service**

   ```bash
   # On Windows (run as Administrator)
   net start MongoDB

   # On macOS
   brew services start mongodb/brew/mongodb-community

   # On Linux
   sudo systemctl start mongod
   ```

2. **Initialize the database** (optional - creates sample data)

   ```bash
   cd syriana-student-app/backend
   npm run init-db
   ```

### Running the Application

1. **Start the backend server**

   ```bash
   cd syriana-student-app/backend
   npm start
   ```

   The backend will run on `http://localhost:5000`

2. **Start the frontend development server**

   ```bash
   cd syriana-student-app/frontend
   npm start
   ```

   The frontend will run on `http://localhost:3000`

3. **Alternative: Run both services concurrently**

   ```bash
   cd syriana-student-app
   npm run dev
   ```

### Testing

- **Run backend tests**

  ```bash
  cd syriana-student-app/backend
  npm test
  ```

- **Run frontend tests**

  ```bash
  cd syriana-student-app/frontend
  npm test
  ```

### Default Credentials

After running the initialization script, you can login with:

- **Admin Account**:
  - Email: `admin@syriana.edu`
  - Password: `admin123`

- **Student Account**:
  - Email: `student@syriana.edu`
  - Password: `student123`

## Project Structure

```text
syriana-student-app/
├── backend/                    # Express.js server
│   ├── config/                # Database configuration
│   ├── controllers/           # Route handlers
│   ├── middleware/            # Custom middleware
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API routes
│   ├── scripts/               # Database scripts
│   ├── utils/                 # Utility functions
│   └── __tests__/             # Backend tests
├── frontend/                  # React application
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── context/           # React context
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   └── __tests__/         # Frontend tests
│   └── build/                 # Production build
├── docker-compose.yml         # Docker configuration
└── README.md                  # Project documentation
```

## API Documentation

The backend provides a RESTful API with the following main endpoints:

- `POST /api/auth/login` - User authentication
- `POST /api/auth/register` - User registration
- `GET /api/users` - Get all users (Admin only)
- `GET /api/courses` - Get courses
- `GET /api/grades` - Get grades
- `GET /api/dashboard` - Get dashboard data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- IRAD Academy for the comprehensive training program
- React and Node.js communities for excellent documentation
- MongoDB for the powerful database solution
- All contributors and mentors who provided guidance throughout the development process
 
 
