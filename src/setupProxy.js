const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/kyc", {
      target: "https://dev.growsari.com/kyc", // API endpoint 1
      // target: "https://kyc.growsari.com",
      changeOrigin: true,
      pathRewrite: {
        "^/kyc": "",
      },
      headers: {
        Connection: "keep-alive",
      },
    })
  );
};
