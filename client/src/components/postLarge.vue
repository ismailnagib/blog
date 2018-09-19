<template>
  <div class="row mx-auto" v-if='showAll'>
    <div class="col-12 card mb-4" v-for='post in posts' :key='post._id'>
      <img class="card-img-top" src="https://via.placeholder.com/700x300">
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text">{{ post.content }}</p>
      </div>
    </div>
  </div>
  <div class='row mx-auto' v-else>
    <div class="col-12">
      <img id='detailImg' src="https://via.placeholder.com/700x300">
      <div class="mx-auto mt-4">
        <h3 class="my-2">{{ detailed.title }}</h3>
        <p class="my-2">{{ detailed.content }}</p>
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
      detailed: {}
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
</style>
