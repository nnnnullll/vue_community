import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    }, {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          meta: {
            title: '系统首页'
          },
          component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
        },
        {
          path: '/casetable',
          name: 'casetable',
          meta: {
            title: '投诉单列表'
          },
          component: () => import('../views/CaseTable.vue')
        },
        {
          path: '/casetablenew',
          name: 'casetablenew',
          meta: {
            title: '投诉单列表'
          },
          component: () => import('../views/CaseTableNew.vue')
        },
        {
          path: '/casetableesca',
          name: 'casetableesca',
          meta: {
            title: '加急与逾期'
          },
          component: () => import('../views/CaseTableEsca.vue')
        },
        {
          path: '/casetableall',
          name: 'casetableall',
          meta: {
            title: '投诉单列表'
          },
          component: () => import('../views/CaseTableAll.vue')
        },
        {
          path: '/casetableclose',
          name: 'casetableclose',
          meta: {
            title: '投诉单列表'
          },
          component: () => import('../views/CaseTableClose.vue')
        },
        {
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
          path: '/employeedetail',
          name: 'employeedetail',
          meta: {
            title: '员工信息'
          },
          component: () => import('../views/EmployeeDetail.vue')
        },
        {
          path: '/employeedetailMine',
          name: 'employeedetailmine',
          meta: {
            title: '个人信息'
          },
          component: () => import('../views/EmployeeDetailMine.vue')
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
          path: '/communitytable',
          name: 'communitytable',
          meta: {
            title: '社区表格'
          },
          component: () => import('../views/CommunityTable.vue')
        },
        {
          path: '/communitytableall',
          name: 'communitytableall',
          meta: {
            title: '社区表格'
          },
          component: () => import('../views/CommunityTableAll.vue')
        },
        {
          path: '/companytable',
          name: 'companytable',
          meta: {
            title: '物业公司表格'
          },
          component: () => import('../views/CompanyTable.vue')
        },
        {
          path: '/companytableall',
          name: 'companytableall',
          meta: {
            title: '所有物业公司'
          },
          component: () => import('../views/CompanyTableAll.vue')
        },
        {
          path: '/partnertable',
          name: 'partnertable',
          meta: {
            title: '维修公司表格'
          },
          component: () => import('../views/PartnerTable.vue')
        },
        {
          path: '/partnertableall',
          name: 'partnertableall',
          meta: {
            title: '所有维修公司'
          },
          component: () => import('../views/PartnerTableAll.vue')
        },
        {
          path: '/employeetable',
          name: 'employeetable',
          meta: {
            title: '维修公司表格'
          },
          component: () => import('../views/EmployeeTable.vue')
        },
        {
          path: '/employeeadd',
          name: 'employeeadd',
          meta: {
            title: '维修公司表格'
          },
          component: () => import('../views/EmployeeAdd.vue')
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
          path: '/companydetail',
          name: 'companydetail',
          meta: {
            title: '物业公司信息'
          },
          component: () => import('../views/CompanyDetail.vue')
        },
        {
          path: '/communityadd',
          name: 'communityadd',
          meta: {
            title: '新建社区'
          },
          component: () => import('../views/CommunityAdd.vue')
        },
        {
          path: '/partnerdetail',
          name: 'partnerdetail',
          meta: {
            title: '维修公司信息'
          },
          component: () => import('../views/PartnerDetail.vue')
        },
        {
          path: '/partneradd',
          name: 'partneradd',
          meta: {
            title: '维修公司信息'
          },
          component: () => import('../views/PartnerAdd.vue')
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
    }, {
      path: '/loading',
      name: 'loading',
      meta: {
        title: '登录'
      },
      component: () => import('../views/Loading.vue')
    }
  ]
})
