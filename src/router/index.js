import Vue from 'vue'
import Router from 'vue-router'
import FlexIndex from '@/components/flex-index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FlexIndex',
      component: FlexIndex
    }
  ]
})
