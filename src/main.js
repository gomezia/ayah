import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource)
Vue.use(VueRouter)


import Blog from './components/frontoffice/Blog.vue'
import Dashboard from './components/backoffice/Dashboard.vue'
import List from './components/backoffice/List.vue'
import Edit from './components/backoffice/Edit.vue'

const routes = [
	//route for the home route of the webpage
  { path: '*', component: Blog, name: 'blog' },
	{ path: '/', component: Blog, name: 'blog' },
	//route for the about route of the webpage
	{ path: '/dashboard', component: Dashboard, name: 'dashboard' },
  { path: '/content', component: List, name: 'content' },
  {path: '/node/edit/:id', component: Edit, name: 'edit'},

]

const router = new VueRouter({
  routes, // short for routes: routes
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
