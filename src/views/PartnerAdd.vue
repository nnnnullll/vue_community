<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 维修公司
        </el-breadcrumb-item>
        <el-breadcrumb-item>基本信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div style="width: 100%;height: 60px;">
        <el-button
          style="margin-right: 30px; float:right;"
          type="primary"
          @click="onSubmit('form')"
          >提交</el-button
        >
      </div>
      <div class="form-box">
        <el-form :model="form" ref="form" :rules="rules" label-width="130px">
          <!-- row1 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="物业公司" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- row2 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮件" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              <el-form-item label="服务类别" prop="one">
                <el-checkbox v-model="form.one">水管</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="two">
                <el-checkbox v-model="form.two">电路</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="three">
                <el-checkbox v-model="form.three">绿化</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="four">
                <el-checkbox v-model="form.four">公共设施</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="five">
                <el-checkbox v-model="form.five">其他</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="简介" prop="description">
              <el-input type="textarea" v-model="form.description"></el-input>
            </el-form-item>
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
        name: null,
        number: null,
        address: null,
        email: null,
        phone: null,
        description: null,
        one: false,
        two: false,
        three: false,
        four: false,
        five: false
      },
      rules: {
        name: [{ required: true, message: '公司名不能为空', trigger: 'blur' }],
        address: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
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
    // 1-employee 2-Customer 3-partner  维修员工-个人信息
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('logintype') == 1 && localStorage.getItem('loginadmin') == 1) {
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(
              '/insertpartner?name=' +
                this.form.name +
                '&address=' +
                this.form.address +
                '&phone=' +
                this.form.phone +
                '&email=' +
                this.form.email +
                '&description=' +
                this.form.description +
                '&one=' +
                (this.form.one === true ? 1 : 0) +
                '&two=' +
                (this.form.two === true ? 1 : 0) +
                '&three=' +
                (this.form.three === true ? 1 : 0) +
                '&four=' +
                (this.form.four === true ? 1 : 0) +
                '&five=' +
                (this.form.five === true ? 1 : 0)
            )
            .then(res => {
              if (res.data === 0) {
                this.successMessage('创建失败:该维修公司已存在！')
              } else {
                this.successMessage('创建成功')
                this.reFresh(res.data)
              }
            })
            .catch(err => {
              this.errorMessage('创建失败:' + err)
            })
        } else {
          this.errorMessage('请输入必填项')
          return false
        }
      })
    },
    reFresh (number) {
      this.$router.push({
        path: '/loading',
        query: {
          url: '/partnerdetail',
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
