import request from '@/utils/request'

export function shops() {
  return request({
    url: '/admin/shop/index',
    method: 'get'
  })
}
