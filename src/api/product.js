import request from '@/utils/request'
import { urlTool } from '@/utils/url-tool'

export function productStore(data) {
  return request({
    url: '/admin/product/store',
    method: 'post',
    data
  })
}

export function productEdit(data) {
  return request({
    url: '/admin/product/edit',
    method: 'post',
    data
  })
}

export function productIndex(data) {
  const param = { page: data.page, pageSize: data.pageSize, shopId: data.shopId }
  const url = '/admin/product/index' + urlTool(param)
  return request({
    url: url,
    method: 'get'
  })
}

export function productRemove(productId) {
  return request({
    url: 'admin/product/delete/' + productId,
    method: 'post'
  })
}

export function productUpdate(productId) {
  return request({
    url: 'admin/product/update/' + productId,
    method: 'post'
  })
}

export function productDetail(productId) {
  return request({
    url: 'admin/product/detail/' + productId,
    method: 'get'
  })
}
