const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  transpileDependencies: true, // Your existing configuration options

  devServer: {
    proxy: {
      "/api": {
        target: "https://webhook.site",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // Remove the '/api' prefix when making the request
        },
      },
    },
  },
};
