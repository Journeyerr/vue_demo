import request from '@/utils/request'
import { pageSize } from '@/utils/content'

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
  let url = '/admin/product/index?page=' + data.page + '&pageSize=' + pageSize
  if (data.shopId !== null) {
    url = url + '&shopId=' + data.shopId
  }
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
