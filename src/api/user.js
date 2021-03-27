import request from '@/utils/request'

export function findorCreate(query) {
    return request({
        url: '/user/findorcreate',
        method: 'get',
        params: query
    })
}

export function getbulknum(link_id) {
    return request({
        url: '/user/count',
        method: 'get',
        params: { link_id }
    })
}