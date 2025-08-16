// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // only paths starting with /api are proxied
    createProxyMiddleware({
      target: 'http://localhost:3000', // backend
      changeOrigin: true,
    })
  );
};
