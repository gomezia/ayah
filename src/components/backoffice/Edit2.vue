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

                    <div class="card" v-show="!edit">
                      <div class="card-header" data-background-color="purple">
                          <h4 class="title">Content</h4>
                          <p class="category">Here is a subtitle for this table</p>
                      </div>
                      <div class="card-content table-responsive">
                        <table class="table">
                          <tbody>
                              <tr v-for="node in nodes">
                                <td>{{node.title}}</td>
                                <td class="td-actions text-right">
                                <button type="button" rel="tooltip" title="" data-original-title="Edit Task" class="btn btn-primary btn-simple btn-xs" @click.prevent="editNode(node)">
                                <i class="material-icons">edit</i>
                                <div class="ripple-container"></div>
                                </button>
                                <button type="button" rel="tooltip" title="" data-original-title="Remove" class="btn btn-danger btn-simple btn-xs">
                                <i class="material-icons">close</i> <div class="ripple-container"></div></button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <div class="card" v-show="edit">
                          <div class="card-content">
                              <form>
                                  <div class="row">
                                      <div class="col-md-12">
                                        <div class="form-group label-floating">
                                          <label class="control-label">Title</label>

                                          <input id="input-title" type="text" class="form-control" :value="nodeToEdit.title">
                                        </div>
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-md-12">
                                          <div class="form-group">
                                              <label>Body</label>
                                              <div class="form-group label-floating">
                                                  <div id="summernote">{{nodeToEdit.title}}</div>
                                               </div>
                                          </div>
                                      </div>
                                  </div>

                                  <button type="submit" class="btn btn-primary pull-right" @click.prevent="saveNode()">Save</button>
                                  <div class="clearfix"></div>
                              </form>
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
  data() {
      return {
        edit: false,
        nodeToEdit: ''
      }
  },
  computed: {
    ...mapGetters({
      nodes: 'getNodes',
    }),
  },
  methods: {
    ...mapActions(['actionLoadNodes']),
    editNode(node) {
      this.edit = true
      $('#summernote').summernote()
      this.nodeToEdit = node
      $.notify({
      icon: "check",
      message: node.title

      },{
          type: type[1],
          timer: 200,
          placement: {
              from: 'top',
              align: 'center'
          }
      });
    }
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
