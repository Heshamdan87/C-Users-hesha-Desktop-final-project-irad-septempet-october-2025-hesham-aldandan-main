import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { adminLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [twoFactorRequired, setTwoFactorRequired] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const handleLogin = useCallback(async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const credentials = {
        email: email.trim(),
        password,
        ...(twoFactorRequired && { twoFactorCode }),
      };

      const result = await adminLogin(credentials);
      
      if (result.success || result.user) {
        setEmail('');
        setPassword('');
        // Navigate to admin dashboard
        navigate('/admin', { replace: true });
      } else if (result.requires2FA) {
        setTwoFactorRequired(true);
        setError('Enter your two-factor authentication code');
      }
    } catch (err) {
      if (err.response?.status === 429) {
        setError(`Too many login attempts. Please try again later.`);
      } else if (err.response?.status === 403) {
        if (err.response?.data?.twoFactorRequired) {
          setTwoFactorRequired(true);
          setError('Enter your two-factor authentication code');
        } else {
          setError('Only admin users can access this page');
        }
      } else if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (!err.response) {
        setError('Network error. Please check your connection.');
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, twoFactorRequired, twoFactorCode, navigate, adminLogin]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
        <p className="text-gray-600 mb-6">Please log in to continue.</p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {!twoFactorRequired ? (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
            </>
          ) : (
            <div>
              <label htmlFor="twoFactorCode" className="block text-sm font-medium text-gray-700 mb-1">
                Two-Factor Authentication Code
              </label>
              <input
                id="twoFactorCode"
                type="text"
                placeholder="000000"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                maxLength="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Logging in...' : twoFactorRequired ? 'Verify' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Need help? <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot your password?</a></p>
        </div>
      </div>
    </div>
  );
}
