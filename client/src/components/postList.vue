<template>
  <div>
    <div id='searchbar' class="row my-2">
      <div id=searchIcon><i class="fas fa-search"></i></div>
      <input id='search' v-model="keyword" v-on:keyup='searchPost()' type="text" placeholder="Search the blog" onfocus='this.placeholder=""' onblur='this.placeholder="Search the blog"'>
    </div>
    <div class="row my-2">
      <div id="postList">
        <div v-if='islogin'>
          <button id='toggleModal' v-on:click='toggleModal()' title="Post Something"><strong>Post Something!</strong></button><br>
          <div v-if='openModal'>
            <div id='backdrop'></div>
            <div id='addPost'>
              <button class='iconBtn closeModal' v-on:click="toggleModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
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
          <a href='#/post' v-on:click='list()'><h3 class="border-bottom border-top py-3"><strong>All Posts</strong></h3></a>
          <router-link v-for='post in posts' :key='post._id' :to="{name: 'postdetail', params: {id:`${post._id}`}}"><br>{{ post.title }}</router-link>
        </div>
      </div>
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
      keyword: '',
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
    },
    searchPost: function () {
      if (this.keyword.length > 0) {
        axios({
          method: 'post',
          url: 'http://localhost:3000/articles/search',
          data: { keyword: this.keyword }
        })
          .then(data => {
            this.posts = data.data.data
            this.$emit('list', data.data.data)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.list()
      }
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
  #searchIcon {
    height: 40px;
    width: 10%;
    text-align: center;
    font-size: 20px;
  }
  .fa-search {
    padding: 10px 9px;
    color: #42b983;
  }
  #search {
    width: 90%;
    background-color: rgba(211,211,211,0.3);
    font-size: 20px;
    height: 40px;
    border: none;
    border-radius: 20px;
    padding: 10px 25px;
    font-weight: bold;
  }
  #search:focus {
    box-shadow: 0 0 5px rgba(66, 185, 131, 0.8);
    background-color: white;
  }
  #searchbar {
    margin-bottom: 1vh;
  }
  #postList {
    width: 100%
  }
  .posts {
    margin-top: 2vh;
  }
  .posts a {
    color: black;
    text-decoration: none;
  }
  .posts a:hover {
    color: #42b983;
  }
  #toggleModal {
    margin: 1vh 0;
    border: none;
    background-color: #42b983;
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
