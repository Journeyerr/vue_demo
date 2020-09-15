import request from '@/utils/request'
import { pageSizeConfig } from '@/utils/content'

export function shopsPage(data) {
  return request({
    url: '/admin/shop/index?page=' + data.page + '&pageSize=' + pageSizeConfig,
    method: 'get'
  })
}

export function shops() {
  return request({
    url: '/admin/shop/list',
    method: 'get'
  })
}
