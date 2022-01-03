import request from '@/utils/request'

export function getPosition() {
  return request({
    url: '/position/all',
    method: 'get'
  })
}