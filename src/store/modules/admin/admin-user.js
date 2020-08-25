import { adminInfo, adminLogin } from '@/api/admin/admin-user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  adminLogin({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      adminLogin({ phone: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', 'Bearer ' + data.token)
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
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
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
  state,
  mutations,
  actions
}

