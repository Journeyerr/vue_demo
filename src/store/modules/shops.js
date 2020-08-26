import { shops } from '@/api/shops'

const actions = {
  shops() {
    return new Promise((resolve, reject) => {
      shops().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}

