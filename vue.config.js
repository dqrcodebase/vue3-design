const path = require('path');

module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3070,
    proxy: {
      '/accountapi': {
        target: 'https://account.iyw.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/accountapi': '/',
        },
      },
      '/tuapi': {
        target: 'https://tuapi.chdesign.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/tuapi': '/',
        },
      },
      '/tuOd': {
        target: 'http://t-gateway-external.iywtu.cn',
        changeOrigin: true,
        pathRewrite: {
          '^/tuOd': '/',
        },
      },
      '/worksapi': {
        target: 'https://dapi.chdesign.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/worksapi': '/',
        },
      },
      '/gatewayapi': {
        target: 'https://gateway.iyw.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/gatewayapi': '/',
        },
      },
    },
  },
  configureWebpack: {
    resolve: { extensions: ['.ts', '.vue', '.js', '.json'] },
    module: {
      rules: [
        {
          test: /\.(ts|vue)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        },
        
      ],
    },
  },
};
