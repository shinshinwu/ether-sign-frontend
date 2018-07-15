import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
