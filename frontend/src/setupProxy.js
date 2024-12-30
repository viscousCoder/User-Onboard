// // src/setupProxy.js
// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     // "/api", // Match requests that start with '/api'
//     createProxyMiddleware({
//       target: "http://localhost:8000", // Backend API server URL
//       changeOrigin: true, // Modify the origin header to match the target
//       pathRewrite: {
//         "^/api": "", // Remove '/api' from the request path before forwarding
//       },
//       secure: false, // Disable SSL verification during development (set true in production)
//     })
//   );
// };
