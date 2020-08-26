import request from '@/utils/request'

export function adminLogin(data) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data
  })
}

export function adminInfo() {
  return request({
    url: '/admin/user',
    method: 'get'
  })
}

export function adminIndex() {
  return request({
    url: '/admin/index',
    method: 'get'
  })
}
