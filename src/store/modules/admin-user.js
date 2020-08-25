import { adminInfo, adminLogin } from '@/api/admin-user'
import { setToken, removeToken } from '@/utils/auth'

const actions = {
  // user login
  adminLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      adminLogin({ phone: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(commit)
        setToken('Bearer ' + data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user login
  adminInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      adminInfo(state.token).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_NAME', data.name)
        commit('SET_AVATAR', data.phone)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  actions
}

