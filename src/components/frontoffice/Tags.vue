<template>
  <div>
    <h2>Tags</h2>
    <div class="card">
      <div class="card-content">
				<p v-for="tag in allTags"><router-link :to="{name: 'tag', params: {id: tag.key}}" class="item">{{tag.key}} ({{tag.value}})</router-link></p>
			</div>
    </div>
  </div>
</template>

<script>
  import Vuex from 'vuex'
  import store from '../../store/Store'
  import {mapActions} from 'vuex'
  import {mapGetters} from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        baseUrl: 'baseUrl',
        allTags: 'allTags'
      }),
    },
    methods: {
      ...mapActions(['actionLoadTags'])
    },
    mounted() {
      store.dispatch('actionLoadTags')
    }
  }
</script>
