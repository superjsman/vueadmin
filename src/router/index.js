import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import index from '@/views/index'
import main from '@/views/main'
import users from '@/views/user/users'
import roles from '@/views/power/roles'
import rights from '@/views/power/rights'
import goods from '@/views/goods/goods'
import params from '@/views/goods/params'
import categories from '@/views/goods/categories'
import orders from '@/views/orders/orders'
import reports from '@/views/reports/reports'
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
          path: 'users',
          name: 'users',
          component: users
        },
        {
          path: 'roles',
          name: 'roles',
          component: roles
        },
        {
          path: 'rights',
          name: 'rights',
          component: rights
        },
        {
          path: 'goods',
          name: 'goods',
          component: goods
        },
        {
          path: 'params',
          name: 'params',
          component: params
        },
        {
          path: 'categories',
          name: 'categories',
          component: categories
        },
        {
          path: 'orders',
          name: 'orders',
          component: orders
        },
        {
          path: 'reports',
          name: 'reports',
          component: reports
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
