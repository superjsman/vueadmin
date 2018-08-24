import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  name: 'aa'
}

const mutations = {
  setName (state, params) {
    state.name = params
  }
}

export default new Vuex.Store({
  state,
  mutations
})
