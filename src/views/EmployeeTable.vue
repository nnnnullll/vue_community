<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 物业员工表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
          <el-button type="primary" plain @click="clearFilter">清除所有过滤器</el-button>
          <el-table ref="filterTable" :data="tableData" border class="table" header-cell-class-name="table-header">
            <el-table-column sortable prop="number" label="工号">
              <template slot-scope="{row}">
                <span @click="toDetail(row.number)">
                  <el-link type="primary">{{ row.number }}</el-link>
                </span>
              </template>
              </el-table-column>
              <el-table-column sortable prop="name" label="名字" :formatter="formatter"></el-table-column>
              <el-table-column sortable prop="email" label="邮箱"></el-table-column>
              <el-table-column sortable prop="phone" label="联系电话"></el-table-column>
              <el-table-column prop="admin" label="管理员" width="75px" :filters="admin" :filter-method="filterAdmin" filter-placement="bottom-end">
                <template slot-scope="{row}">
                  <el-tag v-show="row.admin==1"  effect="light" type="success">✔</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="admin" label="在职" width="61px" :filters="active" :filter-method="filterActive" filter-placement="bottom-end">
                <template slot-scope="{row}">
                  <el-tag v-show="row.active==0"  effect="light" type="success">✔</el-tag>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="{row}">
                  <el-link v-show="row.active==0?true:false" type="primary" @click="onLeave(row.number)">离职</el-link>
                  <el-link v-show="row.active!=0?true:false" type="primary" @click="onLeave(row.number)">复职</el-link>
                  <el-link v-show="row.admin!=1?true:false" type="primary" @click="giveAdmin(row.number)">授予管理员</el-link>
                  <el-link v-show="row.admin==1?true:false" type="primary" @click="giveAdmin(row.number)">撤销管理员</el-link>
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
      usertype: null,
      tableData: [],
      admin: [
        { text: '', value: 0 },
        { text: '✔', value: 1 }
      ],
      active: [
        { text: '', value: 1 },
        { text: '✔', value: 0 }
      ]
    }
  },
  mounted: function () {
    this.usertype = localStorage.getItem('logintype')
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
      axios.post('/getemployee?type=2&number=1&company=' + company)
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
        })
    },
    onLeave (number) {
      axios.post('/updateemployee?number=' + number + '&email=0&phone=0&type=2')
        .then(res => {
          this.reFresh()
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
        })
    },
    giveAdmin (number) {
      axios.post('/updateemployee?number=' + number + '&email=0&phone=0&type=3')
        .then(res => {
          this.reFresh()
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
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
