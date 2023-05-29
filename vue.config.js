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
    resolve: {
      extensions: ['.ts', '.jsx', '.vue', '.js', '.json'],      
      // 配置别名
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@components': path.resolve(__dirname, './src/components'),
        '@views': path.resolve(__dirname, './src/views'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@api': path.resolve(__dirname, './src/api'),
        '@store': path.resolve(__dirname, './src/store'),
        '@router': path.resolve(__dirname, './src/router'),
        '@styles': path.resolve(__dirname, './src/assets/styles'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(ts|jsx)?$/,
          exclude: /node_modules/,
          use: [
            // "thread-loader",
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/],
                happyPackMode: true
              },
            }
          ],
        },
      ],
    }
  },
};
