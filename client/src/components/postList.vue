<template>
  <div id="postList">
    <div v-if='islogin'>
      <button id='toggleModal' v-on:click='toggleModal()' title="Post Something"><strong>Post Something!</strong></button><br>
      <div v-if='openModal'>
        <div id='backdrop'></div>
        <div id='addPost'>
          <button id='closeModal' v-on:click="toggleModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
          <div id='addPostInput'>
            <input v-model='newtitle' type="text" placeholder="Title">
            <textarea rows=18 v-model='newcontent' placeholder="Content"></textarea>
          </div>
          <button class='modalBtn' v-on:click="toggleModal()">Maybe Later</button>
          <button class='modalBtn' v-on:click="addPost()">Post It Now!</button><br>
        </div>
      </div>
    </div>
    <div class="posts">
      <a href='#/post' v-on:click='list()'><strong>All Posts:</strong></a>
      <router-link v-for='post in posts' :key='post._id' :to="{name: 'postdetail', params: {id:`${post._id}`}}"><br>{{ post.title }}</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'postlist',
  props: ['islogin', 'needreload'],
  data: function () {
    return {
      posts: [{}],
      newtitle: '',
      newcontent: '',
      openModal: false
    }
  },
  methods: {
    list: function () {
      axios({
        method: 'get',
        url: 'http://localhost:3000/articles/'
      })
        .then(data => {
          this.posts = data.data.data
          this.$emit('list', data.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    toggleModal: function () {
      if (this.openModal === true) {
        this.openModal = false
      } else {
        this.openModal = true
      }
    },
    addPost: function () {
      axios({
        method: 'post',
        url: 'http://localhost:3000/articles/',
        data: { title: this.newtitle, content: this.newcontent, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          this.openModal = false
          this.newtitle = ''
          this.newcontent = ''
          this.list()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    this.list()
  },
  watch: {
    needreload: function () {
      if (this.needreload) {
        this.list()
        this.$emit('reloaded')
      }
    }
  }
}
</script>

<style>
  #postList {
    width: 100%
  }
  .posts {
    margin-top: 3vh;
  }
  .posts a {
    color: black;
  }
  .posts a:hover {
    color: #42b983;
  }
  #toggleModal {
    margin-top: 3vh;
    border: none;
    background-color:  #42b983;
    color: white;
    height: 50px;
    width: 100%;
    border-radius: 25px
  }
  #backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(51,51,51,0.8);
    z-index: 2000;
  }
  #addPost {
    position: fixed;
    background-color: white;
    left: 25%;
    top: 15%;
    width: 50%;
    height: 70%;
    z-index: 2001;
  }
  #addPostInput textarea {
    width: 93%;
    margin-top: 1%;
    border: none;
    font-size: 16px;
  }
  #addPostInput input {
    border: none;
    width: 95%;
    margin-top: 1%;
    font-size: 20px;
    padding: 10px;
  }
  #closeModal {
    margin-top: 1%;
    margin-left: 95%;
  }
  .modalBtn {
    height: 50px;
    font-size: 20px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    margin: 20px 10px;
    border-radius: 25px;
  }
</style>
