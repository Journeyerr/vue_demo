import { adminInfo, adminLogin, adminIndex } from '@/api/admin-user'
import { setToken, removeToken } from '@/utils/auth'
import { cache } from '@/utils/cache'

const actions = {
  // user login
  adminLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      adminLogin({ phone: username.trim(), password: password }).then(response => {
        setToken('Bearer ' + response.data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  adminInfo() {
    return new Promise((resolve, reject) => {
      adminInfo().then(response => {
        const { data } = response
        if (!data) {
          return reject('身份异常，请重新登陆')
        }
        cache('userInfo', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  adminIndex() {
    return new Promise((resolve) => {
      adminIndex().then(response => {
        resolve(response)
      })
    })
  },

  // remove token
  resetToken() {
    return new Promise(resolve => {
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  actions
}

