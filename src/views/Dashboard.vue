<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:223px;">
                    <div class="user-info">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{employeeinfo.employeename}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        所属物业公司：
                        <span>{{employeeinfo.companyname}}</span>
                    </div>
                    <div class="user-info-list">
                        是否为超级管理员：
                        <span>{{employeeinfo.ifadmin}}</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <!-- emplyee row1 -->
                <el-row v-show="employeeshow" :gutter="24" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-document-add grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>创建</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-tickets grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{employeeinfo.newnumber}}</div>
                                    <div>新建</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-help grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{employeeinfo.inprogressnumber}}</div>
                                    <div>我的受理</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- emplyee row2 -->
                <el-row v-show="employeeshow" :gutter="24" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-warning-outline grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{employeeinfo.escalationnumber}}</div>
                                    <div>我的加急</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-4">
                                <i class="el-icon-warning grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{employeeinfo.emergencynumber}}</div>
                                    <div>我的逾期</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-5">
                                <i class="el-icon-finished grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{employeeinfo.resolvednumber}}</div>
                                    <div>已解决</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row v-show="householdshow" :gutter="24" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-document-add grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div>创建</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                     <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-h-1">
                                <i class="el-icon-tickets grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{employeeinfo.newnumber}}</div>
                                    <div>新建</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-h-2">
                                <i class="el-icon-help grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{employeeinfo.inprogressnumber}}</div>
                                    <div>受理中</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row v-show="householdshow" :gutter="24" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-h-3">
                                <i class="el-icon-warning-outline grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{employeeinfo.escalationnumber}}</div>
                                    <div>待补充</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-h-4">
                                <i class="el-icon-finished grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{employeeinfo.emergencynumber}}</div>
                                    <div>已解决</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-h-5">
                                <i class="el-icon-box grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{employeeinfo.emergencynumber}}</div>
                                    <div>已关闭</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="pie" class="schart" canvasId="pie" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart'
const axios = require('axios')
export default {
  name: 'dashboard',
  components: { Schart },
  data () {
    return {
      employeeshow: false,
      employeeinfo: null,
      householdshow: false,
      options: {
        type: 'bar',
        title: {
          text: '最近一周各品类销售图'
        },
        xRorate: 25,
        labels: [''],
        datasets: [
          {
            label: '新建',
            data: [234]
          },
          {
            label: '受理中',
            data: [144]
          },
          {
            label: '待补充',
            data: [104]
          },
          {
            label: '加急',
            data: [4]
          },
          {
            label: '逾期',
            data: [44]
          }
        ]
      },
      options2: {
        type: 'pie',
        title: {
          text: '饼图1'
        },
        titlePosition: 'bottom',
        labels: ['6月', '7月', '8月', '9月', '10月'],
        datasets: [
          {
            data: [234, 278, 270, 190, 230]
          }
        ]
      }
    }
  },
  mounted: function () {
    // 1-employee 2-Customer
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('logintype') == 1) {
      this.employeeshow = true
      this.getEmployeedash(localStorage.getItem('loginuser'))
    // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 2) {
      this.householdshow = true
    } else {

    }
  },
  methods: {
    getEmployeedash (number) {
      console.log(number)
      axios.post('/getemployeedash?number=1000000000')
        .then(res => {
          console.log(res.data)
          this.employeeinfo = res.data
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
        })
    }

  }
}
</script>

<style scoped>
.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-1 .grid-num {
    color:rgb(100, 213, 114);
}

.grid-con-2 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.grid-con-4 .grid-con-icon {
    background: rgb(172, 29, 4);
}

.grid-con-4 .grid-num {
    color: rgb(172, 29, 4);
}

.grid-con-5 .grid-con-icon {
    background: rgb(102, 171, 250);
}

.grid-con-5 .grid-num {
    color: rgb(102, 171, 250);
}

.grid-con-h-1 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-h-1 .grid-num {
    color:rgb(100, 213, 114);
}

.grid-con-h-2 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-h-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-h-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-h-3 .grid-num {
    color: rgb(242, 94, 67);
}

.grid-con-h-4 .grid-con-icon {
    background: rgb(102, 171, 250);
}

.grid-con-h-4 .grid-num {
    color: rgb(102, 171, 250);
}

.grid-con-h-5 .grid-con-icon {
    background: rgb(114, 132, 153);
}

.grid-con-h-5 .grid-num {
    color: rgb(114, 132, 153);
}

.mgb20 {
    margin-bottom: 20px;
}
.schart {
    width: 100%;
    height: 300px;
}
</style>
