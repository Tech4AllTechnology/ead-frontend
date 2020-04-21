import request from '@/utils/request'

export function getInfo(token) {
    return request({
        url: '/campus/info',
        method: 'get',
        params: {token}
    })
}

export function getCampus() {
    return request({
        url: '/campus',
        method: 'get'
    })
}

export function addCampus(data) {
    return request({
        url: '/campus',
        method: 'post',
        data
    })
}

export function updateCampus(id, data) {
    return request({
        url: `/campus/${id}`,
        method: 'put',
        data
    })
}

export function deleteCampus(id) {
    return request({
        url: `/campus/${id}`,
        method: 'delete'
    })
}

export function getActiveCampus() {
    return request({
        url: `/campus/enable`,
        method: 'get'
    })
}