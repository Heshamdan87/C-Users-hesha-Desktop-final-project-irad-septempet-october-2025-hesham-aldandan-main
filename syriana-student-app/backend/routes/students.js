const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const studentsController = require('../controllers/students');

// Get all students (admin only)
router.get('/', auth, studentsController.getAllStudents);

// Get student by ID
router.get('/:id', auth, studentsController.getStudentById);

// Update student
router.put('/:id', auth, studentsController.updateStudent);

// Delete student (admin only)
router.delete('/:id', auth, studentsController.deleteStudent);

module.exports = router;
