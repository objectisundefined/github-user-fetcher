import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import Fetcher from '@/components/Fetcher'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Fetcher',
      component: Fetcher
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
