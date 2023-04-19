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
    resolve: { extensions: ['.ts', '.tsx', '.js', '.json'] },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
      ],
    },
  },
};
