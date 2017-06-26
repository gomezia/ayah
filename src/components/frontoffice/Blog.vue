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
      <router-view></router-view>
      <div class="loadersmall" v-if="loading"></div>
    </div>
      <!-- jumbotron -->
      <div class="jumbotron">
        <div class="container">
          <h1>Hello Ayah</h1>
          <p>Lightweight CMS made with Vuejs, CouchDB and Bootstrap</p>
        </div>
      </div>


    <div class="container">
      <div class="row">
        <div class="col-xs-9">
          <div class="row">

            <div class="ui divided items">
              <div class="item" v-for="node in nodes" v-if="node.title">
                <div class="image">
                  <router-link :to="{name: 'node', params: {id: node._id}}">
                    <img :src="node.image.data" class="img-responsive">
                  </router-link>
                </div>
                <div class="content">
                  <router-link :to="{name: 'node', params: {id: node._id}}" class="header">{{node.title}}</router-link>
                  <div class="meta">
                    <span class="cinema">{{node.date | moment("dddd, MMMM Do YYYY") }}</span>
                  </div>
                  <div class="description">
                    <p></p>
                  </div>
                  <div class="extra">
                    <div v-for="tag in node.tags" class="ui label">
                      {{tag}}
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div class="col-xs-12 col-md-3">
          <Tags></Tags>
          <Meteo></Meteo>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store/Store'
import {mapActions} from 'vuex'
import {mapGetters} from 'vuex'
import Tags from './Tags.vue'
import Meteo from './Meteo.vue'

export default {
  name: 'Blog',
  store: store,
  components: {
    Tags, Meteo
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters({
      nodes: 'getNodes'
    }),
    date2: _=> + new Date()
  },
  methods: {
    ...mapActions(['actionLoadNodes']),
  },
  mounted() {
    this.loading = true
    store.dispatch('actionLoadNodes')
    this.loading = false
  }
}
</script>
