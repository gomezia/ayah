import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

const my_state = {
  nodes: {}
}

const my_mutations = {
  LOAD_NODES: (state, object) => {
    console.log(object)
    state.nodes = object
  }
}

const my_getters = {
  getNodes: state => state.nodes,
}

const my_actions = {
  actionLoadNodes: (store, object) => {
    store.commit("LOAD_NODES", object)
  }
}


export default new Vuex.Store({
  state: my_state,
  mutations: my_mutations,
  getters: my_getters,
  actions: my_actions,

})
