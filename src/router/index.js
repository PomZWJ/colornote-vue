import Vue from 'vue'
import Router from 'vue-router'

import index from '@/page/index'
import addNote from '@/page/add-note'
import editNoteKind from '@/page/edit-note-kind'
import login from '@/page/login'

Vue.use(Router);


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
    },
    {
      path: '/editNoteKind',
      name: 'editNoteKind',
      component: editNoteKind
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
