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
  computed: {
    ...mapGetters({
      baseUrl: 'baseUrl'
    }),
  },
  methods: {
    ...mapActions(['actionShowNotification']),
    saveNode() {

      let tags = []

      $(".token-label").each(function() {
          tags.push($(this).html())
      });

      let object = {
        'title': $('#input-title').val(),
        'body': $('.note-editable').html(),
        'tags': tags,
        'created': + new Date()
      }

      let url = this.baseUrl + 'node'
      // POST /someUrl
      if (object.title != '') {

        this.$http.post(url, object).then(response => {

          var params = {
            type: 'success',
            message: 'Your node has been created successfuly',
            icon: 'check'
          }
          store.dispatch('actionShowNotification', params)

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
        var params = {
          type: 'danger',
          message: 'The title is required!',
          icon: 'warning'
        }
        store.dispatch('actionShowNotification', params)
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
