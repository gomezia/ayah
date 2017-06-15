<template>
    <div class="container ">

      <div class="card">
          <div class="card-header" data-background-color="purple">
              <h4 class="title">Content</h4>
              <p class="category">Here is a subtitle for this table</p>
          </div>
          <div class="card-content table-responsive">
      <table class="table"><tbody><tr><td><div class="checkbox"><label><input name="optionsCheckboxes" checked="checked" type="checkbox"><span class="checkbox-material"><span class="check"></span></span></label></div></td> <td>Sign contract for "What are conference organizers afraid of?"</td> <td class="td-actions text-right"><button type="button" rel="tooltip" title="" data-original-title="Edit Task" class="btn btn-primary btn-simple btn-xs"><i class="material-icons">edit</i> <div class="ripple-container"></div></button> <button type="button" rel="tooltip" title="" data-original-title="Remove" class="btn btn-danger btn-simple btn-xs"><i class="material-icons">close</i> <div class="ripple-container"></div></button></td></tr> <tr><td><div class="checkbox"><label><input name="optionsCheckboxes" type="checkbox"><span class="checkbox-material"><span class="check"></span></span></label></div></td> <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td> <td class="td-actions text-right"><button type="button" rel="tooltip" title="" data-original-title="Edit Task" class="btn btn-primary btn-simple btn-xs"><i class="material-icons">edit</i></button> <button type="button" rel="tooltip" title="" data-original-title="Remove" class="btn btn-danger btn-simple btn-xs"><i class="material-icons">close</i></button></td></tr> <tr><td><div class="checkbox"><label><input name="optionsCheckboxes" type="checkbox"><span class="checkbox-material"><span class="check"></span></span></label></div></td> <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
  														</td> <td class="td-actions text-right"><button type="button" rel="tooltip" title="" data-original-title="Edit Task" class="btn btn-primary btn-simple btn-xs"><i class="material-icons">edit</i></button> <button type="button" rel="tooltip" title="" data-original-title="Remove" class="btn btn-danger btn-simple btn-xs"><i class="material-icons">close</i></button></td></tr> <tr><td><div class="checkbox"><label><input name="optionsCheckboxes" checked="checked" type="checkbox"><span class="checkbox-material"><span class="check"></span></span></label></div></td> <td>Create 4 Invisible User Experiences you Never Knew About</td> <td class="td-actions text-right"><button type="button" rel="tooltip" title="" data-original-title="Edit Task" class="btn btn-primary btn-simple btn-xs"><i class="material-icons">edit</i></button> <button type="button" rel="tooltip" title="" data-original-title="Remove" class="btn btn-danger btn-simple btn-xs"><i class="material-icons">close</i></button></td></tr></tbody></table>
                            </div>
                        </div>
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
