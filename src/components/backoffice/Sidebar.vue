<template>
  <div class="sidebar-wrapper">
    <ul class="nav">
      <li>
        <router-link :to="{name: 'dashboard'}" class="item">
          <i class="material-icons">dashboard</i>
          <p>Add content</p>
        </router-link>
      </li>
      <li>
        <router-link :to="{name: 'content'}" class="item">
          <i class="material-icons">list</i>
          <p>List/Edit Content</p>
        </router-link>
      </li>
      <li>
          <router-link :to="{name: 'blog'}" class="item">
            <i class="material-icons">home</i>
            <p>Back to Blog</p>
          </router-link>
      </li>
     </ul>
  </div>

</template>

<script>
export default {
  name: 'Sidebar',
}
</script>
