import request from '@/utils/request'

export function fetchCompanybyLink(link_id) {
    return request({
        url: '/company/listbyid',
        method: 'get',
        params: { link_id }
    })
}