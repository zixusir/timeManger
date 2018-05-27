import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Member from '@/components/member'
import Status from '@/components/status'
import User from '@/components/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/status',
      name: 'status',
      component: Status
    },
    {
      path: '/user',
      name: 'user',
      component: User
    }
  ]
})
