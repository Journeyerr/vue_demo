import request from '@/utils/request'
import { pageSize } from '@/utils/content'
import { urlTool } from '@/utils/url-tool'

export function bannerStore(data) {
  return request({
    url: '/admin/banner/store',
    method: 'post',
    data
  })
}

export function bannerIndex(data) {
  const param = { page: data.page, pageSize: pageSize, shopId: data.shopId }
  const url = '/admin/banner/index' + urlTool(param)
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
