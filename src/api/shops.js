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

export function productImageStore(data) {
  return request({
    url: '/admin/product/images/store',
    method: 'post',
    data
  })
}

export function productImageIndex(data) {
  const url = '/admin/product/images/index?page=' + data.page + '&pageSize=' + pageSize
  if (data.shopId !== null) {
    url.concat('&shopId=' + data.shopId)
  }
  return request({
    url: url,
    method: 'get'
  })
}

export function productImageRemove(imageId) {
  return request({
    url: 'admin/product/images/delete/' + imageId,
    method: 'post'
  })
}

export function productImageUpdate(imageId) {
  return request({
    url: 'admin/product/images/update/' + imageId,
    method: 'post'
  })
}
