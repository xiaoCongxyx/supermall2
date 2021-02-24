import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import FastClick from 'fastclick'

import VueLazyload from 'vue-lazyload'

// 引入自己封装的插件
import toast from './components/common/toast'
import {request} from "@/network/request";


Vue.config.productionTip = false

// 安装自己封装的插件
Vue.use(toast)

// 解决移动端的300ms延迟
FastClick.attach(document.body)

// 使用图片懒加载插件
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1,
  loading: require('./assets/img/common/adog.jpg')
})


// 在vue原型上挂载$bus事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
