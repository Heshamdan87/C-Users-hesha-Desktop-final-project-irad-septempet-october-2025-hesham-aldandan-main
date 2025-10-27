const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

exports.register = async (req, res) => {
  try {
    const userData = req.body;

    const existingUserByEmail = await User.findOne({ email: userData.email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    if (userData.studentId) {
      const existingUserByStudentId = await User.findOne({ studentId: userData.studentId });
      if (existingUserByStudentId) {
        return res.status(400).json({
          success: false,
          message: 'Student ID already exists'
        });
      }
    }

    if (!userData.password) {
      userData.password = userData.studentId ? `${userData.studentId}123` : 'Student123456';
    }

    const user = await User.create({
      ...userData,
      role: 'student'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          studentId: user.studentId,
          major: user.major,
          department: user.department,
          academicYear: user.academicYear
        },
        token
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      const message = field === 'email' ? 'Email already exists' : 
                     field === 'studentId' ? 'Student ID already exists' : 
                     'Duplicate value error';
      return res.status(400).json({
        success: false,
        message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.logout = (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          studentId: user.studentId
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { firstName, lastName },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

exports.forgotPassword = async (req, res) => {
  res.json({
    success: true,
    message: 'Password reset email sent (placeholder)'
  });
};

exports.resetPassword = async (req, res) => {
  res.json({
    success: true,
    message: 'Password reset successfully (placeholder)'
  });
};

exports.verifyEmail = async (req, res) => {
  res.json({
    success: true,
    message: 'Email verified successfully (placeholder)'
  });
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const clientIP = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
        code: 'MISSING_CREDENTIALS'
      });
    }

    const user = await User.findOne({ email }).select('+password +loginAttempts +lockUntil');
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials',
        code: 'INVALID_CREDENTIALS'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: Admin access required',
        code: 'INSUFFICIENT_PRIVILEGES'
      });
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
      const lockTimeRemaining = Math.ceil((user.lockUntil - Date.now()) / 1000 / 60);
      return res.status(423).json({
        success: false,
        message: `Account temporarily locked. Try again in ${lockTimeRemaining} minutes.`,
        code: 'ACCOUNT_LOCKED',
        lockTimeRemaining
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      await user.incLoginAttempts();
      
      const attemptsLeft = 5 - (user.loginAttempts || 0);
      
      return res.status(401).json({
        success: false,
        message: `Invalid credentials. ${attemptsLeft > 0 ? `${attemptsLeft} attempts remaining.` : 'Account will be locked.'}`,
        code: 'INVALID_CREDENTIALS',
        attemptsRemaining: Math.max(0, attemptsLeft)
      });
    }


    if (user.loginAttempts || user.lockUntil) {
      await user.resetLoginAttempts();
    }


    user.lastLogin = new Date();
    user.lastLoginIP = clientIP;
    await user.save();

    const token = generateToken(user._id);


    res.json({
      success: true,
      message: 'Admin login successful',
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          lastLogin: user.lastLogin,
          department: user.department
        },
        token,
        security: {
          sessionExpiry: process.env.JWT_EXPIRE || '30d',
          loginIP: clientIP,
          requiresPasswordChange: user.mustChangePassword || false
        }
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      code: 'SERVER_ERROR'
    });
  }
};


exports.requireAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found.',
        code: 'INVALID_TOKEN'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.',
        code: 'INSUFFICIENT_PRIVILEGES'
      });
    }


    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(423).json({
        success: false,
        message: 'Account temporarily locked.',
        code: 'ACCOUNT_LOCKED'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Admin authentication error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid token.',
      code: 'INVALID_TOKEN'
    });
  }
};



