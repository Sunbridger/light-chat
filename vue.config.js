const path = require('path');

const resolve = dir => path.join(__dirname, dir);

const target = 'http://192.168.249.100:3000/';
const publicPath = './dist';
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
    // if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
    // } else {
    //   config.mode = 'development';
    // }
    config.resolve.alias = {
      'component': resolve('./src/components'),
      '@': resolve('./src'),
      'view': resolve('./src/views'),
      'api': resolve('./src/api'),
    };
  },
};
