import request from '@/utils/request'
import { pageSizeConfig } from '@/utils/content'
import { urlTool } from '@/utils/url-tool'

export function orderList(data) {
  const param = { page: data.page, pageSize: pageSizeConfig, shopId: data.shopId, status: data.status }
  const url = 'admin/order/list' + urlTool(param)
  return request({
    url: url,
    method: 'get'
  })
}

export function orderDetail(no) {
  const url = 'admin/order/detail/' + no
  return request({
    url: url,
    method: 'get'
  })
}

