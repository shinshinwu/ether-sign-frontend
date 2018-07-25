import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/Homepage'
import Profile from '@/components/Profile'
import CreateDocument from '@/components/CreateDocument'
import ViewDocument from '@/components/ViewDocument'
import CompressDocument from '@/components/CompressDocument'

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
    },
    {
      path: '/create-document',
      name: 'CreateDocument',
      component: CreateDocument
    },
    {
      path: '/view',
      name: 'ViewDocument',
      component: ViewDocument
    },
    {
      path: '/compress-document',
      name: 'CompressDocument',
      component: CompressDocument
    }
  ]
})
