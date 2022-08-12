<template>
  <the-navigation></the-navigation>
  <main>
    <router-view />
  </main>
</template>

<script>
import TheNavigation from './components/TheNavigation.vue'

export default {
  name: 'App',
  components: {
    TheNavigation
  }
}
</script>

<style>

</style>
