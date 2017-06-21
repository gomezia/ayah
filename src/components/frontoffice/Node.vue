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
      		<a class="navbar-brand" href="#">Ayah</a>
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

      <div class="loadersmall" v-if="loading"></div>
        <h1>{{node.title}}</h1>
        <p>{{node.created | moment("dddd, MMMM Do YYYY") }}</p>
        <p v-html="node.body"></p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Node',
  data () {
    return {
      node: {},
      loading: false
    }
  },
  mounted() {
    this.loading = true
    var id = this.$route.params.id
    this.$node = this.$resource('http://vps272180.ovh.net:5984/node/' + id)
    console.log(id)

    this.$node.query().then((response)=> {
        this.node = response.body
        console.log(this.node)
    }, (response) => {
       console.log('error', response)
    }).then(_ =>{
      this.loading = false
    })
  }
}
</script>
