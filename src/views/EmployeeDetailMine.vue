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
        <el-form :model="form" ref="form" :rules="rules" label-width="80px">
          <!-- row1 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="编号" prop="number">
                <el-input :disabled="true" v-model="form.number"></el-input>
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
                <el-input :disabled="true" v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司号" prop="company">
                <el-input :disabled="true" v-model="form.company"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="email">
                <el-input :disabled="true" v-model="form.id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- row4 -->
          <el-row>
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
      flag: true, // 只有查看本人信息时才可以编辑
      rules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号码',
            trigger: ['blur', 'change']
          }
        ]
      }
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
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(
              '/updateemployee?number=' +
                this.form.number +
                '&email=' +
                this.form.email +
                '&phone=' +
                this.form.phone +
                '&type=1'
            )
            .then(res => {
              // eslint-disable-next-line eqeqeq
              if (res.data == 0) {
                this.errorMessage('创建失败: 该手机号已存在！')
              // eslint-disable-next-line eqeqeq
              } else if (res.data == 2) {
                this.errorMessage('创建失败: 该邮箱已存在！')
              } else {
                this.successMessage('更新成功')
                this.refresh(this.form.number)
              }
            })
            .catch(err => {
              this.errorMessage('更新失败:' + err)
            })
        } else {
          this.$message.error('更新失败，请校验表单内容')
          return false
        }
      })
    },
    refresh (number) {
      this.$router.push({
        path: '/loading',
        query: {
          url: '/employeedetailmine',
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
