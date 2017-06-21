<template>
  <div id="app">


      <router-view></router-view>



  </div>
</template>

<script>

import Blog from './components/frontoffice/Blog.vue'
import Dashboard from './components/backoffice/Dashboard.vue'

export default {
  name: 'app',
  components: {
    Blog, Dashboard
  }
}
</script>
