<template>
  <div class="wrapper blog">
  <nav class="navbar navbar-ayah navbar-fixed-top" role="navigation">
  	<div class="container-fluid">
      	<div class="navbar-header">
      		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
      		</button>
      		<a class="navbar-brand" href="#">Ayah</a>
      	</div>

      	<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      		<ul class="nav navbar-nav">
  				<li class="active"><a href="#">Link</a></li>
          		<li><a href="#">Link</a></li>
          		<li class="dropdown">
          			<a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
          			<ul class="dropdown-menu">
      					  <li><a href="#">Action</a></li>
      					  <li><a href="#">Another action</a></li>
      					  <li><a href="#">Something else here</a></li>
      					  <li class="divider"></li>
      					  <li><a href="#">Separated link</a></li>
      					  <li class="divider"></li>
  				        <li><a href="#">One more separated link</a></li>
          			</ul>
          		</li>
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

      <div class="loadersmall" v-if="loading"></div>

      <div v-for="node in nodes">
        <h2>{{node.title}}</h2>
        <!-- <p>{{date | moment("from", "now")}}</p> -->
        <p>{{node.date | moment("dddd, MMMM Do YYYY") }}</p>

        <p v-html="node.body"></p>
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
  }
}
</script>
