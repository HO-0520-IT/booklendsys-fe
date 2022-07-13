import Vue from 'vue'
import Main from '../views/Main.vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ConnectSettings from '../views/ConnectSettings.vue'
import BookList from '../views/BookList.vue'
import LendReturn from '../views/LendReturn.vue'
import EditBook from '../views/EditBook.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  
  {
    path: '/',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'connectsettings',
        name: 'ConnectSettings',
        component: ConnectSettings
      },
      {
        path: 'booklist',
        name: 'BookList',
        component: BookList
      },
      {
        path: 'lendreturn',
        name: 'LendReturn',
        component: LendReturn
      },
      {
        path: 'editbook',
        name: 'EditBook',
        component: EditBook
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
