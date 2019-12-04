const path = require('path');

const resolve = dir => path.join(__dirname, dir);
const target = process.env.VUE_APP_API;


/**
 *
 * devServer.proxy 简介
先简单介绍一下 devServer.proxy 的用法：
注： 这里的 devServer.proxy 就是 vue-cli 中位于 /config/index.js 的 dev.proxyTable，后面不再赘述
 *
 *
 */
const publicPath = './';
module.exports = {
  publicPath,
  devServer: {
    proxy: {
      '/api': {
        target,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
    } else {
      config.mode = 'development';
    }
    config.resolve.alias = {
      'component': resolve('./src/components'),
      '@': resolve('./src'),
      'view': resolve('./src/views'),
      'api': resolve('./src/api'),
      'assets': resolve('./src/assets')
    };
  },
};
