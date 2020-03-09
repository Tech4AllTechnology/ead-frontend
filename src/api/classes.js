import request from '@/utils/request'

export function getInfo(token) {
  return request({
    url: '/clazz/info',
    method: 'get',
    params: { token }
  })
}

export function getClass() {
  return request({
    url: '/clazz',
    method: 'get'
  })
}

export function addClass(data) {
  return request({
    url: '/clazz',
    method: 'post',
    data
  })
}

export function updateClass(id, data) {
  return request({
    url: `/clazz/${id}`,
    method: 'put',
    data
  })
}

export function deleteClass(id) {
  return request({
    url: `/clazz/${id}`,
    method: 'delete'
  })
}

export function addLack(lack) {
  const data = {
    professorId: lack.professor.id,
    date: lack.date
  }
  return request({
    url: `/user/lack`,
    method: 'post',
    data
  })
}

export function getClassEnable() {
  return request({
    url: '/clazz',
    method: 'get'
  })
}
