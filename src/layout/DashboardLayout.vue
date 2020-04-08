<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="BRD"
      title="BRD"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'fas fa-ellipsis-h fa-3x',
            path: '/dashboard'
          }"
        />
        <!-- Temporary commented -->
        <!-- <sidebar-item :link="{name: 'Research Dashboard', icon: 'ni ni-planet text-blue', path: '/researchers-enroll-request'}"/>
        <sidebar-item :link="{name: 'Research Dashboard', icon: 'ni ni-single-02 text-yellow', path: '/create-study'}"/>
        <sidebar-item :link="{name: 'Research Dashboard', icon: 'ni ni-key-25 text-info', path: '/login'}"/>
        <sidebar-item :link="{name: 'Research Dashboard', icon: 'ni ni-circle-08 text-pink', path: '/register'}"/> -->

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
