<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 社区表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-button @click="clearFilter">清除所有过滤器</el-button>
            <el-table ref="filterTable" :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column width="73px" sortable prop="number" label="单号" @click="toCaseDetail(row.number)">
                    <template slot-scope="{row}">
                        <span @click="toCommunityDetail(row.number)">
                            <el-link type="primary">{{ row.number }}</el-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="name" label="社区名" :formatter="formatter"></el-table-column>
                <el-table-column sortable prop="region" label="地址"></el-table-column>
                <el-table-column width="85px" sortable prop="active" label="有效" :filters="activetag" :filter-method="filterActive" filter-placement="bottom-end" >
                    <template slot-scope="{row}">
                        <el-tag v-show="row.active==0" type="success">加急</el-tag>
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
      activetag: [
        { text: '服务中', value: 0 },
        { text: '暂定服务', value: 1 }
      ],
      tableData: []
    }
  },
  mounted: function () {
    // 1-employee 2-Customer
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('logintype') == 1) {
      this.getDataCommunityByCompany('100000000000000000')
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
    getDataCommunityByCompany (companynumber) {
      axios.post('/getcommunity?type=2&number=1&company=' + companynumber)
        .then(res => {
          console.log(res.data)
          this.tableData = res.data
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
        })
    },
    toCommunityDetail (communitynumber) {
      this.$router.push({
        path: '/communitydetail',
        query: {
          communitynumber: communitynumber
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
