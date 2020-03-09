import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/space/info',
    method: 'get',
    params: { token }
  })
}

export function getSpace() {
  return request({
    url: '/space',
    method: 'get'
  })
}

export function addSpace(data) {
  return request({
    url: '/space',
    method: 'post',
    data
  })
}

export function updateSpace(id, data) {
  return request({
    url: `/space/${id}`,
    method: 'put',
    data
  })
}

export function deleteSpace(id) {
  return request({
    url: `/space/${id}`,
    method: 'delete'
  })
}

export function getSpaceEnable() {
  return request({
    url: '/space',
    method: 'get'
  })
}
