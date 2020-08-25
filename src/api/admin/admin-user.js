import request from '@/utils/request'

export function adminLogin(data) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data
  })
}
