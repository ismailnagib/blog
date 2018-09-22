import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/post',
      name: 'post',
      component: () => import('./views/Post.vue'),
      children: [{
        path: ':id',
        name: 'postdetail',
        component: () => import('./views/Post.vue')
      }]
    }
  ]
})
