module.exports = {
    //pabulicPath: process.env.NODE_ENV === 'production' ? '' : '',
    devServer: {
        host: '0.0.0.0',
        port: '8080',
        // https:false,
        open: false,
        //以上的ip和端口是我们本机的;下面为需要跨域的 只在开发环境使用node运行时生效
        proxy: { //配置跨域
            '/api': {
                target: 'https://api.mch.weixin.qq.com',
                changeOrigin: true, //允许跨域
                ws: true,
                pathRewrite: {
                    '^/api': '' //请求的时候使用这个api就可以
                }
            }
        }
    }
}