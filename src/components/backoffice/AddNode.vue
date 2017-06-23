<template>
  <div class="container-fluid">
      <div class="row">
          <div class="col-md-12">
            <h2>Add new content</h2>
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
                          <div class="row">
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label class="control-label">Tags</label>
                                  <input type="text" class="form-control" id="tokenfield" />
                                  <span><i>Add several tags separated by comma</i></span>
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

export default {
  name: 'AddNode',
  store: store,
  data() {
    return {
      tags: '',
    }
  },
  methods: {
    saveNode() {
      var title = $('#input-title').val()
      var body =  $('.note-editable').html()
      var tags = []

      $(".token-label").each(function() {
          tags.push($(this).html())
      });

      console.log(tags)

      var object = {
        'title': title,
        'body': body,
        'tags': tags,
        'created': + new Date()
      }
      //var url = 'http://127.0.0.1:5984/node'
      var url = 'http://vps272180.ovh.net:5984/node'
      // POST /someUrl
      if (title != '') {
        console.log(title);
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
                  align: 'right'
              }
          })

          $('#input-title').val('')
          $('.note-editable').html('')

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
      else {
        $.notify({
        icon: "warning",
        message: "The title should not be empty"

        },{
            type: type[4],
            timer: 200,
            placement: {
                from: 'top',
                align: 'right'
            }
        })
      }
    }
  },
  mounted(){
    //do something after mounting vue instance

      $('#summernote').summernote();

      $('#tokenfield').tokenfield()

  }
}
</script>
