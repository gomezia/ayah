import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(Vuex)

const my_state = {
  nodes: {},
  baseUrl: 'http://vps272180.ovh.net:5984/',
  allTags: [],
  loading: false,
}

const my_mutations = {
  LOAD_NODES: (state, object) => {
    state.nodes = object
  },
  LOAD_TAGS: (state, tags) => {
    state.allTags = tags
  },
  TOOGLE_LOADING: (state) => {
    state.loading = !state.loading
  }
}

const my_getters = {
  getNodes: state => state.nodes,
  baseUrl: state => state.baseUrl,
  allTags: state => state.allTags,
  getLoading: state => state.loading
}

const my_actions = {
  actionLoadNodes: (store) => {
    var url = store.getters.baseUrl + 'node/_all_docs?include_docs=true&conflicts=true'
    store.commit("TOOGLE_LOADING")
    // In Store use Vue.http instead of this.$http
    //https://forum.vuejs.org/t/vue-resource-api-call-inside-mutation-doesnt-recognize-vue/2863/7
    Vue.http.get(url)
      .then(response => {
      var array = []
      response.data.rows.forEach(function(item, index){
        array.push(item.doc)
      })

      store.commit("LOAD_NODES", array)
      store.commit("TOOGLE_LOADING")


    }, response => {
      // error callback
    })
  },
  actionLoadTags: (store) => {
    var url = store.getters.baseUrl + '/node/_design/ayah/_view/all_tags?group=true'

    // In Store use Vue.http instead of this.$http
    //https://forum.vuejs.org/t/vue-resource-api-call-inside-mutation-doesnt-recognize-vue/2863/7
    Vue.http.get(url)
      .then(response => {
      let tags = []
      response.data.rows.forEach(function(item, index){
        tags.push(item)
      })
      store.commit("LOAD_TAGS", tags)

    }, response => {
      // error callback
    })
  },
  actionShowNotification: (store, params) => {
    $.notify({
    icon: params.icon,
    message: params.message
    },{
        type: params.type,
        timer: 200,
        placement: {
            from: 'top',
            align: 'right'
        }
    })
  },
  actionLaodTokenField: (store, tags) => {
    console.log('actionLaodTokenField', tags);
    var engine = new Bloodhound({
      local: tags,
      datumTokenizer: function(d) {
        return Bloodhound.tokenizers.whitespace(d.value);
      },
      queryTokenizer: Bloodhound.tokenizers.whitespace
    });
    engine.initialize();

    $('#tokenfield').tokenfield({
      typeahead: [null, { source: engine.ttAdapter() }]
    })
  }
}


export default new Vuex.Store({
  state: my_state,
  mutations: my_mutations,
  getters: my_getters,
  actions: my_actions,

})
