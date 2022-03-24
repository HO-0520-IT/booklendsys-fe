import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ConnectSettings from '../views/ConnectSettings.vue'
import BookList from '../views/BookList.vue'
import LendReturn from '../views/LendReturn.vue'
import EditBook from '../views/EditBook.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/connectsettings',
    name: 'ConnectSettings',
    component: ConnectSettings
  },
  {
    path: '/booklist',
    name: 'BookList',
    component: BookList
  },
  {
    path: '/lendreturn',
    name: 'LendReturn',
    component: LendReturn
  },
  {
    path: '/editbook',
    name: 'EditBook',
    component: EditBook
  },
]

const router = new VueRouter({
  routes
})

export default router
