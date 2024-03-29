import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import BlogDetail from './views/BlogDetail.vue'
import BlogCreate from './views/BlogCreate.vue'
import ConfirmEmail from './views/ConfirmEmail.vue'
import LikedArticle from './views/LikedArticle.vue'
import BlogEdit from './views/BlogEdit.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/blog-create',
      name: 'blogCreate',
      component: BlogCreate
    },
    {
      path: '/confirm-email',
      name: 'confirmEmail',
      component: ConfirmEmail
    },
    {
      path: '/liked-articles',
      name: 'likedArticles',
      component: LikedArticle
    },
    {
      path: '/blog/:id',
      name: 'blogDetail',
      component: BlogDetail
    },
    {
      path: '/blog-edit/:id',
      name: 'blogEdit',
      component: BlogEdit
    }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = !!(Vue.cookie.get('token'))
  // TODO: admin guard goes here

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
