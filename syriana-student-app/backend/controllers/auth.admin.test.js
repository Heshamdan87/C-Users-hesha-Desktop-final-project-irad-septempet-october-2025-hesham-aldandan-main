const authController = require('./auth');

jest.mock('../models/User', () => ({
  findOne: jest.fn()
}));

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

describe('adminLogin (controller)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns success and token for valid admin credentials', async () => {
    const mockUser = {
      _id: '507f1f77bcf86cd799439011',
      firstName: 'System',
      lastName: 'Administrator',
      email: 'admin@syriana.edu',
      role: 'admin',
      password: 'hashedpassword',
      loginAttempts: 0,
      lockUntil: null,
      incLoginAttempts: jest.fn().mockResolvedValue(true),
      resetLoginAttempts: jest.fn().mockResolvedValue(true),
      save: jest.fn().mockResolvedValue(true)
    };

    // Mock chainable findOne(...).select(...) to resolve to our mockUser
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(mockUser) });

    // Mock bcrypt and jwt
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    jest.spyOn(jwt, 'sign').mockReturnValue('fake-jwt-token');

    const req = {
      body: { email: 'admin@syriana.edu', password: 'admin123' },
      ip: '127.0.0.1',
      connection: { remoteAddress: '127.0.0.1' },
      get: jest.fn().mockReturnValue('test-agent')
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await authController.adminLogin(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'admin@syriana.edu' });
    expect(bcrypt.compare).toHaveBeenCalledWith('admin123', mockUser.password);
    expect(jwt.sign).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();

    const responseArg = res.json.mock.calls[0][0];
    expect(responseArg.success).toBe(true);
    expect(responseArg.data).toBeDefined();
    expect(responseArg.data.token).toBe('fake-jwt-token');
    expect(responseArg.data.user.email).toBe(mockUser.email);
  });
});
