// import axios from '../axios'
import http_m from '@/assets/js/http'

var http = http_m.methods

const state = {
  list: []
}

const actions = {
  getTaskInfo({ commit, dispatch }, id) {
    http.apiGet('task/' + id).then(res => {
      http.handelResponse(res, data => {
        commit('setWebsiteList', data)
      })
    })
  }
}

const mutations = {
  setWebsiteList(state, data) {
    data.website_list.forEach(item => {
      if (!item.model) {
        item.model = this.websiteModel
      } else {
        item.model = JSON.parse(item.model)
      }
      item.rule_list = []
      item.scan_data = []
    })
    state.list = data.website_list
  }
}

export default {
  state,
  actions,
  mutations
}
