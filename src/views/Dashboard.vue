<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:223px;">
                    <div class="user-info">
                        <div class="user-info-cont">
                            <div class="user-info-name">{{logininfo.loginname}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        <span>{{logininfo.line1}}</span>
                    </div>
                    <div class="user-info-list">
                        <span>{{logininfo.line2}}</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <!-- emplyee row1 -->
                <el-row v-if="employeeshow" :gutter="24" class="mgb20">
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
                                    <div class="grid-num">{{logininfo.newnumber}}</div>
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
                                    <div class="grid-num">{{logininfo.inprogressnumber}}</div>
                                    <div>我的受理</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- emplyee row2 -->
                <el-row v-if="employeeshow" :gutter="24" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-warning-outline grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{logininfo.escalationnumber}}</div>
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
                                    <div class="grid-num">{{logininfo.emergencynumber}}</div>
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
                                    <div class="grid-num">{{logininfo.resolvednumber}}</div>
                                    <div>已解决</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row v-if="householdshow" :gutter="24" class="mgb20">
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
                                    <div class="grid-num">{{logininfo.newnumber}}</div>
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
                                    <div class="grid-num">{{logininfo.inprogressnumber}}</div>
                                    <div>受理中</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row v-if="householdshow" :gutter="24" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-h-3">
                                <i class="el-icon-warning-outline grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{logininfo.escalationnumber}}</div>
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
                                    <div class="grid-num">{{logininfo.emergencynumber}}</div>
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
                                    <div class="grid-num">{{logininfo.emergencynumber}}</div>
                                    <div>已关闭</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                 <el-row v-if="partnershow" :gutter="24" class="mgb20">
                     <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-h-1">
                                <i class="el-icon-tickets grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{logininfo.fixwaite_number}}</div>
                                    <div>待分配</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-h-2">
                                <i class="el-icon-tickets grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{logininfo.fixassigned_number}}</div>
                                    <div>被分配</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-h-3">
                                <i class="el-icon-help grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{logininfo.infix_number}}</div>
                                    <div>维修中</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row v-if="partnershow" :gutter="24" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{ padding: '0px' }">
                            <div class="grid-content grid-con-h-4">
                                <i class="el-icon-finished grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{logininfo.fixfinish_number}}</div>
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
                                    <div class="grid-num">{{logininfo.fixclose_number}}</div>
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
                    <schart height="400px" ref="bar" class="schart" canvasId="bar" :options="options"></schart>
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
      logininfo: null, // type=2时 就是householdinfo
      householdshow: false,
      partnershow: false,
      options: {
        type: 'bar',
        title: {
          text: ''
        },
        xRorate: 25,
        labels: [''],
        datasets: [
          {
            label: '',
            data: []
          },
          {
            label: '',
            data: []
          },
          {
            label: '',
            data: []
          },
          {
            label: '',
            data: []
          },
          {
            label: '',
            data: []
          }
        ]
      },
      options2: {
        type: 'pie',
        title: {
          text: ''
        },
        titlePosition: 'bottom',
        labels: [],
        datasets: [
          {
            data: []
          }
        ]
      }
    }
  },
  mounted: function () {
    this.initialLoginDash(localStorage.getItem('loginuser'), localStorage.getItem('logintype'))
  },
  methods: {
    initialLoginDash (number, type) {
    // 1-employee 2-Customer 3-partner
    // eslint-disable-next-line eqeqeq
      if (type == 1) {
        this.employeeshow = true
        // eslint-disable-next-line eqeqeq
      } else if (type == 2) {
        this.householdshow = true
      } else {
        this.partnershow = true
      }
      this.getLogindash(number, type)
    },
    getLogindash (number, type) {
      axios.post('/getlogindash?number=' + number + '&type=' + type)
        .then(res => {
          console.log(res.data)
          this.logininfo = res.data
          this.options.title.text = res.data.stateChartTitle
          this.options.datasets[0].data[0] = res.data.statechart[0]
          this.options.datasets[1].data[0] = res.data.statechart[1]
          this.options.datasets[2].data[0] = res.data.statechart[2]
          this.options.datasets[3].data[0] = res.data.statechart[3]
          this.options.datasets[4].data[0] = res.data.statechart[4]
          this.options.datasets[0].label = res.data.stateChartLabels[0]
          this.options.datasets[1].label = res.data.stateChartLabels[1]
          this.options.datasets[2].label = res.data.stateChartLabels[2]
          this.options.datasets[3].label = res.data.stateChartLabels[3]
          this.options.datasets[4].label = res.data.stateChartLabels[4]
          this.options2.title.text = res.data.typeChartTitle
          this.options2.datasets[0].data = res.data.typechart
          this.options2.labels = res.data.typeChartLabels
          // eslint-disable-next-line eqeqeq
          if (type == 1) {
            localStorage.setItem('loginuser_commpany', res.data.companynumber)
            // eslint-disable-next-line eqeqeq
          } else if (type == 2) {
            localStorage.setItem('loginuser_commpany', res.data.companynumber)
            // console.log(localStorage.getItem('loginuser_commpany'))
            localStorage.setItem('loginuser_commmunity', res.data.communitynumber)
          } else {
          }
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
