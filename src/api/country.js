import request from '@/utils/request'

export function getCountries() {
    return request({
        url: '/country',
        method: 'get'
    })
}
