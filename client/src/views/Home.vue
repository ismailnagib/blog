<template>
  <div class="home">
    <img src="../assets/logo.png">
    <h2 id='welcome'>Welcome to My Blog App</h2>
    <h4>made with <a href='https://vuejs.org/' id='vue' target='_blank'>Vue.js</a></h4>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home'
}
</script>

<style>
  .home {
    margin-top: 20vh;
  }
  #welcome {
    margin-top: 10vh;
  }
  #vue {
    text-decoration: none;
    color: black;
  }
  #vue:hover {
    color: #42b983;
  }
</style>
