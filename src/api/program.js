import request from '@/utils/request'
export function getProgram() {
  return request({
    url: '/program',
    method: 'get'
  })
}

export function addProgram(data) {
  return request({
    url: '/program',
    method: 'post',
    data
  })
}

export function updateProgram(id, data) {
  return request({
    url: `/program/${id}`,
    method: 'put',
    data
  })
}

export function deleteProgram(id) {
  return request({
    url: `/program/${id}`,
    method: 'delete'
  })
}

export function enableProgram() {
  return request({
    url: `/program/enable`,
    method: 'get'
  })
}
