<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 物业公司表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div v-if="tableData!=null" class="container">
            <el-button @click="clearFilter">清除所有过滤器</el-button>
            <el-table ref="filterTable" :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column sortable prop="number" label="编号">
                    <template slot-scope="{row}">
                        <span @click="toDetail(row.number)">
                            <el-link type="primary">{{ row.number }}</el-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="name" label="名字" :formatter="formatter"></el-table-column>
                <el-table-column sortable prop="address" label="地址"></el-table-column>
                <el-table-column width="85px" prop="active" label="使用中" :filters="activetag" :filter-method="filterActive" filter-placement="bottom-end" >
                    <template slot-scope="{row}">
                        <el-tag v-show="row.active==0" type="success">使用中</el-tag>
                    </template>
                </el-table-column>
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
      activetag: [
        { text: '使用中', value: 0 },
        { text: '已停用', value: 1 }
      ],
      tableData: null
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner 维修-我的合作物业
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('logintype') == 3) {
      this.getDataCompaniesByPartner(localStorage.getItem('loginuser'))
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
    getDataCompaniesByPartner (partner) {
      axios.post('/getcompanies?type=3&number=0&partner=' + partner)
        .then(res => {
          this.tableData = res.data
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
        })
    },
    toDetail (number) {
      this.$router.push({
        path: '/companydetail',
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
