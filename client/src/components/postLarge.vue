<template>
  <div id='postLarge'>
    <div class="row mx-auto" v-if='showAll'>
      <div class="col-12 card mb-4" v-for='post in posts' :key='post._id'>
        <div v-if='loggedInUser === post.author._id'>
          <button class='iconBtn' v-on:click='removeModal(post._id)'><i class="fas fa-trash-alt"></i></button>
          <button class='iconBtn' v-on:click='editModal(post._id, post.title, post.content)'><i class="fas fa-edit"></i></button>
        </div>
        <div v-else>
            <div id='cardTopSpace'></div>
        </div>
        <router-link :to="{name: 'postdetail', params: {id:`${post._id}`}}">
          <img class="card-img-top" src="https://via.placeholder.com/700x300">
          <div class="card-body">
            <h5 id='postTitle' class="card-title border-bottom mb-4 pb-2"><strong>{{ post.title }}</strong></h5>
            <p class="card-text pwithindent">{{ post.content  | pSlice  }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <div class='row' v-else>
      <div class="col-12">
        <div v-if='loggedInUser === detailed.authorId'>
          <button class='iconBtn' v-on:click='removeModal(detailed.id, "detailed")'><i class="fas fa-trash-alt"></i></button>
          <button class='iconBtn' v-on:click='editModal(detailed.id, detailed.title, detailed.content, "detailed")'><i class="fas fa-edit"></i></button>
        </div>
        <div v-else>
            <div id='cardTopSpace'></div>
        </div>
        <img id='detailImg' src="https://via.placeholder.com/700x300">
        <div class="mx-auto mt-4">
          <br><h3 class="my-2 border-bottom pb-2">{{ detailed.title }}</h3>
          <h5 class="my-2">by {{ detailed.author }}</h5>
          <h6 id='detloc' class="my-2" v-if='detailed.location'>in <strong><span id="detlocbold" v-on:click='gSearch()'>{{ detailed.location }}</span></strong></h6><br><br>
          <p class="my-2 pwithindent">{{ detailed.content }}</p>
          <div id='commentbox' v-if='islogin'>
            <h5><strong>Add your comment here</strong></h5>
            <textarea rows=2 v-model='newcomment' placeholder="Write some words"></textarea>
            <button v-on:click='addComment()'>Add comment</button>
          </div>
          <div class='border-bottom' id='comments' v-if='detailed.comments.length > 0'>
            <h5><strong>Comments</strong></h5>
            <div v-for="comment in detailed.comments" :key='comment._id' class="border-top pt-2">
              <button class="iconBtn" v-if='loggedInUser === comment.commenter._id' v-on:click='removeCommentModal(comment._id)'><i class="fas fa-trash-alt"></i></button>
              <h6><strong>{{ comment.commenter.name }}</strong> commented on {{ comment.createdAt | dateSlice }}</h6>
              <p id='comment'>{{ comment.words }}</p>
            </div>
          </div>
          <div v-else id='nocomment'>
            <h5>There's no comment on this post yet</h5>
          </div>
        </div>
      </div>
    </div>

    <div v-if='openEdit'>
      <div id='backdrop'></div>
      <div id='editPost'>
        <button class="iconBtn closeModal" v-on:click="editModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <div id='editPostInput'>
          <input v-model='newtitle' type="text" placeholder="Title">
          <textarea rows=19 v-model='newcontent' placeholder="Content"></textarea>
        </div>
        <button class='modalBtn' v-on:click="editModal()">Cancel Edit</button>
        <button class='modalBtn' v-on:click="editPost()">Commit Edit</button><br>
      </div>
    </div>

    <div v-if='openRemove'>
      <div id='backdrop'></div>
      <div class='removeConfirmation'>
        <button class="iconBtn closeModal" v-on:click="removeModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <h3>Are you sure?</h3>
        <h5>You're about to delete the post permanently</h5>
        <button class='modalBtn' v-on:click="removeModal()">Nope</button>
        <button class='modalBtn' v-on:click="removePost()">Yeah</button><br>
      </div>
    </div>

    <div v-if='openRemoveComment'>
      <div id='backdrop'></div>
      <div class='removeConfirmation'>
        <button class="iconBtn closeModal" v-on:click="removeCommentModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <h3>Are you sure?</h3>
        <h5>You're about to delete the comment permanently</h5>
        <button class='modalBtn' v-on:click="removeCommentModal()">Nope</button>
        <button class='modalBtn' v-on:click="removeComment()">Yeah</button><br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'postlarge',
  props: ['posts', 'islogin'],
  data: function () {
    return {
      showAll: true,
      detailed: {},
      loggedInUser: localStorage.getItem('userId'),
      openEdit: false,
      openRemove: false,
      newtitle: '',
      newcontent: '',
      editId: '',
      removeId: '',
      newcomment: '',
      openRemoveComment: false,
      removeCommentId: '',
      detailedUD: false,
      justReloaded: true,
      afterEditFromDetailed: false
    }
  },
  methods: {
    showOne: function (id) {
      if (id !== undefined) {
        axios({
          method: 'get',
          url: `http://blog-server.ismailnagib.xyz/articles/${id}`
        })
          .then(data => {
            this.detailed = {
              id: id,
              title: data.data.data.title,
              author: data.data.data.author.name,
              authorId: data.data.data.author._id,
              location: data.data.data.location,
              content: data.data.data.content,
              comments: data.data.data.comments
            }
            this.showAll = false
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.showAll = true
      }
    },
    editModal: function (id, title, content, from) {
      if (this.openEdit) {
        this.openEdit = false
      } else {
        this.openEdit = true
      }
      if (id && title && content) {
        this.editId = id
        this.newtitle = title
        this.newcontent = content
      }
      if (from === 'detailed') {
        this.detailedUD = true
      } else {
        this.detailedUD = false
      }
    },
    editPost: function () {
      axios({
        method: 'put',
        url: 'http://blog-server.ismailnagib.xyz/articles/',
        data: { id: this.editId, token: localStorage.getItem('jwtToken'), title: this.newtitle, content: this.newcontent }
      })
        .then(data => {
          if (this.detailedUD) {
            this.afterEditFromDetailed = true
            this.showOne(this.detailed.id)
            this.$emit('leftreload')
          } else {
            this.$emit('reload')
          }
          this.openEdit = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeModal: function (id, from) {
      if (this.openRemove) {
        this.openRemove = false
      } else {
        this.openRemove = true
      }
      if (id) {
        this.removeId = id
      }
      if (from === 'detailed') {
        this.detailedUD = true
      } else {
        this.detailedUD = false
      }
    },
    removePost: function () {
      axios({
        method: 'delete',
        url: 'http://blog-server.ismailnagib.xyz/articles/',
        data: { id: this.removeId, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          if (this.detailedUD) {
            this.$emit('reload')
            this.$router.push({ path: '/post' })
          } else {
            this.$emit('reload')
          }
          this.openRemove = false
        })
        .catch(err => {
          console.log(err)
        })
    },
    addComment: function () {
      axios({
        method: 'post',
        url: 'http://blog-server.ismailnagib.xyz/comments/',
        data: { postId: this.detailed.id, words: this.newcomment, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          this.newcomment = ''
          this.showOne(this.detailed.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    removeCommentModal: function (id) {
      if (this.openRemoveComment) {
        this.openRemoveComment = false
      } else {
        this.openRemoveComment = true
      }
      if (id) {
        this.removeCommentId = id
      }
    },
    removeComment: function () {
      axios({
        method: 'delete',
        url: 'http://blog-server.ismailnagib.xyz/comments/',
        data: { id: this.removeCommentId, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          this.openRemoveComment = false
          this.showOne(this.detailed.id)
        })
        .catch(err => {
          console.log(err)
        })
    },
    gSearch: function () {
      window.open(`https://www.google.com/search?q=${this.detailed.location}`)
    }
  },
  filters: {
    pSlice (value) {
      if (value.length > 280) {
        if (value[279] === ' ') {
          return value.slice(0, 280) + '. . .'
        } else {
          return value.slice(0, 280) + ' . . .'
        }
      } else {
        return value
      }
    },
    dateSlice (value) {
      return value.slice(0, 10)
    }
  },
  watch: {
    '$route': function () {
      this.showOne(this.$route.params.id)
    },
    islogin: function () {
      this.loggedInUser = localStorage.getItem('userId')
    },
    posts: function () {
      if (!this.justReloaded && !this.afterEditFromDetailed) {
        this.$router.push({ path: '/post' })
      } else {
        this.justReloaded = false
        this.afterEditFromDetailed = false
      }
    }
  },
  created () {
    if (this.$route.params.id && this.justReloaded) {
      this.showOne(this.$route.params.id)
    }
  }
}
</script>

<style>
  #detailImg {
    width: 100%
  }
  #detloc {
    cursor: pointer;
  }
  #detlocbold:hover {
    color: #42b983;
  }
  #postLarge p {
    word-wrap: break-word;
    text-align: justify;
  }
  .pwithindent {
    text-indent: 10%;
  }
  #postLarge a {
    text-decoration: none;
    color: black;
  }
  #postLarge #postTitle:hover {
    color: #42b983
  }
  #backdrop {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(51,51,51,0.8);
    z-index: 2100;
  }
  #editPost {
    position: fixed;
    background-color: white;
    left: 25%;
    top: 15%;
    width: 50%;
    height: 70%;
    z-index: 2101;
  }
  #editPostInput textarea {
    width: 90%;
    margin-top: 1%;
    border: none;
    font-size: 16px;
  }
  #editPostInput input {
    border: none;
    width: 90%;
    margin-top: 1%;
    font-size: 20px;
    padding: 10px;
  }
  .removeConfirmation {
    position: fixed;
    background-color: white;
    left: 25%;
    top: 37.5%;
    width: 50%;
    height: 20%;
    z-index: 2101;
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
  #comments {
    text-align: justify;
  }
  #comment {
    margin: 10px 0;
    font-size: 18px;
  }
  #commentbox {
    margin-top: 3vh;
  }
  #commentbox h5 {
    text-align: left;
    margin-left: 10px;
  }
  #commentbox h5:hover {
    color: #42b983
  }
  #commentbox textarea{
    width: 99%;
    margin: 1%;
    font-size: 14px;
    padding: 10px;
  }
  #nocomment, #comments {
    margin-top: 3vh;
    margin-bottom: 6vh;
  }
  #cardTopSpace {
    height: 40px;
  }
</style>
