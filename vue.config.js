let path = require('path');

let resolve = dir => path.join(__dirname, dir);

let target = process.env.TARGET;

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.mode = 'production';
        } else {
            config.mode = 'development';
        }
        config.resolve.alias = {
            'component': resolve('./src/components'),
            '@': resolve('./src')
        }
    }
}
