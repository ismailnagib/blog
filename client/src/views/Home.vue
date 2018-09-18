<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="Welcome to My Blog App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>

<style>
  .home {
    margin-top: 10vh;
  }

  img:hover {
    color: #42b983;
  }
</style>
