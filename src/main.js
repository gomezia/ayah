import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
  el: '#app',
  render: h => h(require('./App.vue'))
})
