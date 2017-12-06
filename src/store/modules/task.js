// import axios from '../axios'
import http from '@/assets/js/http'

const state = {
  info: {}
}

const actions = {
  getTaskInfo({ commit, dispatch }, res) {

    http.apiGet('task/' + this.form.id).then(res => {
      this.handelResponse(res, data => {
        data.website_list.forEach(item => {
          if (!item.model) {
            item.model = this.websiteModel
          } else {
            item.model = JSON.parse(item.model)
          }
          item.rule_list = []
          item.scan_data = []
        })
        this.form = data
      })
    })


  }
}

const mutations = {
  addUserInfo(state, { data }) {
  }
}

export default {
  state,
  actions,
  mutations
}
