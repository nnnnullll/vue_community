import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/donate',
          name: 'donate',
          meta: {
            title: '鼓励作者'
          },
          component: () => import('../views/Donate.vue')
        }, {
          path: '/casetable',
          name: 'casetable',
          meta: {
            title: '表单'
          },
          component: () => import('../views/CaseTable.vue')
        }, {
          path: '/addcaseform',
          name: 'addcaseform',
          meta: {
            title: '表单'
          },
          component: () => import('../views/AddCaseForm.vue')
        },
        {
          path: '/casedetail',
          name: 'casedetail',
          meta: {
            title: '表单'
          },
          component: () => import('../views/CaseDetail.vue')
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      meta: {
        title: '登录'
      },
      component: () => import('../views/login.vue')
    }
  ]
})
