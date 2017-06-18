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
  },
  data () {
    return {
      title: 'Welcome to Your Vue.js App',
      body: 'test'
    }
  },
  mounted() {
    var url = 'http://vps272180.ovh.net:5984/node/1'
    // GET /someUrl
    this.$http.get(url).then(response => {
      console.log(response)
      this.title = response.body.title
      this.body = response.body.body

    }, response => {
      // error callback
    })
  }
  // mounted() {
  //   var url = 'http://vps272180.ovh.net:5984/node/_all_docs?include_docs=true&conflicts=true'
  //   this.$http.get(url)
  //     .then(response => {
  //     var array = []
  //     response.data.rows.forEach(function(item, index){
  //       array.push(item.doc)
  //       console.log(response)
  //     })
  //     this.channels = array
  //     console.log(this.channels)

  //   }, response => {
  //     // error callback
  //   })
  // }
}
</script>
