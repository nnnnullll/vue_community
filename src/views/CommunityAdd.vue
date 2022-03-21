<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 基本信息
                </el-breadcrumb-item>
                <el-breadcrumb-item>社区信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="form" ref="form"  label-width="80px">
                    <!-- row1 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="社区名" prop="name">
                          <el-input v-model="form.name" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="地址" prop="region">
                          <el-input v-model="form.region" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- row2 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="所属物业" prop="company">
                          <el-input v-model="form.company" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="" prop="active">
                          <el-checkbox label="使用中" :disabled="true" name="active"></el-checkbox>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- row4 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="楼数" prop="building_amount">
                          <el-input v-model="form.building_amount" :disabled="true"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="居民数" prop="household_amount">
                          <el-input v-model="form.household_amount" :disabled="true"></el-input>
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
    // 1-employee 2-Customer 3-partner 住户-我的社区
    // eslint-disable-next-line no-constant-condition
    // eslint-disable-next-line eqeqeq
    if (this.$route.query.from == 'internal') {
      this.GetHouseholdDetailByNumber(this.$route.query.number)
    // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 2) {
      console.log(localStorage.getItem('loginuser_commmunity'))
      this.GetHouseholdDetailByNumber(localStorage.getItem('loginuser_commmunity'))
    } else {

    }
  },
  methods: {
    GetHouseholdDetailByNumber (number) {
      axios.post('/getcommunitydetail?number=' + number)
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
