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

    <div class="container">

      <h2>{{nbrResult}} result for Tag "{{tag}}"</h2>

      <div v-for="node in nodes" class="blog-node">
        <h3><router-link :to="{name: 'node', params: {id: node.id}}" class="item">{{node.value.title}}</router-link></h3>
        <!-- <p>{{date | moment("from", "now")}}</p> -->
        <p>{{node.date | moment("dddd, MMMM Do YYYY") }}</p>
      </div>

      <router-link :to="{name: 'blog'}" class="item">
        <i class="material-icons">back</i>
        <p>< Back to Home</p>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Node',
  data () {
    return {
      nodes: [],
      loading: false,
      tag: '',
      nbrResult: ''
    }
  },
  mounted() {

    this.loading = true
    var id = this.$route.params.id
    this.tag = id

    //this.$node = this.$resource('http://vps272180.ovh.net:5984/node/_design/ayah/_view/nodeByTag?key="' + id + '"')
    this.$node = this.$resource('http://127.0.0.1:5984/node/_design/ayah/_view/nodeByTag?key="' + id + '"')
    console.log(id)

    this.$node.query().then((response)=> {
        this.nodes = response.body.rows
        this.nbrResult = response.body.rows.length

        console.log(response.body.rows)
    }, (response) => {
       console.log('error', response)
    }).then(_ =>{
      this.loading = false
    })
  }
}
</script>
