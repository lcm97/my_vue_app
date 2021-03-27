import request from '@/utils/request'

export function updateViews(link_id) {
    return request({
        url: '/links/updateviews',
        method: 'get',
        params: { link_id }
    })
}

export function updateShares(link_id) {
    return request({
        url: '/links/updateshares',
        method: 'get',
        params: { link_id }
    })
}