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
                <textarea rows=17 v-model='newcontent' placeholder="Content"></textarea>
                <div class='userloc' id='locnotadded' v-if='!shareLoc'>
                  <h5>We've detected that you're writing this from</h5>
                  <h4>{{ userLoc }}</h4>
                  <button id='userLocBtn' v-on:click='shareLocToggle()'>Share that as my location in the post</button>
                </div>
                <div class='userloc' v-else>
                  <i class="fas fa-check-circle"></i>
                  <h4>{{ userLoc }}</h4>
                  <h5>will be shared as your location in the post</h5>
                  <button id='userLocBtn' v-on:click='shareLocToggle()'>Cancel location sharing</button>
                </div>
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
  props: ['islogin', 'needreload', 'needleftreload'],
  data: function () {
    return {
      keyword: '',
      posts: [{}],
      newtitle: '',
      newcontent: '',
      openModal: false,
      userLoc: '',
      shareLoc: false
    }
  },
  methods: {
    list: function () {
      axios({
        method: 'get',
        url: 'http://blog-server.ismailnagib.xyz/articles/'
      })
        .then(data => {
          this.posts = data.data.data
          if (this.needleftreload === false) {
            this.$emit('list', data.data.data)
          }
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
      if (!this.shareLoc) {
        this.userLoc = ''
      }
      axios({
        method: 'post',
        url: 'http://blog-server.ismailnagib.xyz/articles/',
        data: { title: this.newtitle, content: this.newcontent, loc: this.userLoc, token: localStorage.getItem('jwtToken') }
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
          url: 'http://blog-server.ismailnagib.xyz/articles/search',
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
    },
    detectLoc: function () {
      axios({
        method: 'get',
        url: 'http://ip-api.com/json'
      })
        .then(data => {
          this.userLoc = `${data.data.city}, ${data.data.country}`
        })
        .catch(err => {
          console.log(err)
        })
    },
    shareLocToggle: function () {
      if (this.shareLoc) {
        this.shareLoc = false
      } else {
        this.shareLoc = true
      }
    }
  },
  created () {
    this.list()
    this.detectLoc()
  },
  watch: {
    needreload: function () {
      if (this.needreload) {
        this.list()
        this.$emit('reloaded')
      }
    },
    needleftreload: function () {
      if (this.needleftreload) {
        this.list()
        this.$emit('leftreloaded')
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
    top: 7.5%;
    width: 50%;
    height: 85%;
    z-index: 2001;
  }
  #addPostInput textarea {
    width: 90%;
    margin-top: 1%;
    border: none;
    font-size: 16px;
  }
  #addPostInput input {
    border: none;
    width: 90%;
    margin-top: 1%;
    font-size: 20px;
    padding: 10px;
  }
  .userloc {
    margin: 2% 0px 0.5% 0px;
    padding: 2% 0px 1% 0px;
    background-color: rgba(211,211,211,0.2);
  }
  #locnotadded {
    padding: 5% 0px 2.1% 0px;
  }
  .fa-check-circle {
    color: #42b983;
    font-size: 30px;
    margin-bottom: 1%;
  }
  #userLocBtn {
    border-radius: 0;
    padding: 3px 15px;
    background-color: transparent;
  }
  #userLocBtn:hover {
    background-color: white;
    color: #42b983;
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
