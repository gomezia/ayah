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

                    <h2>Edition</h2>
                    <div class="card">
                        <div class="card-content">
                            <form>
                              <!-- Title -->
                                <div class="row">
                                    <div class="col-md-12">
                                      <div class="form-group label-floating">
                                        <label class="control-label">Title</label>
                                        <input id="input-title" type="text" class="form-control" :value="node.title">
                                      </div>
                                    </div>
                                </div>

                              <!-- Body -->
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

                                <!-- Tags -->
                                <div class="row">
                                    <div class="col-md-12">
                                      <div class="form-group">
                                        <label class="control-label">Tags</label>
                                        <input type="text" class="form-control" id="tokenfield-edit" :value="node.tags"/>
                                        <span><i>Add several tags separated by comma</i></span>
                                      </div>
                                    </div>
                                </div>
                                <!-- Actions -->
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
import store from '../../store/Store'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'

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
  computed: {
    ...mapGetters({
      baseUrl: 'baseUrl'
    }),
  },
  methods: {
    ...mapActions(['actionShowNotification']),
    saveNode() {
      var title = $('#input-title').val()
      var body =  $('.note-editable').html()
      var tags = []
      $(".token-label").each(function() {
          tags.push($(this).html())
      })

      var object = {
        '_id': this.node._id,
        '_rev': this.node._rev,
        'title': title,
        'body': body,
        'tags': tags,
        'created': this.node.created,
        'updated': + new Date()
      }



      var url = 'http://vps272180.ovh.net:5984/node/' + this.node._id
      //var url = 'http://127.0.0.1:5984/node/' + this.node._id


      // POST /someUrl
      if (title != '') {
        this.$http.put(url, object).then(response => {

          // Show Message
          var params = {
            type: 'success',
            message: 'Your content has been updated successfuly',
            icon: 'check'
          }
          store.dispatch('actionShowNotification', params)

          // Redirection
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
          var params = {
            type: 'warning',
            message: 'An error has been occured, please try again',
            icon: 'warning'
          }

          store.dispatch('actionShowNotification', params)
        })
      }
      else {

        var params = {
          type: 'danger',
          message: 'The title should not be empty',
          icon: 'warning'
        }
        store.dispatch('actionShowNotification', params)

      }
    },
    cancel() {
      this.$router.push('/content')
    }
  },
  mounted(){

    var url = 'http://vps272180.ovh.net:5984/node/' + this.$route.params.id
    //var url = 'http://127.0.0.1:5984/node/' + this.$route.params.id

    this.loading = true
    this.$http.get(url)
      .then(response => {
        console.log(response.data)
        this.node = response.data
    }, response => {
      // error callback
    }).then(_ =>{
       this.loading = false
       //$('#summernote').summernote()

      $('#summernote').summernote({
        codemirror: { // codemirror options
          theme: 'monokai'
        }
      })


       $('#tokenfield-edit').tokenfield()
       console.log($('#tokenfield-edit').tokenfield('getTokens'))
     })



  }
}
</script>
