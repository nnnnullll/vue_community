<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 投诉单表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div v-if="tableData!=null" class="container">
            <el-button @click="clearFilter">清除所有过滤器</el-button>
            <el-table ref="filterTable" :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column width="73px" sortable prop="number" label="单号" @click="toCaseDetail(row.number)">
                    <template slot-scope="{row}">
                        <span @click="toCaseDetail(row.number)">
                            <el-link type="primary">{{ row.number }}</el-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="subject" label="标题" :formatter="formatter"></el-table-column>
                <!--  -->
                <el-table-column  sortable prop="community_n" label="社区"></el-table-column>
                <el-table-column  sortable prop="company_n" label="物业"></el-table-column>
                <el-table-column  sortable prop="assigned_to_n" label="受理人"></el-table-column>
                <el-table-column sortable prop="fix_assigned_to_n" label="维修方"></el-table-column>
                <el-table-column width="103px" sortable prop="created" label="创建时间"></el-table-column>
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
        { text: '新建', value: 0 },
        { text: '受理中', value: 1 },
        { text: '待补充', value: 2 },
        { text: '维修中', value: 3 },
        { text: '已解决', value: 4 },
        { text: '关闭', value: 5 }
      ],
      fixstatetag: [
        { text: '空', value: 0 },
        { text: '待分配', value: 1 },
        { text: '已分配', value: 2 },
        { text: '维修中', value: 3 },
        { text: '已解决', value: 4 }
      ],
      escalationtag: [
        { text: '加急', value: 1 },
        { text: '未加急', value: 0 }
      ],
      emergencytag: [
        { text: '逾期', value: 1 },
        { text: '未逾期', value: 0 }
      ],
      tableData: null
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('logintype') == 1) {
      this.getData(localStorage.getItem('loginuser'), 6, '')
      // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 2) {
      this.getData(localStorage.getItem('loginuser'), 7, '')
    } else {
      this.getData(localStorage.getItem('loginuser'), 8, '')
    }
  },
  methods: {
    clearFilter () {
      this.$refs.filterTable.clearFilter()
    },
    formatter (row, column) {
      return row.subject
    },
    filterFix_state (value, row) {
      return row.fix_state === value
    },
    filterEscalation (value, row) {
      return row.escalation === value
    },
    filterEmergency (value, row) {
      return row.emergency === value
    },
    filterState (value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    // 1-employee 2-Customer 3-partner
    getData (number, type, company) {
      axios.post('/getcaselist?number=' + number + '&type=' + type + '&company=' + company)
        .then(res => {
          console.log(res.data)
          this.tableData = res.data
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
        })
    },
    toCaseDetail (casenumber) {
      this.$router.push({
        path: '/casedetail',
        query: {
          casenumber: casenumber
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
