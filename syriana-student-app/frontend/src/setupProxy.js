const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // The backend default port in this repo is 3001 (see backend/server.js),
      // update the proxy to point to that port so /api requests from the
      // frontend dev server are forwarded correctly.
      target: process.env.BACKEND_PROXY_TARGET || 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};

