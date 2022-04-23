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
    <div v-if="form!=null" class="container">
      <div style="width: 100%;height: 60px;">
        <el-button
          v-show="ifshow && form.active == true && minename != form.number"
          style="margin-right: 30px; float:right;"
          type="primary"
          @click="update(form.number, 2)"
          >离职</el-button
        >
        <el-button
          v-show="ifshow && form.active == false && minename != form.number"
          style="margin-right: 30px; float:right;"
          type="primary"
          @click="update(form.number, 2)"
          >复职</el-button
        >
        <el-button
          v-show="
            ifshow &&
              form.active == true &&
              form.admin == false &&
              minename != form.number
          "
          style="margin-right: 30px; float:right;"
          type="primary"
          @click="update(form.number, 3)"
          >授予管理员</el-button
        >
        <el-button
          v-show="
            ifshow &&
              form.active == true &&
              form.admin == true &&
              minename != form.number
          "
          style="margin-right: 30px; float:right;"
          type="primary"
          @click="update(form.number, 3)"
          >撤销管理员</el-button
        >
      </div>
      <div class="form-box">
        <el-form :model="form" ref="form" label-width="80px">
          <!-- row1 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="编号" prop="number">
                <el-input v-model="form.number" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- row2 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="名字" prop="name">
                <el-input v-model="form.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- row3 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司号" prop="company">
                <el-input v-model="form.company" :disabled="true"></el-input>
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
                      :disabled="true"
                      name="active"
                    ></el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
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
      minename: '',
      ifshow: false,
      form: null,
      true: true // 不可以编辑
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner  员工-我的信息
    if (this.$route.query.from === 'internal') {
      this.GetEmployeeDetailByNumber(this.$route.query.number)
      // eslint-disable-next-line eqeqeq
      this.ifshow = localStorage.getItem('loginadmin') == 1
      this.minename = localStorage.getItem('loginuser')
    }
  },
  methods: {
    GetEmployeeDetailByNumber (number) {
      axios
        .post('/getemployee?type=1&company=0&number=' + number)
        .then(res => {
          this.form = res.data[0]
          this.form.active = res.data[0].active === 0
          this.form.admin = res.data[0].admin === 1
        })
        .catch(err => {
          this.errorMessage('加载失败:' + err)
        })
    },
    // type=2 active/inactive type=3 admin/deadmin
    update (number, type) {
      axios
        .post(
          '/updateemployee?number=' + number + '&email=0&phone=0&oldpassword=0&password=0&type=' + type
        )
        .then(res => {
          this.successMessage('更新成功！')
          this.reFresh(number)
        })
        .catch(err => {
          this.errorMessage('更新失败:' + err)
        })
    },
    reFresh (number) {
      this.$router.push({
        path: '/loading',
        query: {
          url: '/employeedetail',
          number: number
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
