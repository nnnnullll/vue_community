<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 维修公司表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button @click="clearFilter">清除所有过滤器</el-button>
            <el-table ref="filterTable" :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column width="73px" sortable prop="num" label="单号">
                    <template slot-scope="{row}">
                        <span @click="toDetail(row.num)">
                            <el-link type="primary">{{ row.num }}</el-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="name" label="名字" :formatter="formatter"></el-table-column>
                <el-table-column sortable prop="address" label="地址"></el-table-column>
                <el-table-column sortable prop="email" label="邮箱"></el-table-column>
                <el-table-column sortable prop="phone" label="联系电话"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner  物业员工-合作的维修公司
    // eslint-disable-next-line no-constant-condition
    if (false) {
    // 通过url的参数号码
    // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 1) {
      this.getDataPartnerByCompany(localStorage.getItem('loginuser_commpany'))
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
    filterActive (value, row) {
      return row.active === value
    },
    getDataPartnerByCompany (company) {
      axios.post('/getpartners?type=1&company=' + company)
        .then(res => {
          console.log(res.data)
          this.tableData = res.data
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
        })
    },
    toDetail (number) {
      this.$router.push({
        path: '/partnerdetail',
        query: {
          number: number,
          from: 'internal'
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
