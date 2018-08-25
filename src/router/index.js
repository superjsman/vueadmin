import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import index from '@/views/index'
import main from '@/views/main'
import user from '@/views/user/user'
import power from '@/views/power/power'
import powerAssign from '@/views/power/powerAssign'
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
        },
        {
          path: 'user',
          name: 'user',
          component: user
        },
        {
          path: 'power',
          name: 'power',
          component: power
        },
        {
          path: 'powerAssign',
          name: 'powerAssign',
          component: powerAssign
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
