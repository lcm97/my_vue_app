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

export function getUserInfo(code) {
    return request({
        url: '/user/getwxinfo',
        method: 'get',
        params: { code }
    })
}

export function updateUserStatus(data) {
    return request({
        url: '/user/updatestatus',
        method: 'put',
        data
    })
}

export function getSdkTicket() {
    return request({
        url: '/user/getticket',
        method: 'get'
    })
}