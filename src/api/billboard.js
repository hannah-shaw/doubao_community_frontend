import request from '@/utils/request'

export function getBillboard() {
  return request({
    url: '/billboard/show',
    method: 'get'
  })
}

export function getAllBillboard() {
  return request({
    url: '/billboard/showall',
    method: 'get'
  })
}

export function getBillboardNum() {
  return request({
    url: '/billboard/getamount',
    method: 'get'
  })
}

export function createBillboard(content) {
  return request({
    url: '/billboard/create',
    method: 'post',
    data: content,
  })
}