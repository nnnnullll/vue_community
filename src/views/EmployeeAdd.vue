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
      <div style="width: 100%;height: 60px;">
        <el-button style="margin-right: 30px; float:right;" type="primary" @click="onSubmit('form')">提交</el-button>
      </div>
      <div class="form-box">
        <el-form :model="form" ref="form" :rules="rules" label-width="80px">
          <!-- row1 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="名字" prop="name">
                <el-input v-model="form.name"></el-input>
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
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-form-item label="" prop="admin">
                  <el-checkbox label="超级管理员" :name="admin"></el-checkbox>
                </el-form-item>
              </el-row>
            </el-col>
          </el-row>
          <!-- row2 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="身份证号" prop="id">
                <el-input v-model="form.id"></el-input>
              </el-form-item>
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
      form: {
        company: '',
        name: '',
        phone: '',
        email: '',
        admin: 0,
        id: ''
      },
      rules: {
        name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
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
        ],
        id: [
          { required: true, message: '身份证号码不能为空', trigger: 'blur' },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: '请输入正确的身份证号码',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },

  methods: {
    onSubmit (formName) {
      this.form.company = localStorage.getItem('loginuser_commpany')
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(
              '/insertemployee?name=' +
                this.form.name +
                '&company=' +
                this.form.company +
                '&phone=' +
                this.form.phone +
                '&email=' +
                this.form.email +
                '&admin=' +
                this.form.admin +
                '&id=' +
                this.form.id
            )
            .then(res => {
              if (res.data === 0) {
                this.errorMessage('创建失败: 该身份证号已存在！')
              } else if (res.data === 1) {
                this.errorMessage('创建失败: 该手机号已存在！')
              } else if (res.data === 2) {
                this.errorMessage('创建失败: 该邮箱已存在！')
              } else {
                this.successMessage('创建成功！')
                this.refresh(res.data)
              }
            })
            .catch(err => {
              this.errorMessage('创建失败: ' + err)
            })
        } else {
          this.errorMessage('创建失败: 请确认表单内容')
          return false
        }
      })
    },
    refresh (number) {
      this.$router.push({
        path: '/employeedetail',
        query: {
          number: number,
          from: 'internal'
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
