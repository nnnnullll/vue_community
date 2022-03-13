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
                <el-table-column width="85px" sortable prop="state" label="状态" :filters="statetag" :filter-method="filterState" >
                    <template slot-scope="{row}">
                        <!-- 新建 提供解决方案 -->
                        <el-tag  v-if="row.state==1||row.state==5" type="success">{{statetag[row.state].text}}</el-tag>
                        <!-- 关闭 -->
                        <el-tag  v-else-if="row.state==3" type="warning">{{statetag[row.state].text}}</el-tag>
                        <!-- 待补充 -->
                        <el-tag  v-else-if="row.state==6" type="info">{{statetag[row.state].text}}</el-tag>
                        <!-- 受理中 维修中 -->
                        <el-tag  v-else type="">{{statetag[row.state].text}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column width="118px" sortable prop="fix_state" label="维修状态" :filters="fixstatetag" :filter-method="filterFix_state" filter-placement="bottom-end" >
                    <template slot-scope="{row}">
                        <!-- 提供解决方案 -->
                        <el-tag  v-if="row.fix_state==4" type="success">{{fixstatetag[row.state].text}}</el-tag>
                        <!-- 待分配 -->
                        <el-tag  v-else-if="row.fix_state==1" type="warning">{{fixstatetag[row.state].text}}</el-tag>
                        <!-- 已分配 维修中 -->
                        <el-tag  v-else-if="row.fix_state==2 || row.fix_state==3" type="">{{fixstatetag[row.state].text}}</el-tag>
                        <!-- empty -->
                        <div v-else></div>
                    </template>
                </el-table-column>
                <el-table-column width="85px" sortable prop="escalation" label="紧急" :filters="escalationtag" :filter-method="filterEscalation" filter-placement="bottom-end" >
                    <template slot-scope="{row}">
                        <el-tag v-show="row.escalation==1" type="danger">加急</el-tag>
                    </template>
                </el-table-column>
                <el-table-column width="85px" sortable prop="emergency" label="逾期" :filters="emergencytag" :filter-method="filterEmergency" filter-placement="bottom-end" >
                    <template slot-scope="{row}">
                        <el-tag v-show="row.emergency==1"  effect="dark" type="danger">逾期</el-tag>
                    </template>
                </el-table-column>
                <el-table-column width="103px" sortable prop="created" label="创建时间"></el-table-column>
                <el-table-column width="103px" sortable prop="updated" label="更新时间"></el-table-column>
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
        { text: '无需维修', value: 0 },
        { text: '待分配', value: 1 },
        { text: '已分配', value: 2 },
        { text: '维修中', value: 3 },
        { text: '已解决', value: 4 }
      ],
      escalationtag: [
        { text: '紧急', value: 1 },
        { text: '未紧急', value: 0 }
      ],
      emergencytag: [
        { text: '逾期', value: 1 },
        { text: '未逾期', value: 0 }
      ],
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
