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
                    <el-input v-model="form.old" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" prop="password">
                    <el-input v-model="form.password" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="新密码" prop="password2">
                    <el-input v-model="form.password2" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit()">表单提交</el-button>
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
      form: {
        old: '',
        password: '',
        password2: ''
      }
    }
  },
  mounted: function () {
  },
  methods: {
    GetHouseholdDetailByNumber (number) {
      axios.post('/gethousehold?type=1&number=' + number + '&community=0')
        .then(res => {
          this.form = res.data[0]
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
        })
    },
    onSubmit (formName) {
    }
  }
}
</script>
