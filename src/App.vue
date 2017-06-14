<template>
  <div id="app">
    {{title}}
    <p>{{body}}</p>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      title: 'Welcome to Your Vue.js App'
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
}
</script>
