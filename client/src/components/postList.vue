<template>
  <div id="postList">
    <div v-if='islogin'>
      <button id='tAPM' v-on:click="toggleAddPostModal()"><strong>Post Something!</strong></button><br>
    </div>
    <div class="posts ml-4">
      <a href='#/post' v-on:click="list()"><strong>All Posts:</strong></a>
      <h6 v-for='post in posts' :key='post._id' v-on:click="detail(post.title, post.content)">{{ post.title }}</h6>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'postlist',
  props: ['islogin'],
  data: function () {
    return {
      posts: [{}]
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
    detail: function (title, content) {
      let selected = [title, content]
      this.$emit('detail', selected)
    }
  },
  created () {
    this.list()
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
  a {
    color: black;
  }
  a:hover {
    color: #42b983;
  }
  h6 {
    cursor: pointer;
  }
  h6:hover {
    color: #42b983;
  }
  #tAPM {
    margin-top: 3vh; 
    border: none;
    background-color:  #42b983;
    color: white;
    height: 50px;
    width: 100%;
    border-radius: 25px
  }
</style>
