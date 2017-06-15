<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-md-12">
              <div class="card">
                  <div class="card-content">
                      <form>
                          <div class="row">
                              <div class="col-md-12">
                                <div class="form-group label-floating">
                                  <label class="control-label">Title</label>

                                  <input id="input-title" type="text" class="form-control">
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

                          <button type="submit" class="btn btn-primary pull-right" @click.prevent="saveNode()">Save</button>
                          <div class="clearfix"></div>
                      </form>
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

$(document).ready(function() {
  $('#summernote').summernote();
});


export default {
  name: 'AddNode',
  store: store,
  methods: {
    saveNode() {
      var title = $('#input-title').val()
      var body =  $('.note-editable').html()
      var object = {
        'title': title,
        'body': body
      }
      var url = 'http://vps272180.ovh.net:5984/node'
      // POST /someUrl
      console.log(this.$http);
      this.$http.post(url, object).then(response => {
        //demo.showNotification('top','right')
        $.notify({
        icon: "check",
        message: "Your node has been created successfuly"

        },{
            type: type[2],
            timer: 200,
            placement: {
                from: 'top',
                align: 'center'
            }
        });

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
  },
}
</script>
