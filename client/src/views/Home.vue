<template>
  <div class="home">
    <img src="../assets/logo.png">
    <h2 id='welcome'>Welcome to My Blog App</h2>
    <h4>made with <a href='https://vuejs.org/' id='vue' target='_blank'>Vue.js</a></h4>
    <div id='ghlink'><a href='https://github.com/ismailnagib' target="_blank"><i class="fab fa-github"></i></a></div>
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
    margin-top: 15vh;
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
  #ghlink {
    margin-top: 5vh;
    font-size: 40px;
  }
  .fa-github {
    color: black;
  }
  .fa-github:hover {
    color: #42b983;
  }
</style>
