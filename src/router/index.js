import Vue from 'vue'
import Router from 'vue-router'

import index from '@/page/index'
import addNote from '@/page/add-note'
import editNoteKind from '@/page/edit-note-kind'
import login from '@/page/login'
import {setStore, getStore, removeStore} from '@/config/mUtils' // 本地存储方法封装
import axios from "axios";
import qs from 'qs';
import {baseUrl} from '@/config/env'

Vue.use(Router);


const router = new Router({
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
//全局路由守卫
router.beforeEach((to, from, next) => {
  let isLogin = true;
  let userId_Store = getStore("userId");
  let token_Store = getStore("token");
  axios({
    method: "post",
    url: baseUrl+'/user/determineUserTokenIsCorrect',
    data: qs.stringify({
      "userId": userId_Store,
      "token": token_Store
    }),
  }).then((response) => {
    let data = response.data;
    isLogin = data.params;
    if (to.fullPath != '/login') {//如果不是登录组件
      if (!isLogin) {//如果没有登录，就先进入login组件进行登录
        setStore("userId", "");
        setStore("token", "");
        next('/login');
      } else {//如果登录了，那就继续
        next();
      }
    } else {//如果是登录组件，那就继续。
      next();
    }

  }).catch((error) => {
    alert(error);
  });

});
export default router;
