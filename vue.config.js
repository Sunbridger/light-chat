const path = require('path');

const resolve = dir => path.join(__dirname, dir);

// const target = 'https://2261295nz5.51mypc.cn/';
const target = 'http://121.40.152.167/';
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
      'assets': resolve('./src/assets') 
    };
  },
};
