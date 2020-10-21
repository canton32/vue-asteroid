<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Vue from 'vue'

import { Component } from 'vue-property-decorator'

@Component
class App extends Vue {
  created() {
    
  }
}

export default App
</script>

<style lang="scss"></style>
