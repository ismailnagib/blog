<template>
  <div id='postLarge'>
    <div class="row mx-auto" v-if='showAll'>
      <div class="col-12 card mb-4" v-for='post in posts' :key='post._id'>
        <div class="cardBtn" v-if='isAuthor'>
          <button v-on:click='removeModal(post._id)'><i class="fas fa-trash-alt"></i></button>
          <button v-on:click='editModal(post._id, post.title, post.content)'><i class="fas fa-edit"></i></button>
        </div>
        <img class="card-img-top" src="https://via.placeholder.com/700x300">
        <div class="card-body">
          <h5 class="card-title">{{ post.title }}</h5>
          <p class="card-text">{{ post.content  | slice  }}</p>
        </div>
      </div>
    </div>
    <div class='row' v-else>
      <div class="col-12">
        <img id='detailImg' src="https://via.placeholder.com/700x300">
        <div class="mx-auto mt-4">
          <br><h3 class="my-2 border-bottom">{{ detailed.title }}</h3>
          <h5 class="my-2">by {{ detailed.author }}</h5><br><br>
          <p class="my-2">{{ detailed.content }}</p>
        </div>
      </div>
    </div>

    <div v-if='openEdit'>
      <div id='backdrop'></div>
      <div id='editPost'>
        <button id='closeModal' v-on:click="editModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <div id='editPostInput'>
          <input v-model='newtitle' type="text" placeholder="Title">
          <textarea rows=18 v-model='newcontent' placeholder="Content"></textarea>
        </div>
        <button class='modalBtn' v-on:click="editModal()">Cancel Edit</button>
        <button class='modalBtn' v-on:click="editPost()">Commit Edit</button><br>
      </div>
    </div>

    <div v-if='openRemove'>
      <div id='backdrop'></div>
      <div id='removePost'>
        <button id='closeModal' v-on:click="removeModal()" title='Close'><i class="far fa-times-circle"></i></button><br>
        <h3>Are you sure?</h3>
        <h5>You're about to delete the post permanently</h5>
        <button class='modalBtn' v-on:click="removeModal()">Nope</button>
        <button class='modalBtn' id='removeBtn' v-on:click="removePost()">Yeah</button><br>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'postlarge',
  props: ['posts'],
  data: function () {
    return {
      showAll: true,
      detailed: {},
      isAuthor: true,
      openEdit: false,
      openRemove: false,
      newtitle: '',
      newcontent: '',
      editId: '',
      removeId: ''
    }
  },
  methods: {
    showOne: function (id) {
      if (id !== undefined) {
        axios({
          method: 'get',
          url: `http://localhost:3000/articles/${id}`
        })
          .then(data => {
            this.detailed = {
              title: data.data.data.title,
              author: data.data.data.author.name,
              content: data.data.data.content
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
    editModal: function (id, title, content) {
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
    },
    editPost: function () {

    },
    removeModal: function (id) {
      if (this.openRemove) {
        this.openRemove = false
      } else {
        this.openRemove = true
      }
      if (id) {
        this.removeId = id
      }
      console.log(this.$parent.posts)
    },
    removePost: function () {
      axios({
        method: 'delete',
        url: 'http://localhost:3000/articles/',
        data: { id: this.removeId, token: localStorage.getItem('jwtToken') }
      })
        .then(data => {
          for (var i = 0; i < this.$parent.posts.length; i++) {
            if (this.$parent.posts[i]._id === this.removeId) {
              this.$parent.posts.splice(i, 1)
            }
          }
          this.openRemove = false
        })
        .catch(err => {
          alert(err)
        })
    }
  },
  filters: {
    slice (value) {
      if (value.length > 300) {
        if (value[299] === ' ') {
          return value.slice(0, 300) + '. . .'
        } else {
          return value.slice(0, 300) + ' . . .'
        }
      } else {
        return value
      }
    }
  },
  watch: {
    '$route': function () {
      this.showOne(this.$route.params.id)
    }
  }
}
</script>

<style>
  #detailImg {
    width: 100%
  }
  #postLarge p {
    word-wrap: break-word;
    text-align: justify;
    text-indent: 10%;
  }
  .cardBtn button {
    margin: 5px 0;
    float: right
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
  #removePost {
    position: fixed;
    background-color: white;
    left: 25%;
    top: 37.5%;
    width: 50%;
    height: 25%;
    z-index: 2101;
  }
  #editPostInput textarea {
    width: 93%;
    margin-top: 1%;
    border: none;
    font-size: 16px;
  }
  #editPostInput input {
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
