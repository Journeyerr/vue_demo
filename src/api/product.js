import request from '@/utils/request'
import { pageSize } from '@/utils/content'

export function productStore(data) {
  return request({
    url: '/admin/product/store',
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

export function productRemove(imageId) {
  return request({
    url: 'admin/product/delete/' + imageId,
    method: 'post'
  })
}

export function productUpdate(imageId) {
  return request({
    url: 'admin/product/update/' + imageId,
    method: 'post'
  })
}
