# Syriana Student Management System

## Quick Start Guide

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Docker (optional)

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

Frontend will be available at: `http://localhost:3002`
Backend API: `http://localhost:5000`

### Default Admin Credentials
- Email: `admin@example.com`
- Password: `Admin123456`

### Features

✅ **Admin Features**
- Admin login with 2FA support
- Student management (CRUD)
- View and manage all students
- Edit student details
- Rate limiting protection

✅ **Student Features**
- Student login with email/password
- View dashboard
- Enroll in courses
- View grades
- Update profile

✅ **Technical Features**
- JWT Authentication
- MongoDB database
- Express.js backend
- React frontend with Tailwind CSS
- Rate limiting
- Error handling
- CORS support
- Docker support

### Project Structure

```
syriana-student-app/
├── backend/                 # Node.js/Express API
│   ├── controllers/         # Request handlers
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API routes
│   ├── middleware/          # Auth, validation, etc.
│   └── scripts/             # Setup scripts
│
├── frontend/                # React application
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── components/      # Reusable components
│   │   ├── context/         # Auth context
│   │   ├── services/        # API services
│   │   └── App.js           # Main component
│   └── public/              # Static files
│
└── docker-compose.yml       # Docker configuration
```

### API Endpoints

#### Authentication
- `POST /api/auth/login` - Student login
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/register` - Student registration
- `POST /api/auth/logout` - Logout

#### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

#### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (admin)
- `GET /api/courses/:id` - Get course details
- `PUT /api/courses/:id` - Update course (admin)
- `DELETE /api/courses/:id` - Delete course (admin)
- `POST /api/courses/:id/enroll` - Enroll in course

#### Grades
- `GET /api/grades` - Get all grades
- `GET /api/grades/student/:studentId` - Get student grades
- `POST /api/grades` - Create grade (admin)
- `PUT /api/grades/:id` - Update grade (admin)

### Testing

Run tests:
```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

### Deployment

#### Docker Deployment
```bash
cd syriana-student-app
docker-compose build
docker-compose up -d
```

#### Manual Deployment
1. Set up MongoDB instance
2. Configure environment variables
3. Build frontend: `npm run build`
4. Deploy both frontend and backend to your server

### Troubleshooting

**Port already in use:**
```bash
# Kill process on port 3000/3002
# Windows: taskkill /PID <PID> /F
# Mac/Linux: kill -9 <PID>
```

**MongoDB connection error:**
- Ensure MongoDB is running
- Check connection string in `.env`

**Git/GitHub issues:**
- Use VS Code's Source Control (Ctrl+Shift+G)
- Create Personal Access Token at https://github.com/settings/tokens

### Technologies Used

- **Frontend:** React 18, Tailwind CSS, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Authentication:** JWT, bcryptjs
- **Security:** Rate limiting, input validation, CORS
- **DevOps:** Docker, Docker Compose

### License

MIT License - See LICENSE file for details

### Author

Hesham Al Dandan

### Support

For issues or questions, please open an issue on GitHub or contact the maintainer.

---

**Repository:** https://github.com/Heshamdan87/syriana-student-app
