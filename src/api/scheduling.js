import request from '@/utils/request'
export function getScheduling() {
  return request({
    url: '/scheduler',
    method: 'get'
  })
}

export function addScheduling(data) {
  return request({
    url: '/scheduler',
    method: 'post',
    data
  })
}

export function updateScheduling(id, data) {
  return request({
    url: `/scheduler/${id}`,
    method: 'put',
    data
  })
}

export function deleteScheduling(id) {
  return request({
    url: `/scheduler/${id}`,
    method: 'delete'
  })
}

export function getSchedulingByType(user_type) {
  return request({
    url: `/scheduler/${user_type}`,
    method: 'get'
  })
}
