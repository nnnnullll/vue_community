<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 物业员工表格
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="tableData!=null" class="container">
      <el-button type="primary" plain @click="clearFilter">清除所有过滤器</el-button>
      <el-table ref="filterTable" :data="tableData" border class="table" header-cell-class-name="table-header">
        <el-table-column sortable prop="number" label="工号">
          <template slot-scope="{ row }">
              <el-link @click="toDetail(row.number)" type="primary">{{ row.number }}</el-link>
          </template>
        </el-table-column>
        <el-table-column sortable prop="name" label="名字" :formatter="formatter"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="联系电话"></el-table-column>
        <el-table-column prop="admin" label="管理员" width="75px" :filters="admin" :filter-method="filterAdmin" filter-placement="bottom-end">
          <template slot-scope="{ row }">
            <el-tag v-show="row.admin == 1" effect="light" type="success">✔</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="admin" label="在职" width="61px" :filters="active" :filter-method="filterActive" filter-placement="bottom-end">
          <template slot-scope="{ row }">
            <el-tag v-show="row.active == 0" effect="light" type="success">✔</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="number" v-if="ifshow">
          <template slot-scope="{ row }">
            <el-link v-show="row.active == 0" type="primary" @click="update(row.number, 5)">重置密码</el-link>
            <el-link v-show="row.active == 0 && minename != row.number" type="primary" @click="update(row.number, 2)">离职</el-link>
            <el-link v-show="row.active != 0 && minename != row.number" type="primary" @click="update(row.number, 2)">复职</el-link>
            <el-link v-show="row.admin != 1 && minename != row.number" type="primary" @click="update(row.number, 3)">授予管理员</el-link>
            <el-link v-show="row.admin == 1 && minename != row.number" type="primary"  @click="update(row.number, 3)">撤销管理员</el-link >
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
      ifshow: false,
      usertype: null,
      minename: '',
      tableData: null,
      admin: [
        { text: '非管理员', value: 0 },
        { text: '管理员', value: 1 }
      ],
      active: [
        { text: '已离职', value: 1 },
        { text: '在职中', value: 0 }
      ]
    }
  },
  mounted: function () {
    this.usertype = localStorage.getItem('logintype')
    // eslint-disable-next-line eqeqeq
    this.ifshow = localStorage.getItem('loginadmin') == 1
    this.minename = localStorage.getItem('loginuser')
    // 1-employee 2-Customer 3-partner  员工-我的同事
    // eslint-disable-next-line no-constant-condition
    if (false) {
    // 通过url的参数号码
    // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 1) {
      this.getDataEmploysByCompany(localStorage.getItem('loginuser_commpany'))
    } else {
    }
  },
  methods: {
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      return row.name
    },
    filterAdmin (value, row) {
      return row.admin === value
    },
    filterActive (value, row) {
      return row.active === value
    },
    getDataEmploysByCompany (company) {
      axios
        .post('/getemployee?type=2&number=1&company=' + company)
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => {
          this.errorMessage('加载失败:' + err)
        })
    },
    // type=2 active/inactive
    // type=3 admin/deadmin
    update (number, type) {
      axios
        .post(
          '/updateemployee?number=' + number + '&email=0&phone=0&oldpassword=0&password=0&type=' + type
        )
        .then(res => {
          this.successMessage('操作成功')
          this.reFresh()
        })
        .catch(err => {
          this.errorMessage('操作失败:' + err)
        })
    },
    toDetail (number) {
      this.$router.push({
        path: '/employeedetail',
        query: {
          number: number,
          from: 'internal'
        }
      })
    },
    reFresh () {
      this.$router.push({
        path: '/loading',
        query: {
          url: '/employeetable'
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

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
