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
            <div class="form-box">
                <el-form :model="form" ref="form"  label-width="130px">
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
                          <el-input v-model="form.address" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="使用中" prop="active">
                          <el-checkbox label="使用中" :disabled="true" name="form.active"></el-checkbox>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- row4 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="邮件" prop="email">
                          <el-input v-model="form.email" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="联系电话" prop="phone">
                          <el-input v-model="form.phone" :disabled="true"></el-input>
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
      form: null
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner 住户-我的物业 员工-我的公司
    // eslint-disable-next-line no-constant-condition
    // eslint-disable-next-line eqeqeq
    if (this.$route.query.from == 'internal') {
      this.GetCompanyDetailByNumber(this.$route.query.number)
    // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 1 || localStorage.getItem('logintype') == 2) {
      this.GetCompanyDetailByNumber(localStorage.getItem('loginuser_commpany'))
    } else {

    }
  },
  methods: {
    GetCompanyDetailByNumber (number) {
      axios.post('/getcompanybynumber?number=' + number)
        .then(res => {
          this.form = res.data
          // eslint-disable-next-line eqeqeq
          if (res.data.active == 1) { this.form.active = 0 } else { this.form.active = 1 }
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
