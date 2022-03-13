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
          path: '/casetable',
          name: 'casetable',
          meta: {
            title: '投诉单列表'
          },
          component: () => import('../views/CaseTable.vue')
        }, {
          path: '/addcaseform',
          name: 'addcaseform',
          meta: {
            title: '新建投诉单'
          },
          component: () => import('../views/AddCaseForm.vue')
        },
        {
          path: '/casedetail',
          name: 'casedetail',
          meta: {
            title: '投诉单详情'
          },
          component: () => import('../views/CaseDetail.vue')
        },
        {
          path: '/householddetail',
          name: 'householddetail',
          meta: {
            title: '个人信息'
          },
          component: () => import('../views/HouseholdDetail.vue')
        },
        {
          path: '/communitydetail',
          name: 'communitydetail',
          meta: {
            title: '社区信息'
          },
          component: () => import('../views/CommunityDetail.vue')
        },
        {
          path: '/changepassword',
          name: 'changepassword',
          meta: {
            title: '更改密码'
          },
          component: () => import('../views/ChangePassword.vue')
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
