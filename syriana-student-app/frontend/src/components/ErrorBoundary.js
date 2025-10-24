import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {

    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {

    console.warn('Error caught by boundary:', error, errorInfo);
    

    if (!error.message.includes('port object') && 
        !error.message.includes('Extension context') &&
        !error.message.includes('runtime.connect')) {
      this.setState({
        error: error,
        errorInfo: errorInfo
      });
    } else {

      console.warn('Browser extension error (safe to ignore):', error.message);
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {

      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Something went wrong
              </h2>
              <div className="mt-6">
                <p className="text-sm text-gray-600">
                  An error occurred in the application. Please refresh the page or contact support if the issue persists.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;