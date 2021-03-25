import request from '@/utils/request'

export function fetchGroupList(query) {
    return request({
        url: '/group/list',
        method: 'get',
        params: query
    })
}

export function removeGroup(data) {
    return request({
        url: '/group/remove',
        method: 'delete',
        data
    })
}

export function joinGroup(data) {
    return request({
        url: '/group/joingroup',
        method: 'put',
        data
    })
}

export function openGroup(data) {
    return request({
        url: '/group/opengroup',
        method: 'post',
        data
    })
}

export function infoGroup(id) {
    return request({
        url: '/group/info',
        method: 'get',
        params: { id }
    })
}