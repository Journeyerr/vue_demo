import request from '@/utils/request'
import { urlTool } from '@/utils/url-tool'

export function orderList(data) {
  const url = 'admin/order/list' + urlTool(data)
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

