<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 社区表单
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="tableData != null" class="container">
      <el-table
        :data="tableData"
        border
        class="table"
        header-cell-class-name="table-header"
      >
        <el-table-column sortable prop="number" label="编号">
          <template slot-scope="{ row }">
            <span @click="toDetail(row.number)">
              <el-link type="primary">{{ row.number }}</el-link>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          sortable
          prop="name"
          label="社区"
        ></el-table-column>
        <el-table-column sortable prop="address" label="地址"></el-table-column>
        <el-table-column prop="number" v-if="ifshow">
          <template slot-scope="{ row }">
            <el-link  type="primary" @click="update(row.number, 1)">解除合作</el-link>
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
      tableData: null,
      ifshow: false,
      usercompany: null
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner 住户-我的社区
    // eslint-disable-next-line no-constant-condition
    if (false) {
      // 通过url的参数号码
      // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 1) {
      this.usercompany = localStorage.getItem('loginuser_commpany')
      // eslint-disable-next-line eqeqeq
      this.ifshow = localStorage.getItem('loginadmin') == 1 && localStorage.getItem('logintype') == 1
      this.getDataCommunityByCompany(localStorage.getItem('loginuser_commpany'))
    } else {
    }
  },
  methods: {
    getDataCommunityByCompany (companynumber) {
      axios
        .post('/getcommunity?type=2&number=1&company=' + companynumber)
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => {
          this.errorMessage('加载失败:' + err)
        })
    },
    update (number, type) {
      axios
        .post(
          '/updatecommunity?number=' + number + '&company=' + this.usercompany + '&type=' + type
        )
        .then(res => {
          if (res.data === 0) {
            this.errorMessage('操作失败：物业公司不匹配')
          } else {
            this.successMessage('操作成功')
            this.reFresh()
          }
        })
        .catch(err => {
          this.errorMessage('操作失败:' + err)
        })
    },
    toDetail (number) {
      this.$router.push({
        path: '/communitydetail',
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
          url: '/communitytable'
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
