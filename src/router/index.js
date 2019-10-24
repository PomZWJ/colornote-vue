import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import addNote from '@/components/add-note'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/addNote',
      name: 'addNote',
      component: addNote
    }
  ]
})
