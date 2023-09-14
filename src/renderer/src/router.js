import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './pages/Login.vue'
import Panel from './pages/Panel.vue'
import Settings from './pages/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { transition: 'slide-left', disallowAuthed: true }
  },
  {
    path: '/panel',
    name: 'Panel',
    component: Panel,
    meta: { transition: 'slide-right', disallowAuthed: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { transition: 'slide-right', disallowAuthed: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

export default router
