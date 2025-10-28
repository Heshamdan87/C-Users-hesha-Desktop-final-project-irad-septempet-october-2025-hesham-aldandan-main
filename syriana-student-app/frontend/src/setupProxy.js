const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
  // The backend default port in this repo is 5000 (see backend/.env),
  // update the proxy to point to that port so /api requests from the
  // frontend dev server are forwarded correctly. You can override
  // with BACKEND_PROXY_TARGET if needed (e.g., when running multiple
  // backend instances or Docker compose).
  target: process.env.BACKEND_PROXY_TARGET || 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};

