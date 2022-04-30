<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i>基本休息
                </el-breadcrumb-item>
                <el-breadcrumb-item>物业公司</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div style="width: 100%;height: 60px;">
              <el-button v-show="admin&&type==1" style="margin-right: 30px; float:right;" type="primary" @click="update('form')">保存</el-button>
            </div>
            <div v-if="form!=null" class="form-box">
                <el-form :rules="rules" :model="form" ref="form"  label-width="130px">
                    <!-- row1 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="社会信用代码" prop="number">
                          <el-input v-model="form.number" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="物业公司名" prop="name">
                          <el-input v-model="form.name" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- row2 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="地址" prop="address">
                          <el-input v-model="form.address" :disabled="admin!=true || type!=1"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="使用中" prop="active">
                          <el-checkbox label="使用中" :disabled="true" v-model="form.active"></el-checkbox>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- row4 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="邮件" prop="email">
                          <el-input v-model="form.email" :disabled="admin!=true || type!=1"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="联系电话" prop="phone">
                          <el-input v-model="form.phone" :disabled="admin!=true || type!=1"></el-input>
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
      form: null,
      admin: false,
      type: 0,
      rules: {
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
    // 1-employee 2-Customer 3-partner 住户-我的物业 员工-我的公司
    // eslint-disable-next-line eqeqeq
    if (this.$route.query.from == 'internal') {
      this.GetCompanyDetailByNumber(this.$route.query.number)
    // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 1 || localStorage.getItem('logintype') == 2) {
      this.GetCompanyDetailByNumber(localStorage.getItem('loginuser_commpany'))
      // eslint-disable-next-line eqeqeq
      this.admin = localStorage.getItem('loginadmin') == 1
      this.type = localStorage.getItem('logintype')
    } else {

    }
  },
  methods: {
    GetCompanyDetailByNumber (number) {
      axios.post('/getcompanies?type=1&partner=0&number=' + number)
        .then(res => {
          this.form = res.data[0]
          this.form.active = res.data[0].active === 0
        })
        .catch(err => {
          this.errorMessage('加载失败:' + err)
        })
    },
    update (form) {
      axios
        .post(
          '/updatecompany?number=' + form.number + '&email=' + form.email + '&phone=' + form.phone + '&address=' + form.address
        )
        .then(res => {
          this.successMessage('更新成功！')
          this.reFresh()
        })
        .catch(err => {
          this.errorMessage('更新失败:' + err)
        })
    },
    reFresh () {
      this.$router.push({
        path: '/loading',
        query: {
          url: '/companydetail'
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
