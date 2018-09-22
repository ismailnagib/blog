<template>
  <div id='loginform'>
    <button v-if='islogin' v-on:click='logout()'><strong>Log Out</strong></button>
    <div v-else class='my-auto'>
      <input class='mx-2' v-model='email' type="email" placeholder="Email">
      <input class='mx-2' v-model='password' type="password" placeholder="Password">
      <button v-on:click='login()'><strong>Log In</strong></button>
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
      email: '',
      password: '',
      notice: 'placeholder',
      noticeColor: 'white',
      islogin: false
    }
  },
  methods: {
    login: function () {
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
</style>
