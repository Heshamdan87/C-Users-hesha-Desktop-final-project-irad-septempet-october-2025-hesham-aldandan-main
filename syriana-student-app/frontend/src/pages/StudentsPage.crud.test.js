import React from 'react';
import { render, screen, waitFor, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StudentsPage from './StudentsPage';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

// Mocks must be hoisted for imports
jest.mock('../context/AuthContext', () => ({ useAuth: jest.fn() }));
jest.mock('../services/api', () => ({ get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() }));
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: { success: jest.fn(), error: jest.fn() },
  toast: { success: jest.fn(), error: jest.fn() }
}));

// Keep mocks hoisted and imports at top for linting
beforeEach(() => {
  jest.clearAllMocks();
});

test('GET: fetches and displays students', async () => {
  const students = [
    { _id: '1', firstName: 'Alice', lastName: 'Smith', email: 'a@s.com', studentId: 'STU000001', major: 'CS', academicYear: 'Senior' }
  ];
  api.get.mockResolvedValue({ data: { data: students } });
  useAuth.mockReturnValue({ user: { firstName: 'Admin', lastName: 'User' }, logout: jest.fn() });

  render(<StudentsPage />);

  // Wait for the student to appear in the table
  await waitFor(() => expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument());
  expect(screen.getByText(/STU000001/i)).toBeInTheDocument();
});

test('POST: adds a new student when add form is submitted', async () => {
  // initial no students
  api.get.mockResolvedValue({ data: { data: [] } });
  const created = { _id: '2', firstName: 'Bob', lastName: 'Jones', email: 'b@j.com', studentId: 'STU000002', major: 'EE', academicYear: 'Junior' };
  api.post.mockResolvedValue({ data: { data: created } });
  useAuth.mockReturnValue({ user: { firstName: 'Admin', lastName: 'User' }, logout: jest.fn() });

  render(<StudentsPage />);

  // Open add modal (wait for the button to be available)
  const addButton = await screen.findByRole('button', { name: /Add New Student/i });
  await act(async () => {
    await userEvent.click(addButton);
  });

  // Fill form fields (only required ones for our component validation)
  await act(async () => {
    await userEvent.type(screen.getByLabelText(/First Name/i), 'Bob');
    await userEvent.type(screen.getByLabelText(/Last Name/i), 'Jones');
    await userEvent.type(screen.getByLabelText(/Email/i), 'b@j.com');
    await userEvent.type(screen.getByLabelText(/Student ID/i), 'STU000002');
    await userEvent.type(screen.getByLabelText('Password'), 'Aa11111');
    await userEvent.type(screen.getByLabelText(/Confirm Password/i), 'Aa11111');
  });

  // Submit
  await act(async () => {
    await userEvent.click(screen.getByRole('button', { name: /Add Student/i }));
  });

  // Wait for api.post to be called
  await waitFor(() => expect(api.post).toHaveBeenCalled());

  // After success the new student should appear
  await waitFor(() => expect(screen.getByText(/Bob Jones/i)).toBeInTheDocument());
});

test('PUT: updates a student when edit form is submitted', async () => {
  const students = [
    { _id: '3', firstName: 'Carol', lastName: 'White', email: 'c@w.com', studentId: 'STU000003', major: 'ME', academicYear: 'Sophomore' }
  ];
  api.get.mockResolvedValue({ data: { data: students } });
  const updated = { ...students[0], firstName: 'Caroline' };
  api.put.mockResolvedValue({ data: { data: updated } });
  useAuth.mockReturnValue({ user: { firstName: 'Admin', lastName: 'User' }, logout: jest.fn() });

  render(<StudentsPage />);

  // Wait for row
  const row = await screen.findByText(/Carol White/i);
  const tr = row.closest('tr');
  const editButton = within(tr).getByRole('button', { name: /Edit/i });

  await act(async () => {
    await userEvent.click(editButton);
  });

  // Change first name in edit modal (wait for input to appear)
  const firstNameInput = await screen.findByLabelText(/First Name/i);
  await act(async () => {
    await userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, 'Caroline');
  });

  // Submit update; the edit modal's Update Student button
  await act(async () => {
    await userEvent.click(screen.getByRole('button', { name: /Update Student/i }));
  });

  // Wait for api.put called and updated name visible
  await waitFor(() => expect(api.put).toHaveBeenCalledWith(`/users/${students[0]._id}`, expect.any(Object)));
  await waitFor(() => expect(screen.getByText(/Caroline White/i)).toBeInTheDocument());
});

test('DELETE: removes student when delete is confirmed', async () => {
  const students = [
    { _id: '4', firstName: 'Dave', lastName: 'Green', email: 'd@g.com', studentId: 'STU000004', major: 'CS', academicYear: 'Freshman' }
  ];
  api.get.mockResolvedValue({ data: { data: students } });
  api.delete.mockResolvedValue({ data: { success: true } });
  useAuth.mockReturnValue({ user: { firstName: 'Admin', lastName: 'User' }, logout: jest.fn() });

  // Mock confirm to auto-accept
  // Use global object for confirm in Jest
  jest.spyOn(global, 'confirm').mockImplementation(() => true);

  render(<StudentsPage />);

  // Find row and click Delete
  const row = await screen.findByText(/Dave Green/i);
  const tr = row.closest('tr');
  const deleteButton = within(tr).getByRole('button', { name: /Delete/i });

  await act(async () => {
    await userEvent.click(deleteButton);
  });

  await waitFor(() => expect(api.delete).toHaveBeenCalledWith(`/users/${students[0]._id}`));

  // Confirm row removed
  await waitFor(() => expect(screen.queryByText(/Dave Green/i)).not.toBeInTheDocument());
});
