import Vue from 'vue'
import Vuex from 'vuex'

// import base from './modules/base'
import task from './modules/task'
import permission from './modules/permission'
import website from './modules/website'
import app from './modules/app'
import user from './modules/user'

import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    app,
    permission,
    user,
    task,
    website
  }
})
