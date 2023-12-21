const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Define your API endpoint
  const apiEndpoint = 'https://storage.googleapis.com/openhouse-ai-fe-coding-test';

  // Set up the proxy middleware
  app.use(
    '/api',
    createProxyMiddleware({
      target: apiEndpoint,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '', // Remove '/api' from the path
      },
    })
  );
};
