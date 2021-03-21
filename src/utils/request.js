import axios from 'axios'
import { Notify } from 'vant'
//import { MessageBox, Message } from 'element-ui'
//import store from '@/store'
//import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request 拦截器
service.interceptors.request.use(
    config => {
        // do something before request is sent
        //console.log(process.env.VUE_APP_BASE_API)

        //在每一个请求头部添加Token
        // if (store.getters.token) {
        //     // let each request carry token
        //     // ['X-Token'] is a custom headers key
        //     // please modify it according to the actual situation
        //     config.headers['X-Token'] = getToken()
        // }
        return config
    },
    error => {
        // 请求错误处理
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        // 统一处理返回状态
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 10000) {
            Notify({
                type: 'warning',
                message: res.message || 'Error',
                duration: 5 * 1000,
            });

            // 401: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            // if (res.code === 401 || res.code === 50012 || res.code === 50014) {
            //     // to re-login
            //     MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
            //         confirmButtonText: 'Re-Login',
            //         cancelButtonText: 'Cancel',
            //         type: 'warning'
            //     }).then(() => {
            //         store.dispatch('user/resetToken').then(() => {
            //             location.reload()
            //         })
            //     })
            // }
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Notify({
            message: error.message,
            type: 'warning',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service