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
                      <div class="card">
                          <div class="card-content">
                              <form>
                                  <div class="row">
                                      <div class="col-md-12">
                                        <div class="form-group label-floating">
                                          <label class="control-label">Site name</label>
                                          <input id="input-site-name" type="text" class="form-control" v-model="settings.siteName">
                                        </div>
                                      </div>
                                  </div>
                                  <div class="row">
                                      <div class="col-md-12">
                                          <div class="form-group">
                                              <label>Body</label>
                                              <div class="form-group label-floating">
                                                  <div id="summernote"></div>
                                               </div>
                                          </div>
                                      </div>
                                  </div>
                                  <pre>{{this.settings}}</pre>
                                  <button type="submit" class="btn btn-primary pull-right" @click.prevent="saveSettings()">Save</button>
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
  name: 'Configuration',
  data() {
    return {
      settings: {
        siteName: ''
      }
    }
  },
  components: {
    SidebarMenu, Sidebar
  },
  methods: {
    saveSettings() {

        var url = 'http://vps272180.ovh.net:5984/settings'
        // POST /someUrl
        if (this.settings.siteName != '') {

          this.$http.post(url, this.settings).then(response => {
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
          })
        }
    }
  }
}
</script>
