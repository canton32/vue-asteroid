<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Asteroids',
            path: '/home',
            icon: 'ni ni-planet text-blue',
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'User Profile',
            path: '/profile',
            icon: 'ni ni-single-02 text-yellow',
          }"
        >
        </sidebar-item>
      </template>
    </side-bar>
    <div class="main-content">
      <template v-if="!error">
        <home-navbar :type="$route.meta.navbarType"></home-navbar>

        <div @click="$sidebar.displaySidebar(false)">
          <fade-transition :duration="200" origin="center top" mode="out-in">
            <router-view></router-view>
          </fade-transition>
        </div>
      </template>

      <b-alert :show="error != null" variant="danger" dismissible>
        <h4 class="alert-heading">Ooops!</h4>
        <p>
          Something went wrong.
        </p>
        <hr />
        <p class="mb-0">
          {{ error }}
        </p>
      </b-alert>
    </div>

    <div v-show="loading" class="overlay">
      <b-overlay :show="loading" no-wrap> </b-overlay>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { State } from 'vuex-class'
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`)
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className)
    }, 100)
  }
}

import HomeNavbar from './HomeNavbar'
import { FadeTransition } from 'vue2-transitions'

@Component({
  components: {
    HomeNavbar,
    FadeTransition,
  },
})
export default class HomeLayout extends Vue {
  @State((state) => state.data.loading) loading
  @State((state) => state.data.error) error

  initScrollbar() {
    let isWindows = navigator.platform.startsWith('Win')
    if (isWindows) {
      initScrollbar('sidenav')
    }
  }
  mounted() {
    this.initScrollbar()
  }
}
</script>
<style lang="css">
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(255, 255, 255, 0.5);
  z-index: 999;
}
</style>
