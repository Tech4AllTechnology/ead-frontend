import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'put'
  })
}

export function getUsers() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function updateUser(id, data) {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/user/${id}`,
    method: 'delete'
  })
}

export function getMasterUsers() {
  return request({
    url: '/user/professor',
    method: 'get'
  })
}

export function getStudentUsers() {
  return request({
    url: '/user/student',
    method: 'get'
  })
}

export function getAdminUsers() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function getRoleUsers() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function getUserCourse(id) {
  return request({
    url: `/user/${id}/program`,
    method: 'get'
  })
}
