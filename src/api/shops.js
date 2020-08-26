import request from '@/utils/request'

export function shops() {
  return request({
    url: '/admin/shop/index',
    method: 'get'
  })
}

export function productImageStore(data) {
  return request({
    url: '/admin/product/image/store',
    method: 'post',
    data
  })
}
