import { createRouter, createWebHashHistory } from 'vue-router'

import indexView from '../views/tlias/indexView.vue'
import detailView from '../views/tlias/detailView.vue'
import loginView from '@/views/tlias/loginView.vue'
import typeView from '../views/tlias/typeView.vue'  // 使用相对路径
import searchView from '../views/tlias/searchView.vue'
import CartView from '@/views/tlias/CartView.vue'
import AddressView from '@/views/tlias/AddressView.vue'
import OrderView from '@/views/tlias/OrderView.vue'
const routes = [
  { path: '/', redirect: '/login' }, // 重定向到 /index 路径
  { path: '/index', name: 'index', component: indexView },
  { path: '/detail', name: 'detail', component: detailView },
  {path:'/login',name:'login',component:loginView},
  { path: '/type', name: 'type', component: typeView },
  {path:'/search',name:'search',component: searchView},
  {path:'/cart',name:'cart',component: CartView},
  {path:'/address',name:'address',component: AddressView},
  {path:'/order',name:'order',component:OrderView},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
