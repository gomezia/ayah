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
      		<a class="navbar-brand" href="#">AYAH</a>
      	</div>

      	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      		<ul class="nav navbar-nav pull-right">
            <li>
              <router-link :to="{name: 'dashboard'}" class="item">
                <i class="material-icons">dashboard</i>
                Back to dashboard
              </router-link>
            </li>
      		</ul>
      	</div>
  	</div>
  </nav>
    <div class="container">
      <router-view></router-view>
      <div class="loadersmall" v-if="loading"></div>

      <div v-for="node in nodes">
        <h2><router-link :to="{name: 'node', params: {id: node._id}}" class="item">{{node.title}}</router-link></h2>
        <!-- <p>{{date | moment("from", "now")}}</p> -->
        <p>{{node.date | moment("dddd, MMMM Do YYYY") }}</p>
      </div>
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
  data() {
    return {
      loading: false,
      date: 1481889223
    }
  },
  computed: {
    ...mapGetters({
      nodes: 'getNodes',
    }),
    date2: _=> + new Date()
  },
  methods: {
    ...mapActions(['actionLoadNodes']),
  },
  mounted() {
    this.loading = true
    this.actionLoadNodes()
    this.loading = false
  }
}
</script>
