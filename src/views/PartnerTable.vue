<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 维修公司表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div v-if="tableData!=null" class="container">
            <el-button type="primary" plain @click="clearFilter">清除所有过滤器</el-button>
            <el-table ref="filterTable" :data="tableData" border class="table" header-cell-class-name="table-header">
                <el-table-column width="100px" sortable prop="num" label="编号">
                    <template slot-scope="{row}">
                        <span @click="toDetail(row.num)">
                            <el-link type="primary">{{ row.num }}</el-link>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column sortable prop="name" label="名字" :formatter="formatter"></el-table-column>
                <el-table-column sortable prop="address" label="地址"></el-table-column>
                <el-table-column prop="phone" label="联系电话" width="110px"></el-table-column>
                <el-table-column prop="one" label="水管" width="63px" :filters="typetag" :filter-method="filterOne" filter-placement="bottom-end">
                  <template slot-scope="{row}">
                        <el-tag v-show="row.one==1"  effect="light" type="success">✔</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="two" label="电路" width="63px" :filters="typetag" :filter-method="filterTwo" filter-placement="bottom-end">
                  <template slot-scope="{row}">
                        <el-tag v-show="row.two==1"  effect="light" type="success">✔</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="three" label="绿化" width="63px" :filters="typetag" :filter-method="filterThree" filter-placement="bottom-end">
                  <template slot-scope="{row}">
                        <el-tag v-show="row.three==1"  effect="light" type="success">✔</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="four" label="公共设施" width="93px" :filters="typetag" :filter-method="filterFour" filter-placement="bottom-end">
                  <template slot-scope="{row}">
                        <el-tag v-show="row.four==1"  effect="light" type="success">✔</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="five" label="其他" width="63px" :filters="typetag" :filter-method="filterFive" filter-placement="bottom-end">
                  <template slot-scope="{row}">
                        <el-tag v-show="row.five==1"  effect="light" type="success">✔</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="active" label="接单中" width="76px" :filters="activetag" :filter-method="filterActive" filter-placement="bottom-end">
                  <template slot-scope="{row}">
                        <el-tag v-show="row.active==0"  effect="light" type="success">✔</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="num" v-if="ifshow">
                  <template slot-scope="{ row }">
                    <el-link v-show="row.active == 0" type="primary" @click="update(row.num)">解除合作</el-link>
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
      company: '',
      ifshow: false,
      tableData: null,
      typetag: [
        { text: '', value: 0 },
        { text: '✔', value: 1 }
      ],
      activetag: [
        { text: '', value: 1 },
        { text: '✔', value: 0 }
      ]
    }
  },
  mounted: function () {
    this.company = localStorage.getItem('loginuser_commpany')
    // eslint-disable-next-line eqeqeq
    this.ifshow = localStorage.getItem('loginadmin') == 1 && localStorage.getItem('logintype') == 1
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
    filterOne (value, row) {
      return row.one === value
    },
    filterTwo (value, row) {
      return row.two === value
    },
    filterThree (value, row) {
      return row.three === value
    },
    filterFour (value, row) {
      return row.four === value
    },
    filterFive (value, row) {
      return row.five === value
    },
    getDataPartnerByCompany (company) {
      axios.post('/getpartners?type=1&company=' + company)
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
        path: '/partnerdetail',
        query: {
          number: number,
          from: 'internal'
        }
      })
    },
    update (number) {
      axios
        .post(
          '/changerelationship?company=' + this.company + '&partner=' + number
        )
        .then(res => {
          this.successMessage('操作成功')
          this.reFresh()
        })
        .catch(err => {
          this.errorMessage('操作失败:' + err)
        })
    },
    reFresh () {
      this.$router.push({
        path: '/loading',
        query: {
          url: '/partnertable'
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
