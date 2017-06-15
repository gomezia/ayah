<template>
  <div>
    <div class="sidebar" data-color="purple" data-image="/src/assets/img/sidebar-1.jpg">
      <div class="logo">
        <a href="http://www.creative-tim.com" class="simple-text">
          Creative Tim
        </a>
      </div>

      <Sidebar></sidebar>

    </div>
    <div class="main-panel">
        <SidebarMenu></SidebarMenu>
        <div class="content">
          <div class="container-fluid">
              <div class="row">
                  <div class="col-md-12">
                      <div class="card">
                          <div class="card-header" data-background-color="purple">
                              <h4 class="title">Content</h4>
                              <p class="category">Here is a subtitle for this table</p>
                          </div>
                          <div class="card-content table-responsive">
                              <table class="table">
                                  <thead class="text-primary">
                                    <th>Title</th>
                                  </thead>
                                  <tbody>
                                      <tr v-for="node in nodes">
                                        <td>{{node.title}}</td>
                                      </tr>

                                  </tbody>
                              </table>

                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>

import store from '../../store/Store'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

import SidebarMenu from './SidebarMenu.vue'
// Main Menu
import Sidebar from './Sidebar.vue'

export default {
  name: 'List',
  store: store,
  computed: {
    ...mapGetters({
      nodes: 'getNodes',
    }),
  },
  methods: {
    ...mapActions(['actionLoadNodes']),
  },
  components: {
    SidebarMenu, Sidebar
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
