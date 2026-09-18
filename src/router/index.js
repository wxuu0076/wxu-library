import { createRouter, createWebHistory } from 'vue-router'
import { authState } from '../auth'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import AddBookView from '../views/AddBookView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDeniedView,
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView,
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !authState.value) {
    return {
      name: 'Login',
      query: { denied: 'true', redirect: to.fullPath },
    }
  }
})

export default router
