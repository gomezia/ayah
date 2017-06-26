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

// Import libraries
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/material-dashboard.css'
//http://sliptree.github.io/bootstrap-tokenfield
import './assets/css/tags/tokenfield-typeahead.min.css'
import './assets/css/tags/bootstrap-tokenfield.min.css'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'summernote/dist/summernote.css'
import './assets/css/ayah.scss'

import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/js/material.min.js'
import './assets/js/material-dashboard.js'
import './assets/js/bootstrap-notify.js'
import './assets/js/material-kit.js'
import './assets/js/tags/bootstrap-tokenfield.js'
import './assets/js/tags/typeahead.bundle.min.js'
import './assets/js/summernote/codemirror.js'
import './assets/js/summernote/xml.js'
import './assets/js/summernote/formatting.js'
import './assets/js/summernote/summernote.js'




/////////// Scroll TO TOP
$(document).ready(function() {
  $(".ScrollTop").hide();
  $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
          $(".ScrollTop").fadeIn();
      } else {
          $(".ScrollTop").fadeOut();
      }
  });
})

$('a.ScrollTop').click(function(){
  $("body,html").animate({
    scrollTop: 0
  }, 800);
})


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
