<template>
  <div id='loginform'>
    <button v-if='islogin' class="logBtn" id='logOutBtn' v-on:click='logout()'><strong>Log Out</strong></button>
    <div v-else class='my-auto'>
      <span v-if='isregistering'><input class='mx-2 logInput' v-model='name' type="text" placeholder="Name">|</span>
      <input class='mx-2 logInput' v-model='email' type="email" placeholder="Email">|
      <input class='mx-2 logInput' v-model='password' type="password" placeholder="Password">|
      <button class='logBtn' v-on:click='login()' v-bind:style="{color: loginColor}"><strong>Log In</strong></button> |
      <button class='logBtn' v-on:click='register()' v-bind:style="{color: registerColor}"><strong>Register</strong></button>
      <div class='unselectable' v-bind:style="{color: noticeColor}" id='notice'>{{ notice }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'loginform',
  data: function () {
    return {
      name: '',
      email: '',
      password: '',
      notice: 'placeholder',
      noticeColor: 'white',
      islogin: false,
      isregistering: false,
      loginColor: '#42b983',
      registerColor: 'black'
    }
  },
  methods: {
    login: function () {
      if (this.isregistering) {
        this.isregistering = false
        this.noticeColor = 'white'
        this.notice = 'placeholder'
        this.loginColor = '#42b983'
        this.registerColor = 'black'
      } else {
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/login',
          data: { email: this.email, password: this.password }
        })
          .then(data => {
            localStorage.setItem('jwtToken', data.data.token)
            localStorage.setItem('userId', data.data.userId)
            this.islogin = true
            this.noticeColor = 'white'
            this.notice = 'placeholder'
            this.email = ''
            this.password = ''
            this.$emit('log', this.islogin)
          })
          .catch(err => {
            this.notice = err.response.data.message
            this.noticeColor = 'red'
          })
      }
    },
    checklogin: function () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/checklogin',
        data: { token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          if (data.data.isLogin) {
            this.islogin = true
          } else {
            this.islogin = false
          }
          this.$emit('log', this.islogin)
        })
        .catch(err => {
          this.islogin = false
          localStorage.clear()
          console.log(err)
        })
    },
    logout: function () {
      localStorage.clear()
      this.islogin = false
      this.$emit('log', this.islogin)
    },
    register: function () {
      if (this.isregistering) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/users/register',
          data: { name: this.name, email: this.email, password: this.password }
        })
          .then(data => {
            this.notice = "Registration successful. You can enjoy the the web's full feature now by logging in."
            this.noticeColor = 'green'
            this.isregistering = false
            this.loginColor = '#42b983'
            this.registerColor = 'black'
          })
          .catch(err => {
            this.notice = err.response.data.message
            this.noticeColor = 'red'
          })
      } else {
        this.isregistering = true
        this.noticeColor = 'white'
        this.notice = 'placeholder'
        this.loginColor = 'black'
        this.registerColor = '#42b983'
      }
    }
  },
  created () {
    if (localStorage.getItem('jwtToken')) {
      this.checklogin()
    }
  }
}
</script>

<style>
  #loginform {
    margin-top: 10px;
  }
  .logInput {
    padding: 5px;
    border: none;
  }
  .logBtn {
    border-radius: 0;
    padding: 3px 15px;
    margin: 0px 5px;
  }
  .logBtn:hover {
    background-color: rgba(211,211,211,0.3);
  }
  #logOutBtn:hover {
    color:#42b983;
  }
</style>
