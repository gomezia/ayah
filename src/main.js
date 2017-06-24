import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Moment from 'vue-moment'
import App from './App.vue'
import routes from './routes/routes'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Moment)


const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'active',
  mode: 'history'
})

// new Vue({
//   el: '#app',
//   render: h => h(require('./App.vue'))
// })

//instatinat the vue instance
new Vue({
	//define the selector for the root component
  el: '#app',
  //pass the template to the root component
  template: '<App/>',
  //declare components that the root component can access
  components: { App },
  //pass in the router to the vue instance
  router
}).$mount('#app')//mount the router on the app
