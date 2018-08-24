import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import index from '@/views/index'
import main from '@/views/main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/main',
      children: [
        {
          path: 'main',
          name: 'main',
          component: main
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
