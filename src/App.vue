<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>

import './assets/css/app.css'

import './assets/js/app-admin.js'
export default {
  name: 'App'
}
</script>
