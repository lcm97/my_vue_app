import request from '@/utils/request'

export function addComplain(data) {
    return request({
        url: '/complain/add',
        method: 'post',
        data
    })
}