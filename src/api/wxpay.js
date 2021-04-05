import pay from '@/utils/sign'

import request from 'superagent';



// import axios from 'axios'
// import sdk from 'postman-collection'
// import { Notify } from 'vant'
// import { buildMessage, sign, getAuth, replaceVariables } from '@/utils/sign'
// const service = axios.create({
//     baseURL: '/api', // url = base url + request url
//     // withCredentials: true, // send cookies when cross-domain requests
//     timeout: 6000 // request timeout
// })


// service.interceptors.request.use(
//     config => {
//         var method = config.method
//             //var canonicalUrl = config.url;
//         var newUrl = new sdk.Url(replaceVariables(config.url));
//         var canonicalUrl = newUrl.getPathWithQuery();
//         // if (method == 'post' || method == 'put' || method == 'patch') {
//         //     //config.data = JSON.stringify(config.data)
//         //     //var data = JSON.stringify(config.data)
//         //     var data = config.data
//         //     console.log(data)
//         //         //var data = config.data
//         //     if (canonicalUrl.endsWith('upload')) {
//         //         //var result = JSON.parse(JSON.stringify(pm.request.body.formdata));
//         //         var result = JSON.parse(JSON.stringify(config.data));
//         //         for (var i in result) {
//         //             if (result[i].key == 'meta') {
//         //                 data = result[i].value;
//         //             }
//         //         }
//         //     }
//         // }
//         const nonce_str = Math.random().toString(36).substr(2, 15) // 随机字符串
//         const timestamp = parseInt(+new Date() / 1000 + '').toString() // 时间戳 秒

//         console.log(config.data)


//         //获取签名
//         const signature = pay.getSignature(method, nonce_str, timestamp, canonicalUrl, config.data); //如果是get 请求 则不需要params 参数拼接在url上 例如 /v3/pay/transactions/id/12177525012014?mchid=1230000109
//         //获取头部authorization 参数
//         const authorization = pay.getAuthorization(nonce_str, timestamp, signature);


//         // var message = buildMessage(method, canonicalUrl, timeStamp, nonceStr, data)
//         // console.log(message);

//         // var signature = sign(message)

//         // var auth = getAuth(nonceStr, timeStamp, signature)
//         console.log(authorization)

//         config.headers['Authorization'] = authorization
//             //config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
//         config.headers['Content-Type'] = 'application/json'
//         config.headers['Accept'] = 'application/json'
//             //config.headers['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36'

//         return config
//     },
//     error => {
//         // 请求错误处理
//         console.log(error) // for debug
//         return Promise.reject(error)
//     }
// )

// // response interceptor
// service.interceptors.response.use(
//     /**
//      * If you want to get http information such as headers or status
//      * Please return  response => response
//      */

//     /**
//      * Determine the request status by custom code
//      * Here is just an example
//      * You can also judge the status by HTTP Status Code
//      */
//     response => {
//         // 统一处理返回状态
//         const res = response.data
//     },
//     error => {
//         console.log('err' + error) // for debug
//         Notify({
//             message: error.message,
//             type: 'warning',
//             duration: 5 * 1000
//         })
//         return Promise.reject(error)
//     }
// )


// export function weixinPrePay(data) {
//     return service({
//         url: '/v3/pay/transactions/jsapi',
//         method: 'post',
//         data
//     })
// }


export function weixinPrePay(data) {
    const nonce_str = Math.random().toString(36).substr(2, 15), // 随机字符串
        timestamp = parseInt(+new Date() / 1000 + '').toString(), // 时间戳 秒
        url = '/v3/pay/transactions/jsapi';

    const signature = pay.getSignature('POST', nonce_str, timestamp, url, data); //如果是get 请求 则不需要params 参数拼接在url上 例如 /v3/pay/transactions/id/12177525012014?mchid=1230000109

    const authorization = pay.getAuthorization(nonce_str, timestamp, signature);
    const result = request
        .post('/api/v3/pay/transactions/jsapi')
        .send(data)
        .set({
            Accept: 'application/json;charset=utf-8;',
            //Accept: '*/*',
            'Accept-Language': 'zh-CN',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
            Authorization: authorization,
        });
    return result
}