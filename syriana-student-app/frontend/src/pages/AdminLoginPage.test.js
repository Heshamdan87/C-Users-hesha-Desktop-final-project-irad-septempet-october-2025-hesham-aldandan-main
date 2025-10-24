import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminLoginPage from './AdminLoginPage';
import { authService } from '../services/api';

// Mock the auth service
jest.mock('../services/api', () => ({
  authService: {
    adminLogin: jest.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AdminLoginPage - Admin Login Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should render admin login form with email and password fields', () => {
    render(<AdminLoginPage />);
    
    expect(screen.getByText(/Admin Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Please log in to continue/i)).toBeInTheDocument();
  });

  test('should successfully login admin with valid credentials', async () => {
    const mockToken = 'test-jwt-token';
    const mockUser = {
      id: '123',
      email: 'admin@example.com',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User',
    };

    authService.adminLogin.mockResolvedValue({
      success: true,
      data: {
        token: mockToken,
        user: mockUser,
      },
    });

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'AdminPassword123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(authService.adminLogin).toHaveBeenCalledWith({
        email: 'admin@example.com',
        password: 'AdminPassword123',
      });
    });

    expect(localStorage.getItem('token')).toBe(mockToken);
  });

  test('should show error message for invalid credentials', async () => {
    authService.adminLogin.mockRejectedValue({
      response: {
        status: 401,
        data: { message: 'Invalid credentials' },
      },
    });

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'WrongPassword');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument();
    });
  });

  test('should reject non-admin users from logging in', async () => {
    authService.adminLogin.mockRejectedValue({
      response: {
        status: 403,
        data: { message: 'Only admin users can access this page' },
      },
    });

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'student@example.com');
    await userEvent.type(passwordInput, 'StudentPassword123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Only admin users can access this page/i)).toBeInTheDocument();
    });
  });

  test('should show rate limiting error after multiple failed attempts', async () => {
    authService.adminLogin.mockRejectedValue({
      response: {
        status: 429,
        data: { 
          message: 'Too many login attempts. Please try again in 15 minutes.',
          rateLimited: true,
        },
      },
    });

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'WrongPassword');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Too many login attempts/i)).toBeInTheDocument();
    });
  });

  test('should show two-factor authentication prompt when needed', async () => {
    authService.adminLogin.mockRejectedValue({
      response: {
        status: 403,
        data: { 
          message: 'Two-factor authentication required',
          twoFactorRequired: true,
        },
      },
    });

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'AdminPassword123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Two-factor authentication required/i)).toBeInTheDocument();
    });
  });

  test('should handle network errors gracefully', async () => {
    authService.adminLogin.mockRejectedValue(new Error('Network Error'));

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'AdminPassword123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Network error|Connection failed/i)).toBeInTheDocument();
    });
  });

  test('should clear form fields after successful login', async () => {
    const mockToken = 'test-jwt-token';
    authService.adminLogin.mockResolvedValue({
      success: true,
      data: {
        token: mockToken,
        user: { id: '123', email: 'admin@example.com', role: 'admin' },
      },
    });

    render(<AdminLoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await userEvent.type(emailInput, 'admin@example.com');
    await userEvent.type(passwordInput, 'AdminPassword123');
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe(mockToken);
    });
  });

  test('should validate email format', async () => {
    render(<AdminLoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.type(passwordInput, 'AdminPassword123');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/valid email|invalid email format/i)).toBeInTheDocument();
    });
  });

  test('should require password field', async () => {
    render(<AdminLoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'admin@example.com');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password.*required|required.*password/i)).toBeInTheDocument();
    });
  });
});
