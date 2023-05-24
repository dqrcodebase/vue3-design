const path = require('path');
const CacheLoader = require('cache-loader');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
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
    plugins: [
      new HardSourceWebpackPlugin()
    ],
    resolve: { extensions: ['.ts', '.jsx', '.vue', '.js', '.json'] },
    module: {
      rules: [
        {
          test: /\.(ts|jsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        },
        {
          test: /\.js$/,
          use: [
            {
              loader: 'cache-loader',
              options: {
                cacheDirectory: path.resolve('.cache')
              }
            },
            'babel-loader'
          ]
        }
      ],
    },
  },
};
