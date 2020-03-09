import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/user/report/evasion',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/space/report/frequency',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}
