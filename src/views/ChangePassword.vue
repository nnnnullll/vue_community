<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 用户
                </el-breadcrumb-item>
                <el-breadcrumb-item>更改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="form" ref="form"  label-width="80px">
                  <el-form-item label="原密码" prop="old">
                    <el-input v-model="form.old"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" prop="password2">
                    <el-input v-model="form.password2"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="update()">提交</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      number: 9,
      type: 0,
      form: {
        old: '',
        password: '',
        password2: ''
      }
    }
  },
  mounted: function () {
    this.user = localStorage.getItem('loginuser')
  },
  methods: {
    update () {
      if (this.form.password !== this.form.password2) {
        this.errorMessage('操作失败: 请确保两次新密码保持一致')
      } else {
        var url = ''
        // eslint-disable-next-line eqeqeq
        if (localStorage.getItem('logintype') == 1) {
          url = '/updateemployee?number=' + this.user + '&email=0&phone=0&oldpassword=' + this.form.old + '&password=' + this.form.password + '&type=4'
        // eslint-disable-next-line eqeqeq
        } else if (localStorage.getItem('logintype') == 2) {
          url = '/updatehousehold?number=' + this.user + '&email=0&phone=0&oldpassword=' + this.form.old + '&password=' + this.form.password + '&type=4'
        } else {
          url = '/updatepartner?num=' + this.user + '&address=a&phone=a&email=a&description=a&type=2&oldpassword=' + this.form.old + '&password=' + this.form.password + '&one=0&two=0&three=0&four=0&five=0&active=0'
        }
        axios
          .post(url)
          .then(res => {
            if (res.data === 0) {
              this.errorMessage('操作失败: 原始密码错误')
            } else {
              this.successMessage('操作成功')
              this.reFresh()
            }
          })
          .catch(err => {
            this.errorMessage('操作失败:' + err)
          })
      }
    },
    reFresh () {
      this.$router.push({
        path: '/loading',
        query: {
          url: '/changepassword'
        }
      })
    },
    errorMessage (message) {
      this.$message.error(message)
      console.error(message)
    },
    successMessage (message) {
      this.$message({
        message: message,
        type: 'success'
      })
    }
  }
}
</script>
