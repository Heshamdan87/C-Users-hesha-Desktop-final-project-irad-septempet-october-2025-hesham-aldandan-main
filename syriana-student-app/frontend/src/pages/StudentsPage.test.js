import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import StudentsPage from './StudentsPage';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Jest will hoist these mocks; keep imports at top for linting
jest.mock('../context/AuthContext', () => ({ useAuth: jest.fn() }));
jest.mock('../services/api', () => ({ get: jest.fn() }));

test('renders StudentsPage heading and welcome message', async () => {
  // Arrange: mock api.get to return empty student list
  api.get.mockResolvedValue({ data: { data: [] } });
  useAuth.mockReturnValue({ user: { firstName: 'Test', lastName: 'User' }, logout: jest.fn() });

  // Act
  render(<StudentsPage />);

  // Assert: heading appears and welcome text shows user's name
  await waitFor(() => expect(screen.getByText(/Students Management/i)).toBeInTheDocument());
  expect(screen.getByText(/Welcome, Test User/i)).toBeInTheDocument();
});
