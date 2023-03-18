module.exports = {
  lintOnSave: false,
  devServer: {
    port: 3070,
    proxy: {
      '/tuapi': {
        target: 'http://47.102.46.179:8085',
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
    },
  },
};
