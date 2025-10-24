import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const StudentsPage = () => {
  const { user, logout } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMajor, setFilterMajor] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  const [newStudentData, setNewStudentData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    major: '',
    department: '',
    academicYear: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      // Request the users endpoint (api baseURL already includes /api)
      const response = await api.get('/users', { params: { role: 'student' } });

      if (response.data && Array.isArray(response.data.data)) {
        setStudents(response.data.data);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
  };

  const handleUpdateStudent = async (updatedData) => {
    try {
      const response = await api.put(`/users/${editingStudent._id}`, updatedData);
      // controller returns { success: true, data: student }
      const updated = response.data?.data || response.data?.user || response.data;
      setStudents(students.map(s => s._id === editingStudent._id ? updated : s));
      setEditingStudent(null);
      toast.success('Student updated successfully');
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error('Failed to update student');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await api.delete(`/users/${studentId}`);
        setStudents((students || []).filter(s => s?._id !== studentId));
        toast.success('Student deleted successfully');
      } catch (error) {
        console.error('Error deleting student:', error);
        toast.error('Failed to delete student');
      }
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    
    if (newStudentData.password !== newStudentData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (newStudentData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(newStudentData.password)) {
      toast.error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
      return;
    }

    if (newStudentData.studentId && !/^STU\d{6}$/.test(newStudentData.studentId)) {
      toast.error('Student ID must be in format STU followed by 6 digits (e.g., STU123456)');
      return;
    }

    try {
      const response = await api.post('/auth/register', {
        ...newStudentData,
        role: 'student'
      });

      // controller returns { success: true, data: user }
      const created = response.data?.data || response.data?.user || response.data;
      setStudents([...students, created]);
      setShowAddStudentModal(false);
      setNewStudentData({
        firstName: '',
        lastName: '',
        email: '',
        studentId: '',
        major: '',
        department: '',
        academicYear: '',
        password: '',
        confirmPassword: ''
      });
      toast.success('Student added successfully');
    } catch (error) {
      console.error('Error adding student:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessages = errorData.errors.map(err => err.msg).join(', ');
          toast.error(`Validation Error: ${errorMessages}`);
        } else {
          toast.error(errorData.message || 'Invalid input data');
        }
      } else {
        toast.error(error.response?.data?.message || 'Failed to add student');
      }
    }
  };

  const filteredStudents = (students || []).filter(student => {
    if (!student) {
      return false;
    }
    
    const matchesSearch = student.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMajor = !filterMajor || student.major === filterMajor;
    
    return matchesSearch && matchesMajor;
  });

  const majors = [...new Set((students || []).map(s => s?.major).filter(Boolean))];

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Students Management</h1>
              <p className="text-gray-600">Manage all registered students</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.firstName} {user?.lastName}</span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filterMajor}
              onChange={(e) => setFilterMajor(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Majors</option>
              {majors.map(major => (
                <option key={major} value={major}>{major}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowAddStudentModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add New Student
          </button>
        </div>


        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Major
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {student.firstName} {student.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.major}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {student.academicYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEditStudent(student)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No students found</p>
            </div>
          )}
        </div>
      </div>


      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Student</h2>
            <form onSubmit={handleAddStudent}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={newStudentData.firstName}
                    onChange={(e) => setNewStudentData({...newStudentData, firstName: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={newStudentData.lastName}
                    onChange={(e) => setNewStudentData({...newStudentData, lastName: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={newStudentData.email}
                    onChange={(e) => setNewStudentData({...newStudentData, email: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student ID</label>
                  <input
                    id="studentId"
                    type="text"
                    required
                    placeholder="STU123456 (STU + 6 digits)"
                    value={newStudentData.studentId}
                    onChange={(e) => setNewStudentData({...newStudentData, studentId: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <p className="mt-1 text-xs text-gray-500">Format: STU followed by 6 digits (e.g., STU123456)</p>
                </div>
                <div>
                  <label htmlFor="major" className="block text-sm font-medium text-gray-700">Major</label>
                  <input
                    id="major"
                    type="text"
                    value={newStudentData.major}
                    onChange={(e) => setNewStudentData({...newStudentData, major: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    id="department"
                    type="text"
                    value={newStudentData.department}
                    onChange={(e) => setNewStudentData({...newStudentData, department: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">Academic Year</label>
                  <select
                    id="academicYear"
                    value={newStudentData.academicYear}
                    onChange={(e) => setNewStudentData({...newStudentData, academicYear: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Year</option>
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option value="Senior">Senior</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength="6"
                    placeholder="Minimum 6 characters"
                    value={newStudentData.password}
                    onChange={(e) => setNewStudentData({...newStudentData, password: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <p className="mt-1 text-xs text-gray-500">Must contain at least 6 characters with uppercase, lowercase, and number</p>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={newStudentData.confirmPassword}
                    onChange={(e) => setNewStudentData({...newStudentData, confirmPassword: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold mb-4">Edit Student</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updatedData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                studentId: formData.get('studentId'),
                major: formData.get('major'),
                department: formData.get('department'),
                academicYear: formData.get('academicYear')
              };
              handleUpdateStudent(updatedData);
            }}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="editFirstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    id="editFirstName"
                    name="firstName"
                    type="text"
                    required
                    defaultValue={editingStudent.firstName}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="editLastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    id="editLastName"
                    name="lastName"
                    type="text"
                    required
                    defaultValue={editingStudent.lastName}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    id="editEmail"
                    name="email"
                    type="email"
                    required
                    defaultValue={editingStudent.email}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="editStudentId" className="block text-sm font-medium text-gray-700">Student ID</label>
                  <input
                    id="editStudentId"
                    name="studentId"
                    type="text"
                    required
                    defaultValue={editingStudent.studentId}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="editMajor" className="block text-sm font-medium text-gray-700">Major</label>
                  <input
                    id="editMajor"
                    name="major"
                    type="text"
                    defaultValue={editingStudent.major}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="editDepartment" className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    id="editDepartment"
                    name="department"
                    type="text"
                    defaultValue={editingStudent.department}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="editAcademicYear" className="block text-sm font-medium text-gray-700">Academic Year</label>
                  <select
                    id="editAcademicYear"
                    name="academicYear"
                    defaultValue={editingStudent.academicYear}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select Year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Update Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;