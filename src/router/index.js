import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeLayout from '@/views/Layout/HomeLayout.vue'
import NotFound from '@/views/NotFoundPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home',
    name: 'Home',
    component: HomeLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () =>
      import(/* webpackChunkName: "signup" */ '@/views/Signup.vue'),
  },
  { path: '*', component: NotFound },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta && to.meta.requiresAuth
  if (requiresAuth && !localStorage.getItem('uid')) {
    next({ name: 'Login' })
  } else if (
    (to.path === '/login' || to.path === '/signup') &&
    localStorage.getItem('uid')
  ) {
    next(from.path)
  } else {
    next()
  }
})

export default router
