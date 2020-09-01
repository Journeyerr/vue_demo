import request from '@/utils/request'
import { pageSize } from '@/utils/content'

export function bannerStore(data) {
  return request({
    url: '/admin/banner/store',
    method: 'post',
    data
  })
}

export function bannerIndex(data) {
  const url = '/admin/banner/index?page=' + data.page + '&pageSize=' + pageSize
  if (data.shopId !== null) {
    url.concat('&shopId=' + data.shopId)
  }
  return request({
    url: url,
    method: 'get'
  })
}

export function bannerRemove(imageId) {
  return request({
    url: 'admin/banner/delete/' + imageId,
    method: 'post'
  })
}

export function bannerUpdate(imageId) {
  return request({
    url: 'admin/banner/update/' + imageId,
    method: 'post'
  })
}
