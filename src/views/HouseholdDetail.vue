<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 用户
                </el-breadcrumb-item>
                <el-breadcrumb-item>住户信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="form" ref="form"  label-width="80px">
                    <!-- row1 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="id" prop="number">
                          <el-input v-model="form.number" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="手机号" prop="phone">
                          <el-input v-model="form.phone" :disabled="flag"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- row2 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="社区" prop="community">
                          <el-input v-model="form.community" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                          <el-input v-model="form.email" :disabled="flag"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- row4 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="楼号" prop="building">
                          <el-input v-model="form.building" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="" prop="active">
                          <el-checkbox label="使用中" :disabled="true" name="active"></el-checkbox>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button v-show="!flag" type="primary" @click="onSubmit('form')">表单提交</el-button>
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
      flag: true
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner  住户-我的信息
    // eslint-disable-next-line no-constant-condition
    // eslint-disable-next-line eqeqeq
    if (this.$route.query.from == 'internal') {
      this.GetHouseholdDetailByNumber(this.$route.query.number)
    // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 2) {
      this.flag = false
      this.GetHouseholdDetailByNumber(localStorage.getItem('loginuser'))
    } else {

    }
  },
  methods: {
    GetHouseholdDetailByNumber (number) {
      axios.post('/gethouseholds?type=1&company=0&number=' + number + '&community=0')
        .then(res => {
          this.form = res.data[0]
          // eslint-disable-next-line eqeqeq
          if (res.data[0].active == 0) {
            this.form.active = true
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
          // eslint-disable-next-line eqeqeq
          axios
            .post(
              '/updatehousehold?number=' + this.form.number + '&email=' + this.form.email + '&phone=' + this.form.phone
            )
            .then(res => {
              this.$message({
                message: '更新成功',
                type: 'success'
              })
              console.log(res.data)
              this.$router.push({
                path: '/loading',
                query: {
                  url: '/householddetail',
                  number: this.form.number
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
