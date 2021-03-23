import request from '@/utils/request'

export function findorCreate(query) {
    return request({
        url: '/user/findorcreate',
        method: 'get',
        params: query
    })
}