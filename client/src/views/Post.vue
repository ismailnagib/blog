<template>
  <div class="post">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4">
          <postlist v-bind:islogin='islogin' v-bind:needreload='needreload' v-bind:needleftreload='needleftreload' @list='throwPost' @reloaded='toggleReload' @leftreloaded='toggleLeftReload'></postlist>
        </div>
        <div class="col-12 col-md-1"></div>
        <div class="col-12 col-md-7">
          <postlarge v-bind:islogin='islogin' v-bind:posts='posts' @reload='toggleReload' @leftreload='toggleLeftReload'></postlarge>
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
      needreload: false,
      needleftreload: false
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
    },
    toggleLeftReload: function (value) {
      if (this.needleftreload) {
        this.needleftreload = false
      } else {
        this.needleftreload = true
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
    margin-top: 1% !important;
    margin-right: 1% !important;
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
