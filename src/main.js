// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8010/'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
