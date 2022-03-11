<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 投诉单表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.address" placeholder="状态" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                <el-table-column sortable prop="number" label="单号" @click="toCaseDetail(row.number)">
                    <template slot-scope="{row}">
                        <span @click="toCaseDetail(row.number)">
                            <el-link type="primary">{{ row.number }}</el-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="subject" label="标题"></el-table-column>
                <el-table-column sortable prop="state" label="状态"></el-table-column>
                <el-table-column sortable prop="created" label="创建时间"></el-table-column>
                <el-table-column sortable prop="updated" label="更新时间"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      statetag: [
        { name: '新建', type: 'success' },
        { name: '受理中', type: '' },
        { name: '待补充', type: '' },
        { name: '维修中', type: '' },
        { name: '已解决', type: 'success' },
        { name: '关闭', type: 'success' }
      ],
      query: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: []
    }
  },
  mounted: function () {
    // 1-employee 2-Customer
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('logintype') == 2) {
      this.getDataByHouseholdNumber(localStorage.getItem('loginuser'))
    }
  },
  methods: {
    getDataByHouseholdNumber (householdNumber) {
      axios.post('/getcasebyhouseholdnumber?householdnumber=' + householdNumber)
        .then(res => {
          this.tableData = res.data
          this.pageTotal = res.data.length
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
        })
    },
    toCaseDetail (casenumber) {
      this.$router.push({
        path: '/casedetail',
        query: {
          casenumber: casenumber
        }
      })
    },
    // 查询操作
    handleSearch () {
    //   query.pageIndex = 1
    // this.getData()
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
