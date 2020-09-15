import request from '@/utils/request'

export function shopsPage(data) {
  return request({
    url: '/admin/shop/index?page=' + data.page + '&pageSize=' + data.pageSize,
    method: 'get'
  })
}

export function shops() {
  return request({
    url: '/admin/shop/list',
    method: 'get'
  })
}
