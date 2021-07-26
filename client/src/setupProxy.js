const { createProxyMiddleware } = require("http-proxy-middleware");
//const express = require('express')


module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://localhost:8080/",
      changeOrigin: true,
    })
  );
};