<template>
    <div class="container ">
      <div v-for="node in nodes">
        <h2>{{node.title}}</h2>
        <p v-html="node.body"></p>
      </div>
    </div>
</template>

<script>
import store from '../../store/Store'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: 'Blog',
  store: store,
  computed: {
    ...mapGetters({
      nodes: 'getNodes',
    }),
  },
  methods: {
    ...mapActions(['actionLoadNodes']),
  },
  mounted() {
    var url = 'http://vps272180.ovh.net:5984/node/_all_docs?include_docs=true&conflicts=true'
    this.$http.get(url)
      .then(response => {
      var array = []
      response.data.rows.forEach(function(item, index){
        array.push(item.doc)
      })
      this.actionLoadNodes(array)

    }, response => {
      // error callback
    })
  }
}
</script>
