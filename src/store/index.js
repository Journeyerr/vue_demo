import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import adminUser from './modules/admin-user'
import shops from './modules/shops'
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    adminUser,
    shops,
    order
  },
  getters
})

export default store
