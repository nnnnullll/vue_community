<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 用户
                </el-breadcrumb-item>
                <el-breadcrumb-item>个人信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="form" ref="form"  label-width="80px">
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
                    <!-- row4 -->
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
                                <el-checkbox label="超级管理员" :disabled="true" name="admin"></el-checkbox>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item label="" prop="active">
                                <el-checkbox label="账号使用中" :disabled="true" name="active"></el-checkbox>
                              </el-form-item>
                            </el-col>
                          </el-row>
                      </el-col>
                    </el-row>
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
      form: null
    }
  },
  mounted: function () {
    this.GetEmployeeDetailByNumber(localStorage.getItem('loginuser'))
  },
  methods: {
    GetEmployeeDetailByNumber (number) {
      axios.post('/getemployee?type=1&company=0&number=' + number)
        .then(res => {
          this.form = res.data[0]
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
