import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/software/info',
    method: 'get',
    params: { token }
  })
}

export function getSoftware() {
  return request({
    url: '/software',
    method: 'get'
  })
}

export function addSoftware(data) {
  return request({
    url: '/software',
    method: 'post',
    data
  })
}

export function updateSoftware(id, data) {
  return request({
    url: `/software/${id}`,
    method: 'put',
    data
  })
}

export function deleteSoftware(id) {
  return request({
    url: `/software/${id}`,
    method: 'delete'
  })
}

export function getSoftwareSpace(id) {
  return request({
    url: `/space/${id}/software`,
    method: 'get'
  })
}

export function getActiveSoftware() {
  return request({
    url: `/software/enable`,
    method: 'get'
  })
}

export function deleteSoftwareSpace(SoftwareId, SpaceId) {
  return request({
    url: `/space/${SpaceId}/software/${SoftwareId}`,
    method: 'delete'
  })
}

export function addSoftwareSpace(data) {
  return request({
    url: `space/software`,
    method: 'post',
    data
  })
}
