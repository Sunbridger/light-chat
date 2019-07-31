
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
    }
}
