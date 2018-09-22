<template>
  <div class="post">
    <div class="container">
      <div class="row">
        <div class="col-4">
          <postlist v-bind:islogin='islogin' v-bind:needreload='needreload' @list='throwPost' @reloaded='toggleReload'></postlist>
        </div>
        <div class="col-1"></div>
        <div class="col-7">
          <postlarge v-bind:islogin='islogin' v-bind:posts='posts' @reload='toggleReload'></postlarge>
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
      posts: [{}],
      needreload: false
    }
  },
  methods: {
    throwPost: function (value) {
      this.posts = value
    },
    toggleReload: function (value) {
      if (this.needreload) {
        this.needreload = false
      } else {
        this.needreload = true
      }
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
  .closeModal {
    margin-top: 1%;
    margin-left: 90%;
  }
  .iconBtn {
    margin: 5px 0;
    float: right;
    height: 30px;
    padding: 5px 10px;
    border-radius: 15px;
  }
  .iconBtn:hover {
    color: #42b983;
    background-color: gainsboro;
  }
</style>
