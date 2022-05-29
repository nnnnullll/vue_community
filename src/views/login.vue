<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">社区投诉管理系统</div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="账号">
                        <template #prepend>
                            <el-button icon="el-icon-user"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="loginForm.password">
                        <template #prepend>
                            <el-button icon="el-icon-lock"></el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="type">
                    <el-radio-group v-model="loginForm.type">
                        <el-radio :label="1">物业</el-radio>
                        <el-radio :label="2">住户</el-radio>
                        <el-radio :label="3">维修公司</el-radio>
                    </el-radio-group>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                </div>
                <p class="login-tips" type="primary">帮助中心联系电话：18812345678</p>
            </el-form>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      loginForm: {
        username: null,
        password: null,
        type: null
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 10, max: 10, message: '长度为 10 个字符', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择身份', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/login?username=' + this.loginForm.username + '&password=' + this.loginForm.password + '&type=' + this.loginForm.type)
            .then(res => {
              // type=1 employee  type=2 household  type=3 partner
              // type=1  0-no admin 1-admin 2-失败 3-停用 4-不存在
              // type=2  1-成功 2-失败 3-停用 4-不存在
              // type=2  1-成功 2-失败 4-不存在
              // eslint-disable-next-line eqeqeq
              if (res.data == 2) {
                this.$message.error('密码错误')
              // eslint-disable-next-line eqeqeq
              } else if (res.data == 1 || res.data == 0) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                localStorage.setItem('loginuser', this.loginForm.username)
                localStorage.setItem('logintype', this.loginForm.type)
                localStorage.setItem('loginadmin', res.data)
                this.$router.push('/')
              // eslint-disable-next-line eqeqeq
              } else if (res.data == 3) {
                this.$message.error('该账户已停用')
              // eslint-disable-next-line eqeqeq
              } else if (res.data == 4) {
                this.$message.error('该账户不存在')
              } else {
                this.$message.error('登录失败：未知错误，请联系工作人员。联系电话：18812345678')
              }
            })
            .catch(err => {
              this.$message.error('error: ' + err)
              console.error(err)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/image/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.6);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
