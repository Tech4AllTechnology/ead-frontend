import request from '@/utils/request'

export function getStates() {
  return request({
    url: '/state',
    method: 'get'
  })
}
