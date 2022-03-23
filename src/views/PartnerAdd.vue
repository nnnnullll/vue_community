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
            <div class="form-box">
                <el-form :model="form" ref="form"  label-width="130px">
                    <!-- row1 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="物业公司名" prop="name">
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
                    <!-- row4 -->
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit('form')">表单提交</el-button>
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
        name: null,
        number: null,
        address: null,
        email: null,
        phone: null
      },
      rules: {
        name: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请选择类别', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入具体描述', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner  维修员工-个人信息
    // eslint-disable-next-line no-constant-condition
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('logintype') == 1 && localStorage.getItem('loginadmin') == 1) {
    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/insertpartner?name=' + this.form.name + '&address=' + this.form.address + '&phone=' + this.form.phone + '&email=' + this.form.email)
            .then(res => {
              this.$message({
                message: '创建成功',
                type: 'success'
              })
              console.log(res.data)
              this.$router.push({
                path: '/partnerdetail',
                query: {
                  number: res.data,
                  from: 'internal'
                }
              })
            })
            .catch(err => {
              this.$message.error('创建失败:' + err)
              console.error(err)
            })
        } else {
          this.$message.error('请输入必填项')
          return false
        }
      })
    }
  }
}
</script>
