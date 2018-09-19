<template>
  <div class="post">
    <div class="container">
      <div class="row">
        <div class="col-5">
          <div class="row border my-2">
            placeholder
          </div>
          <div class="row my-2">
              <postlist v-bind:islogin='islogin' @list='throwPost'></postlist>
          </div>
        </div>
        <div class="col-7">
          <postlarge v-bind:posts='posts'></postlarge>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import postlarge from '@/components/postLarge.vue'
import postlist from '@/components/postList.vue'

export default {
  name: 'post',
  props: ['islogin'],
  data: function () {
    return {
      posts: [{}]
    }
  },
  methods: {
    throwPost: function (value) {
      this.posts = value
    }
  },
  components: {
    postlarge,
    postlist
  }
}
</script>

<style>
  .post {
    margin-top: 12vh;
  }
  textarea:focus, input:focus, button:focus {
    outline: none;
  }
</style>
