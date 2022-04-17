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
        <el-form :model="form" ref="form" label-width="130px">
          <!-- row1 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="编号" prop="num">
                <el-input v-model="form.num" :disabled="true"></el-input>
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
                <el-input v-model="form.address" :disabled="flag"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="" prop="active">
                <el-checkbox
                  label="使用中"
                  :disabled="flag"
                  name="form.active"
                  v-model="form.active"
                ></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- row4 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮件" prop="email">
                <el-input v-model="form.email" :disabled="flag"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model="form.phone" :disabled="flag"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- row4 -->
          <el-row>
            <el-col :span="2">
              <el-form-item label="服务类别" prop="one">
                <el-checkbox :disabled="flag" v-model="form.one"
                  >水管</el-checkbox
                >
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="two">
                <el-checkbox :disabled="flag" v-model="form.two"
                  >电路</el-checkbox
                >
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="three">
                <el-checkbox :disabled="flag" v-model="form.three"
                  >绿化</el-checkbox
                >
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="four">
                <el-checkbox :disabled="flag" v-model="form.four"
                  >公共设施</el-checkbox
                >
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="five">
                <el-checkbox :disabled="flag" v-model="form.five"
                  >其他</el-checkbox
                >
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="描述" prop="description">
                <el-input
                  v-model="form.description"
                  :disabled="flag"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button v-show="!flag" type="primary" @click="onSubmit('form')"
              >保存</el-button
            >
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
    // 1-employee 2-Customer 3-partner  维修员工-个人信息
    // eslint-disable-next-line eqeqeq
    if (this.$route.query.from == 'internal') {
      this.GetPartnerDetailByNumber(this.$route.query.number)
      // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 3) {
      this.flag = false
      this.GetPartnerDetailByNumber(localStorage.getItem('loginuser'))
    } else {
    }
  },
  methods: {
    GetPartnerDetailByNumber (number) {
      axios
        .post('/getpartnerbynum?num=' + number)
        .then(res => {
          this.form = res.data
          // eslint-disable-next-line eqeqeq
          if (res.data.active == 0) {
            this.form.active = true
          } else {
            this.form.active = false
          }
          // eslint-disable-next-line eqeqeq
          if (res.data.one == 1) {
            this.form.one = true
          } else {
            this.form.one = false
          }
          // eslint-disable-next-line eqeqeq
          if (res.data.two == 2) {
            this.form.two = true
          } else {
            this.form.two = false
          }
          // eslint-disable-next-line eqeqeq
          if (res.data.three == 3) {
            this.form.three = true
          } else {
            this.form.three = false
          }
          // eslint-disable-next-line eqeqeq
          if (res.data.four == 4) {
            this.form.four = true
          } else {
            this.form.four = false
          }
          // eslint-disable-next-line eqeqeq
          if (res.data.five == 5) {
            this.form.five = true
          } else {
            this.form.five = false
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
              '/updatepartner?num=' + this.form.num + '&address=' + this.form.address +
                '&phone=' + this.form.phone + '&email=' + this.form.email + '&description=' + this.form.description +
                // eslint-disable-next-line eqeqeq
                '&one=' + (this.form.one == true ? 1 : 0) + '&two=' + (this.form.two == true ? 1 : 0) + '&three=' + (this.form.three == true ? 1 : 0) + '&four=' + (this.form.four == true ? 1 : 0) + '&five=' + (this.form.five == true ? 1 : 0)
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
                  url: '/partnerdetail',
                  number: this.form.num
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
