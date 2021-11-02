import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AdminBlank from '../pages/admin/AdminBlank'
import AdminMovie from '../pages/admin/AdminMovie'
import AdminPost from '../pages/admin/AdminPost'
import AdminPostAdd from '../pages/admin/AdminPostAdd'
import AdminPostEdit from '../pages/admin/AdminPostEdit'
import AdminLogin from '../pages/admin/AdminLogin'
import AdminCategory from '../pages/admin/AdminCategory'
import AdminCategoryAdd from '../pages/admin/AdminCategoryAdd'
import AdminCategoryEdit from '../pages/admin/AdminCategoryEdit'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin
    },
    {
      path: '/admin/movie',
      name: 'admin-movie',
      component: AdminMovie,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/category',
      name: 'admin-category',
      component: AdminCategory,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/category/add',
      name: 'admin-category-add',
      component: AdminCategoryAdd,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/category/edit/:id',
      name: 'admin-category-edit',
      component: AdminCategoryEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/post',
      name: 'admin-post',
      component: AdminPost,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/post/add',
      name: 'admin-post-add',
      component: AdminPostAdd,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/post/edit/:id',
      name: 'admin-post-edit',
      component: AdminPostEdit,
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/blank',
      name: 'admin-blank',
      component: AdminBlank,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    console.log(from)

    if (token) {
      next()
    } else {
      next({ name: 'admin-login' })
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
