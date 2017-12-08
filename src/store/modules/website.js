// import axios from '../axios'
import http_m from '@/assets/js/http'

var http = http_m.methods

const state = {
  list: {}
}

const actions = {
  getTaskInfo({ commit, dispatch }, id) {
    http.apiGet('task/' + id).then(res => {
      http.handelResponse(res, data => {

        // console.log(data)
        // () => commit(types.GET_TASKINFO, { data })
        // data.website_list.forEach(item => {
        //   if (!item.model) {
        //     item.model = this.websiteModel
        //   } else {
        //     item.model = JSON.parse(item.model)
        //   }
        //   item.rule_list = []
        //   item.scan_data = []
        // })
        // this.form = data
      })
    })
  }
}

const mutations = {
  addUserInfo(state, { data }) {}
}

export default {
  state,
  actions,
  mutations
}
