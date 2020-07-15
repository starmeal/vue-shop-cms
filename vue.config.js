const path = require('path');
module.exports = {
  publicPath: '/s_merchants_cms',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    port: 9527,
    open: true,
    host: '0.0.0.0',
       overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        changeOrigin: true,
        target: process.env.VUE_BASE_REQUEST_RUL,
        pathRewrite: { ['^' + process.env.VUE_APP_BASE_API]: '' },
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styl/variables.scss";`,
      },
    },
  },
  // 修改打包之后js文件 加上缓存
  configureWebpack: (config) => {
    config.output.filename = `static/js/[name].[hash:8].js`;
    config.output.chunkFilename = `static/js/[name].[hash:8].js`;
    config.resolve.alias = {
      '@': path.resolve('src')
    };
  },
};
