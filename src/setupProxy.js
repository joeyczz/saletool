const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(proxy("/api", {
    "target": "https://api-test.orderhandler.com/",
    "changeOrigin": true,
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    }
  }));
  app.use(proxy("/digger-api", {
    "target": "https://digger.orderhandler.com/",
    "changeOrigin": true,
    "secure": false,
    "pathRewrite": {
      "^/digger-api": ""
    }
  }));
};