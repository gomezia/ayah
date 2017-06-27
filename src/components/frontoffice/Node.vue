<template>
  <div class="wrapper blog">
  <nav class="navbar navbar-ayah" role="navigation">
  	<div class="container-fluid">
      	<div class="navbar-header">
      		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
      		</button>
      		<router-link :to="{name: 'blog'}" id="logo"><img src="/logo-ayah.png"><span>Ayah</span></router-link>
      	</div>

      	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      		<ul class="nav navbar-nav pull-right">
            <li>
              <router-link :to="{name: 'dashboard'}" class="item">
                <i class="material-icons">dashboard</i>
                Dashboard
              </router-link>
            </li>
      		</ul>
      	</div>
  	</div>
  </nav>
    <div class="container">
      <div class="loadersmall" v-if="loading"></div>
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-md-9"><h1>{{node.title}}</h1></div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm-8 col-md-9">
            <p><i class="material-icons time-icon">access_time</i> <span class="text-time">{{node.created | moment("dddd, MMMM Do YYYY") }}</span></p>
            <p<img v-if="node.image != ''" :src="node.image.data" alt="" class="img-responsive"></p>
            <p v-html="node.body"></p>
          </div>
          <div class="col-xs-12 col-sm-4 col-md-3">
            <!-- Tags -->
            <div v-if="hasTags">
              <p>Tags:</p>
              <ul class="list-inline">
                <li v-for="tag in node.tags">
                  <i class="material-icons time-icon">label_outline</i><span class="text-time"><router-link :to="{name: 'tag', params: {id: tag}}" class="item">{{tag}}</router-link></span></li>
              </ul>
            </div>
            <router-link :to="{name: 'blog'}" class="item"><i class="material-icons">back</i><p>< Back to Home</p></router-link>
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

  name: 'Node',
  data () {
    return {
      node: {},
      loading: false,
      hasTags: false,
    }
  },
  computed: {
    ...mapGetters({
      baseUrl: 'baseUrl'
    })
  },
  watch: {
    // call again the method if the route changes
    '$route': 'loadNode'
  },
  methods: {
    loadNode() {

      this.loading = true
      var id = this.$route.params.id
      this.$node = this.$resource(store.getters.baseUrl + '/node/' + id)

      this.$node.query().then((response)=> {
          this.node = response.body
          if (response.body.tags.length > 0) {
            this.hasTags = true
          }
          console.log(this.node)
      }, (response) => {
         console.log('error', response)
      }).then(_ =>{
        this.loading = false
      })
    }
  },
  mounted() {
    this.loadNode()
  }
}
</script>
