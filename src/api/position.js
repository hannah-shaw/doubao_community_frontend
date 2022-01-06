import request from '@/utils/request'

export function getPosition() {
  return request({
    url: '/position/all',
    method: 'get'
  })
}

// 发布
export function create(pos) {
  return request({
    url: '/position/create',
    method: 'post',
    data: pos
  })
}