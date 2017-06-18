<template>
  <div class="wrapper">
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

                    <h2>Edition</h2>
                    <div class="card">
                        <div class="card-content">
                            <form>
                                <div class="row">
                                    <div class="col-md-12">
                                      <div class="form-group label-floating">
                                        <label class="control-label">Title</label>

                                        <input id="input-title" type="text" class="form-control" :value="node.title">
                                      </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Body</label>
                                            <div class="form-group label-floating">
                                                <div id="summernote" v-html="node.body"></div>
                                             </div>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-success pull-right" @click.prevent="saveNode()"><i class="material-icons">check</i> Save</button>
                                <button type="submit" class="btn btn-warning pull-right" @click.prevent="cancel()"><i class="material-icons">cancel</i> cancel</button>
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

import SidebarMenu from './SidebarMenu.vue'
// Main Menu
import Sidebar from './Sidebar.vue'

export default {
  name: 'Edit',
  data() {
      return {
        nodeToEdit: '',
        loading: false,
        node: '',
      }
  },
  components: {
    SidebarMenu, Sidebar
  },
  methods: {
    saveNode() {
      var title = $('#input-title').val()
      var body =  $('.note-editable').html()
      var object = {
        '_id': this.node._id,
        '_rev': this.node._rev,
        'title': title,
        'body': body
      }

      var url = 'http://vps272180.ovh.net:5984/node/' + this.node._id

      // POST /someUrl
      if (title != '') {
        this.$http.put(url, object).then(response => {
          //demo.showNotification('top','right')
          $.notify({
          icon: "check",
          message: "Your node has been updated successfuly"

          },{
              type: type[2],
              timer: 200,
              placement: {
                  from: 'top',
                  align: 'center'
              }
          })

          this.$router.push('/content')

          // get status
          response.status;

          // get status text
          response.statusText;

          // get 'Expires' header
          response.headers.get('Expires');

          // get body data
          console.log(response);

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
      else {
        $.notify({
        icon: "warning",
        message: "The title should not be empty"

        },{
            type: type[4],
            timer: 200,
            placement: {
                from: 'top',
                align: 'center'
            }
        })
      }
    },
    cancel() {
      this.$router.push('/content')
    }
  },
  mounted(){

    var url = 'http://vps272180.ovh.net:5984/node/' + this.$route.params.id
    this.loading = true
    this.$http.get(url)
      .then(response => {
        console.log(response.data)
        this.node = response.data
    }, response => {
      // error callback
    }).then(_ =>{
       this.loading = false
       $('#summernote').summernote()
     })

  }
}
</script>
