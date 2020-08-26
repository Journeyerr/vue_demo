import { shops, productImageStore } from '@/api/shops'

const actions = {
  shops() {
    return new Promise((resolve, reject) => {
      shops().then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  productImageStore({ commit }, form) {
    const createForm = { imageId: form.imageId, price: form.price, status: form.status === true ? 1 : 0, remark: form.remark, shopId: form.shopId }
    return new Promise((resolve, reject) => {
      productImageStore(createForm).then(response => {
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

