<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 住户表单
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button @click="clearFilter">清除所有过滤器</el-button>
            <el-table ref="filterTable" :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column width="73px" sortable prop="number" label="单号">
                    <template slot-scope="{row}">
                        <span @click="toDetail(row.number)">
                            <el-link type="primary">{{ row.number }}</el-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="community" label="社区号"></el-table-column>
                <el-table-column sortable prop="building" label="楼号" ></el-table-column>
                <el-table-column sortable prop="room_number" label="门牌号"></el-table-column>
                <el-table-column sortable prop="email" label="邮箱"></el-table-column>
                <el-table-column sortable prop="phone" label="联系电话" :formatter="formatter"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      activetag: [
        { text: '服务中', value: 0 },
        { text: '暂定服务', value: 1 }
      ],
      tableData: []
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner  物业员工-住户表单
    // eslint-disable-next-line no-constant-condition
    if (false) {
    // 通过url的参数号码
    // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 1) {
      this.getDataHouseholdByCompany(localStorage.getItem('loginuser_commpany'))
    } else {

    }
  },
  methods: {
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      return row.phone
    },
    filterActive (value, row) {
      return row.active === value
    },
    getDataHouseholdByCompany (company) {
      axios.post('/gethouseholds?type=3&company=' + company + '&number=0&community=0')
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
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
