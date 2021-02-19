import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 以下代码解决路由地址重复点击的报错问题
// 如果你的改了push还是没有生效，可以考虑改replace方法
// 修改路由replace方法,阻止重复点击报错
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalPush.call(this, location).catch(err => err)
}



const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router
