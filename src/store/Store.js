import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

const my_state = {
  nodes: {},
}

const my_mutations = {
  LOAD_NODES: (state, object) => {
    state.nodes = object
  }
}

const my_getters = {
  getNodes: state => state.nodes,
}

const my_actions = {
  actionLoadNodes: (store) => {
    var url = 'http://vps272180.ovh.net:5984/node/_all_docs?include_docs=true&conflicts=true'
    // In Store use Vue.http instead of this.$http
    //https://forum.vuejs.org/t/vue-resource-api-call-inside-mutation-doesnt-recognize-vue/2863/7
    Vue.http.get(url)
      .then(response => {
      var array = []
      response.data.rows.forEach(function(item, index){
        array.push(item.doc)
      })
      store.commit("LOAD_NODES", array)


    }, response => {
      // error callback
    })
  }
}


export default new Vuex.Store({
  state: my_state,
  mutations: my_mutations,
  getters: my_getters,
  actions: my_actions,

})
