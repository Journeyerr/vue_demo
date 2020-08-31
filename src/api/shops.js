import request from '@/utils/request'
import { pageSize } from '@/utils/content'

export function shopsPage(data) {
  return request({
    url: '/admin/shop/index?page=' + data.page + '&pageSize=' + pageSize,
    method: 'get'
  })
}

export function shops() {
  return request({
    url: '/admin/shop/list',
    method: 'get'
  })
}
