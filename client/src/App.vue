<template>
  <div id="app">
    <div id='header' class="row border-bottom mb-4 fixed-top">
      <nav id='nav' class="navbar navbar-expand-lg navbar-light bg-white col-12 col-md-3">
        <div class="container-fluid pl-4">
          <button class="navbar-toggler mx-auto" type="button" data-toggle="collapse" data-target="#theNavbar">
              <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="theNavbar">
            <ul class="navbar-nav mx-auto" style="font-size: 20px">
              <li class="nav-item mx-2">
                <router-link to="/">Home</router-link>
              </li>
              <li class="nav-item mx-2">
                <router-link to="/post">Posts</router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <loginform id='loginform' class="col-12 col-md-9" @log='logChange'></loginform>
    </div>
    <router-view v-bind:islogin='islogin'></router-view>
  </div>
</template>

<script>
import loginform from '@/components/loginForm.vue'

export default {
  name: 'app',
  data: function () {
    return {
      islogin: false
    }
  },
  components: {
    loginform
  },
  methods: {
    logChange: function (value) {
      this.islogin = value
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#header {
  height: 9vh;
  background-color: white;
}
#loginform {
  text-align: right;
  right: 3%;
}
button {
  border: none;
  background-color: white;
  color: #42b983;
  cursor: pointer;
  height: 40px;
  padding: 10px 20px;
  border-radius: 20px;
}
button:hover {
  background-color:#42b983;
  color: white;
}
textarea:focus, input:focus, button:focus {
  outline: none;
}
.unselectable {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
