<template>
    <div class="about">
        <v-header @receivecollapse="fromChild" />
        <v-sidebarpartner v-if="type==3" />
        <v-sidebaremployee v-else-if="type==1 && admin==0"/>
        <v-sidebaremployeeadmin v-else-if="type==1 && admin==1"/>
        <v-sidebarhousehold v-else />
        <div class="content-box" :class="{ 'content-collapse': collapse }">
            <div class="content">
                <router-view v-slot="{ Component }">
                    <transition name="move" mode="out-in">
                        <keep-alive :include="tagsList">
                            <component :is="Component" />
                        </keep-alive>
                    </transition>
                </router-view>
                <!-- <el-backtop target=".content"></el-backtop> -->
            </div>
        </div>
    </div>
</template>
<script>
import vHeader from '../components/Header.vue'
import vSidebarpartner from '../components/SidebarPartne.vue'
import vSidebarhousehold from '../components/SidebarHousehold.vue'
import vSidebaremployee from '../components/SidebarEmployee.vue'
import vSidebaremployeeadmin from '../components/SidebarEmployeeAdmin.vue'
export default {
  components: {
    vHeader,
    vSidebarpartner,
    vSidebarhousehold,
    vSidebaremployee,
    vSidebaremployeeadmin
  },
  data () {
    return {
      collapse: null,
      type: null,
      admin: null
    }
  },
  mounted: function () {
    this.type = localStorage.getItem('logintype')
    this.admin = localStorage.getItem('loginadmin')
    this.fromChild()
  },
  methods: {
    // 接收子组件参数，赋值
    fromChild (data) {
      this.collapse = data
      console.log(data)
    }
  }
}
</script>
