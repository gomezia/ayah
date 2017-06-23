<template>
  <div class="wrapper">
    <div class="sidebar" data-color="purple" data-image="/src/assets/img/sidebar-1.jpg">
      <div class="logo">
        <a href="#" class="simple-text">
          Ayah
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
                    <h2>Content</h2>
                    <div class="card">
                      <!-- <div class="card-header" data-background-color="purple">
	                       <h4 class="title">Content</h4>
	                    </div> -->
                      <div class="card-content table-responsive">
                        <table class="table table-hover">
                          <thead class="text-default">
                          	 <tr>
                               <th><strong>Title</strong></th>
                          	   <th><strong>Created</strong></th>
                          	   <th><strong>Actions</strong></th>
                          	 </tr>
                           </thead>
                          <tbody>
                              <tr v-for="node in nodes">
                                <td><router-link :to="{name: 'node', params: {id: node._id}}" class="item">{{node.title}}</router-link></td>
                                <td>{{node.created | moment("calendar", "July 10 2011") }}</td>
                                <td class="td-actions text-right">
                                <router-link :to="{name: 'edit', params: {id: node._id}}" class="item edit-icon"><i class="material-icons">edit</i><div class="ripple-container"></div></router-link>
                                <button type="button" rel="tooltip" title="" data-original-title="Remove" class="btn btn-danger btn-simple btn-xs" data-toggle="modal" data-target="#myModal" @click.prevent="deleteNode(node)">
                                <i class="material-icons">delete</i> <div class="ripple-container"></div></button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>

                      <!-- Modal Core -->
                      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-body">
                              <p class="text-danger">Do you realy want to delete that node ?</p>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-default btn-simple" data-dismiss="modal">Cancel</button>
                              <button type="button" class="btn btn-success btn-simple" data-dismiss="modal" @click.prevent="confirmDeleteNode()">Delete</button>
                            </div>
                          </div>
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
      nodeTodelete: ''
    }
  },
  computed: {
    ...mapGetters({
      nodes: 'getNodes',
    }),
  },
  methods: {
    ...mapActions(['actionLoadNodes']),
    deleteNode(node) {
      this.nodeTodelete = node
    },
    confirmDeleteNode() {

      //var url = 'http://vps272180.ovh.net:5984/node/' + this.nodeTodelete._id + '?rev=' + this.nodeTodelete._rev
      var url = 'http://127.0.0.1:5984/node/' + this.nodeTodelete._id + '?rev=' + this.nodeTodelete._rev


      this.$http.delete(url).then(response => {
        //demo.showNotification('top','right')
        $.notify({
        icon: "check",
        message: "Your content has been deleted"

        },{
            type: type[2],
            timer: 200,
            placement: {
                from: 'top',
                align: 'center'
            }
        })

        // get status
        response.status;

        // get status text
        response.statusText;

        // get 'Expires' header
        response.headers.get('Expires');

        var updatedNodes = this.nodes.filter(item => {
          return item._id != this.nodeTodelete._id
        })
        console.log(updatedNodes)
        this.actionLoadNodes(updatedNodes)

      }, response => {
        // error callback
        $.notify({
        icon: "check",
        message: "An error has been occured, please try again"

        },{
            type: type[4],
            timer: 200,
            placement: {
                from: 'top',
                align: 'center'
            }
        })
      })



    }
  },
  components: {
    SidebarMenu, Sidebar
  },
  mounted() {
    this.actionLoadNodes()
  }


}
</script>
