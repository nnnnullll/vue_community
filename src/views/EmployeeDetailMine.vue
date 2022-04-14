<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 用户
        </el-breadcrumb-item>
        <el-breadcrumb-item>物业员工</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form :model="form" ref="form" label-width="80px">
          <!-- row1 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="编号" prop="number">
                <el-input v-model="form.number"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- row2 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="名字" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- row4 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司号" prop="company">
                <el-input v-model="form.company"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="" prop="admin">
                    <el-checkbox
                      v-model="form.admin"
                      label="超级管理员"
                      :disabled="true"
                      name="admin"
                    ></el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="" prop="active">
                    <el-checkbox
                      v-model="form.active"
                      label="账号使用中"
                      name="active"
                    ></el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">保存</el-button>
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
      form: null,
      flag: true // 只有查看本人信息时才可以编辑
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner  员工-我的信息
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('logintype') == 1) {
      this.GetEmployeeDetailByNumber(localStorage.getItem('loginuser'))
    }
  },
  methods: {
    GetEmployeeDetailByNumber (number) {
      console.log(number)
      axios
        .post('/getemployee?type=1&company=0&number=' + number)
        .then(res => {
          this.form = res.data[0]
          // eslint-disable-next-line eqeqeq
          if (res.data[0].active == 0) {
            this.form.active = true
          }
          // eslint-disable-next-line eqeqeq
          if (res.data[0].admin == 0) {
            this.form.admin = true
          }
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
        })
    },
    onSubmit (formName) {}
  }
}
</script>
