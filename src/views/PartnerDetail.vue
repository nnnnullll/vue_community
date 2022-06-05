<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb>
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 维修方基本信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="form!=null" class="container">
      <div class="form-box">
        <el-form :model="form" ref="form" :rules="rules"  label-width="130px">
           <div style="width: 100%;height: 60px;">
            <el-button v-show="!flag" style="margin-right: 30px; float:right;" type="primary" @click="onSubmit('form',1,0)">保存</el-button>
            <el-button v-show="!flag&&!form.active" style="margin-right: 30px; float:right;" type="primary" @click="onSubmit('form',3,!form.active)">恢复接单</el-button>
            <el-button v-show="!flag&&form.active" style="margin-right: 30px; float:right;" type="primary" @click="onSubmit('form',3,!form.active)">停止接单</el-button>
            <el-button v-show="admin && form.active && form.ispartner==1" style="margin-right: 30px; float:right;" type="primary" @click="update(form.num)">建立合作</el-button>
            <el-button v-show="admin && form.active && form.ispartner==0" style="margin-right: 30px; float:right;" type="primary" @click="update(form.num)">解除合作</el-button>
          </div>
          <!-- row1 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="编号" prop="num">
                <el-input v-model="form.num" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="名称" prop="name">
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
              <el-form-item prop="active">
                <el-checkbox v-model="form.active" :disabled="true">接单中</el-checkbox>
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
                <el-checkbox :disabled="flag" v-model="form.one">水管</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="two">
                <el-checkbox :disabled="flag" v-model="form.two">电路</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="three">
                <el-checkbox :disabled="flag" v-model="form.three">绿化</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="four">
                <el-checkbox :disabled="flag" v-model="form.four">公共设施</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item prop="five">
                <el-checkbox :disabled="flag" v-model="form.five">其他</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="描述" prop="description">
                <el-input
                  v-model="form.description"
                  :disabled="flag"
                  type="textarea"
                ></el-input>
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
      admin: false,
      company: null,
      form: null,
      flag: true,
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
    this.company = localStorage.getItem('loginuser_commpany')
    // eslint-disable-next-line eqeqeq
    this.admin = localStorage.getItem('loginadmin') == 1 && localStorage.getItem('logintype') == 1
    // 1-employee 2-Customer 3-partner  维修员工-个人信息
    if (this.$route.query.from === 'internal') {
      this.GetPartnerDetailByNumber(this.$route.query.number, localStorage.getItem('loginuser_commpany'))
    // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 3) {
      this.flag = false
      this.GetPartnerDetailByNumber(localStorage.getItem('loginuser'), '0')
    } else {
    }
  },
  methods: {
    GetPartnerDetailByNumber (number, company) {
      axios
        .post('/getpartnerbynum?num=' + number + '&company=' + company)
        .then(res => {
          this.form = res.data
          this.form.active = res.data.active === 0
          this.form.one = res.data.one === 1
          this.form.two = res.data.two === 1
          this.form.three = res.data.three === 1
          this.form.four = res.data.four === 1
          this.form.five = res.data.five === 1
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
        })
    },
    onSubmit (formName, type, active) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post(
              '/updatepartner?num=' + this.form.num + '&address=' + this.form.address + '&phone=' + this.form.phone +
              '&email=' + this.form.email + '&description=' + this.form.description + '&type=' + type + '&oldpassword=0&password=0' +
              '&one=' + (this.form.one === true ? 1 : 0) + '&two=' + (this.form.two === true ? 1 : 0) + '&three=' +
              (this.form.three === true ? 1 : 0) + '&four=' + (this.form.four === true ? 1 : 0) + '&five=' +
              (this.form.five === true ? 1 : 0) + '&active=' + (active === true ? 0 : 1)
            )
            .then(res => {
              this.successMessage('更新成功！')
              this.reFreshmine(this.form.num)
            })
            .catch(err => {
              this.errorMessage('更新失败：' + err)
            })
        } else {
          this.$message.error('请输入必填项')
          return false
        }
      })
    },
    update (number) {
      axios
        .post(
          '/changerelationship?company=' + this.company + '&partner=' + number
        )
        .then(res => {
          if (res.data === 0) {
            this.errorMessage('操作失败：该维修公司名下任有未完成的维修单')
          } else {
            this.successMessage('操作成功')
            this.reFresh(number)
          }
        })
        .catch(err => {
          this.errorMessage('操作失败:' + err)
        })
    },
    reFresh (number) {
      this.$router.push({
        path: '/loading',
        query: {
          url: '/partnerdetail',
          number: number,
          from: 'internal'
        }
      })
    },
    reFreshmine (number) {
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
