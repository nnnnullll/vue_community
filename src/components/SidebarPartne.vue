<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template #title>
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template #title>{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import Bus from '../utils/bus'
export default {
  data () {
    return {
      collapse: null,
      items: [
        {
          icon: 'el-icon-house',
          index: '/dashboard',
          title: '系统首页'
        },
        {
          icon: 'el-icon-document',
          index: '/casetable',
          title: '基础表格'
        },
        {
          icon: 'el-icon-copy',
          index: '/tabs',
          title: 'tab选项卡'
        },
        {
          icon: 'el-icon-document-add',
          index: '3',
          title: '新建',
          subs: [
            {
              index: '/addcaseform',
              title: '投诉单'
            },
            {
              index: '/upload',
              title: '文件上传'
            },
            {
              index: '4',
              title: '三级菜单',
              subs: [
                {
                  index: '/editor',
                  title: '富文本编辑器'
                }
              ]
            }
          ]
        },
        {
          icon: 'el-icon-emoji',
          index: '/icon',
          title: '自定义图标'
        },
        {
          icon: 'el-icon-pie-chart',
          index: '/charts',
          title: 'schart图表'
        },
        {
          icon: 'el-icon-global',
          index: '/i18n',
          title: '国际化功能'
        },
        {
          icon: 'el-icon-warn',
          index: '7',
          title: '错误处理',
          subs: [
            {
              index: '/permission',
              title: '权限测试'
            },
            {
              index: '/404',
              title: '404页面'
            }
          ]
        },
        {
          icon: 'el-icon-user',
          index: '8',
          title: '个人中心',
          subs: [
            {
              index: '/partnerdetail',
              title: '我的信息'
            },
            {
              index: '/changepassword',
              title: '更改密码'
            },
            {
              index: '/companytable',
              title: '我的合作'
            }
          ]
        }
      ]

    }
  },
  mounted: function () {
    this.setcollapse()
  },
  methods: {
    // 取 Bus.$on header组件中传来的值
    setcollapse () {
      Bus.$on('collapse', (val) => {
        this.collapse = val
      })
    }

  }
}
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
