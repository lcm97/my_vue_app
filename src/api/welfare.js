import request from '@/utils/request'

export function fetchWelfareList() {
    return request({
        url: '/welfare/findall',
        method: 'get',
    })
}