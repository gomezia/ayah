<template>
  <div class="wrapper">
    <div class="sidebar" data-color="purple" data-image="/src/assets/img/sidebar-1.jpg">
      <div class="logo">
        <a href="http://www.creative-tim.com" class="simple-text">
          Ayah
        </a>
      </div>

      <Sidebar></sidebar>

    </div>
    <div class="main-panel">
        <SidebarMenu></SidebarMenu>
        <div class="content">
          <router-view></router-view>
          <AddNode></AddNode>
        </div>
    </div>
  </div>
</template>

<script>
import SidebarMenu from './SidebarMenu.vue'
import AddNode from './AddNode.vue'
// Main Menu
import Sidebar from './Sidebar.vue'

export default {
  name: 'Dashboard',
  components: {
    SidebarMenu, AddNode, Sidebar
  }
}
</script>
