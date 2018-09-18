<template>
  <div class="row mx-auto" v-if='showAll'>
    <div class="col-12 card mb-4" v-for='post in posts' :key='post._id' v-on:click='showDetail(post.title, post.content)'>
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
    showDetail: function (title, content) {
      this.showAll = false
      this.detailed.title = title
      this.detailed.content = content
    }
  },
  watch: {
    posts: {
      handler: function () {
        if (this.posts.length === 1) {
          this.showDetail(this.posts[0].title, this.posts[0].content)
        } else {
          this.showAll = true
        }
      },
      deep: true
    }
  }
}
</script>

<style>
  #detailImg {
    width: 100%
  }
</style>
