<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb>
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 社区基本信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="form != null" class="container">
      <div class="form-box">
        <el-form :model="form" ref="form" label-width="80px">
          <div style="width: 100%;height: 60px;">
            <el-button style="margin-right: 30px; float:right;" v-if="form.company==usercompany"  type="primary" @click="update(form.number, 1)">解除合作</el-button>
            <el-button style="margin-right: 30px; float:right;" v-if="form.company==null" type="primary" @click="update(form.number, 2)">建立合作</el-button>
          </div>
          <!-- row1 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="社区名" prop="name">
                <el-input v-model="form.name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址" prop="address">
                <el-input v-model="form.address" :disabled="true"></el-input>
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
                <el-checkbox
                  label="使用中"
                  :disabled="true"
                  v-model="form.active"
                ></el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- row4 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="楼数" prop="building_amount">
                <el-input
                  v-model="form.building_amount"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="居民数" prop="household_amount">
                <el-input
                  v-model="form.household_amount"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div v-if="form != null&&usercompany!=null" class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> {{form.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item>住户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <div v-if="tableData!=null&&usercompany!=null" class="container">
      <el-table ref="filterTable" :data="tableData" border class="table" header-cell-class-name="table-header">
        <el-table-column sortable prop="number" label="编号">
          <template slot-scope="{ row }">
              <el-link @click="toDetail(row.number)" type="primary">{{ row.number }}</el-link>
          </template>
        </el-table-column>
        <el-table-column sortable prop="building" label="楼号" ></el-table-column>
        <el-table-column sortable prop="room_number" label="门牌号"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="number" v-if="ifshow">
          <template slot-scope="{ row }">
            <el-link type="primary" @click="reset(row.number)">重置密码</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      form: null,
      tableData: null,
      ifshow: null,
      usercompany: null
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner 住户-我的社区
    // eslint-disable-next-line eqeqeq
    if (this.$route.query.from == 'internal') {
      this.usercompany = localStorage.getItem('loginuser_commpany')
      // eslint-disable-next-line eqeqeq
      this.ifshow = localStorage.getItem('loginadmin') == 1 && localStorage.getItem('logintype') == 1
      this.GetCommunitiesByNumber(this.$route.query.number)
      // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 2) {
      this.GetCommunitiesByNumber(localStorage.getItem('loginuser_commmunity'))
    } else {
    }
  },
  methods: {
    GetCommunitiesByNumber (number) {
      axios
        .post('/getcommunitydetail?number=' + number)
        .then(res => {
          this.form = res.data
          this.form.active = res.data.active === 0
          this.tableData = res.data.households
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
        })
    },
    update (number, type) {
      axios
        .post(
          '/updatecommunity?number=' + number + '&company=' + this.usercompany + '&type=' + type
        )
        .then(res => {
          if (type === 1) {
            if (res.data === 2) {
              this.errorMessage('操作失败: 该社区名下任有未处理完的投诉单')
            } else if (res.data === 0) {
              this.errorMessage('操作失败: 该社区已不是该物业公司的合作社区')
            } else {
              this.successMessage('操作成功')
            }
          } else {
            if (res.data === 0) {
              this.errorMessage('操作失败：该社区已有合作物业公司')
            } else {
              this.successMessage('操作成功')
            }
          }
          this.reFresh(number)
        })
        .catch(err => {
          this.errorMessage('操作失败:' + err)
        })
    },
    reset (number) {
      axios
        .post(
          '/updatehousehold?number=' +
                number +
                '&email=0&phone=0&type=3&oldpassword=0&password=0'
        )
        .then(res => {
          this.successMessage('操作成功')
        })
        .catch(err => {
          this.errorMessage('操作失败：' + err)
        })
    },
    toDetail (number) {
      this.$router.push({
        path: '/householddetail',
        query: {
          number: number,
          from: 'internal'
        }
      })
    },
    reFresh (number) {
      this.$router.push({
        path: '/loading',
        query: {
          url: '/communitydetail',
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
