<template>
  <div class="main-content bg-auth">

    <!-- Header -->
    <div class="header pb-5 pt-lg-8">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <img src="img/icons/auth_logo.svg" alt="logo" width="120">
              <h1 class="text-primary pt-2" ref="mainheader">{{ $t('login.header') }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <slide-y-up-transition mode="out-in" origin="center top">
        <router-view v-on:sectionMounted="changeTitle"></router-view>
      </slide-y-up-transition>
    </div>

    <!-- Footer -->
    <!-- <footer class="py-5">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6">
            <div class="copyright text-center text-xl-left text-muted">
              &copy; {{year}} <a href="#" class="font-weight-bold ml-1"
              target="_blank">Bowhead Health</a>
            </div>
          </div>
          <div class="col-xl-6">
            <ul class="nav nav-footer justify-content-center justify-content-xl-end">
              <li class="nav-item">
                <a href="#" class="nav-link" target="_blank">{{ $t('login.company') }}</a>
              </li>
              <li class="nav-item">
                <a href="" class="nav-link" target="_blank">{{ $t('login.resources') }}</a>
              </li>
              <li class="nav-item">
                <a href="#"
                class="nav-link" target="_blank">{{ $t('login.followUs') }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer> -->
  </div>
</template>
<script>
  import { SlideYUpTransition } from 'vue2-transitions'

  export default {
    name: 'auth-layout',
    components: {
      SlideYUpTransition
    },
    data() {
      return {
        year: new Date().getFullYear(),
        showMenu: false
      }
    },
    methods: {
      changeTitle(title) {
        this.$refs.mainheader.innerText = title;
      }
    },
  }
</script>
<style>
</style>
