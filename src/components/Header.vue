<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">物业管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <p class="login-tips" type="primary">您好，欢迎使用物业管理系统&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                <el-link class="login-tips" type="primary" @click="logout">退出登录</el-link>
            </div>
        </div>
    </div>
</template>
<script>
import Bus from '../utils/bus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    logout () {
      this.$confirm('此操作将退出物业系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('loginuser')
        localStorage.removeItem('logintype')
        localStorage.removeItem('loginuser_commpany')
        localStorage.removeItem('loginuser_commmunity')
        localStorage.removeItem('loginadmin')
        this.$router.replace('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    collapseChage () {
      this.collapse = !this.collapse
      this.handlecollapse()
    },
    // 把collapse传递到sideber组件 '子组件向兄弟组件传值'
    handlecollapse () {
      Bus.$emit('collapse', this.collapse)
      this.$emit('receivecollapse', this.collapse)
    }
  }
}
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
}

</style>
