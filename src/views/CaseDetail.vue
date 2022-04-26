<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 投诉单
                </el-breadcrumb-item>
                <el-breadcrumb-item>详细信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div  v-if="form!=null" class="container">
            <!-- 2-Customer 1-employee 3-partner -->
            <div style="width: 100%;height: 60px;">
            <!-- 物业员工 -->
              <!-- 分配给我（状态新建时能看见） -->
              <el-button v-show="usertype==1&&(form.state==0||form.state==1||form.state==2||form.state==3)" style="margin-right: 30px; float:right;" type="primary" @click="clickbuttonlist(1)">受理</el-button>
              <!-- 待补充（状态受理中时能看见） -->
              <el-button v-show="usertype==1&&form.state==1&&form.fix_state==null" style="margin-right: 10px; float:right;" type="primary" @click="clickbuttonlist(2)">待补充</el-button>
              <!-- 分配维修（状态受理中/维修中时能看见） -->
              <el-button v-show="usertype==1&&(form.state==1||(form.state==3&&(form.fix_state==1||form.fix_state==4)))" style="float:right;" type="primary" @click="clickbuttonlist(3)">分配维修</el-button>
              <!-- 已解决（状态受理中/维修中时能看见） -->
              <el-button v-show="usertype==1&&(form.state==1||(form.state==3&&form.fix_state==4))" style="float:right;" type="primary" @click="clickbuttonlist(4)">解决</el-button>
            <!-- 维修方 -->
              <!--维修员 接受（状态室维修中-3 维修状态是已分配_2时能看见）  -->
              <el-button v-show="usertype==3&&form.state==3&&form.fix_state==2" style="float:right;" type="primary" @click="clickbuttonlist(5)">接受维修单</el-button>
              <!--维修员 拒绝（状态室维修中-3 维修状态是已分配_2时能看见）  -->
              <el-button v-show="usertype==3&&form.state==3&&form.fix_state==2" style="float:right;" type="primary" @click="clickbuttonlist(6)">拒绝维修单</el-button>
              <!--维修员 完成（状态室维修中-3 维修状态是维修中_3时能看见）  -->
              <el-button v-show="usertype==3&&form.state==3&&form.fix_state==3" style="float:right;" type="primary" @click="clickbuttonlist(7)">完成维修单</el-button>
              <!-- 关闭（只有household看见） -->
              <el-button v-show="usertype==2&&form.state!=5" style="float:right;" type="primary" @click="clickbuttonlist(11)">关闭</el-button>
            </div>
            <div class="form-box">
                <el-form :model="form" ref="form"  label-width="80px">
                    <!-- row1 -->
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单号" prop="number">
                                <el-input v-model="form.number" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="物业" prop="company.name">
                                <el-input v-model="form.company.name" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="更新时间" prop="updated">
                                <el-input v-model="form.updated" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- row2 -->
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="社区" prop="community.name">
                                <el-input v-model="form.community.name" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="住户" prop="household.name">
                                <el-input v-model="form.household.name" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="创建时间" prop="created">
                                <el-input v-model="form.created" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- row3 -->
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="受理人" prop="assigned_to.name">
                                <!-- 只有物业员工才能编辑 -->
                                <el-input v-model="form.assigned_to.name" :disabled="usertype==1?false:true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维修方" prop="fix_assigned_to.name">
                                <!-- 只有物业员工才能编辑 -->
                                <el-input v-model="form.fix_assigned_to.name" :disabled="usertype==1?false:true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="" prop="escalation">
                                        <el-checkbox label="加急" name="escalation" :disabled="true"></el-checkbox>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="" prop="emergency">
                                        <el-checkbox label="逾期" name="emergency" :disabled="true"></el-checkbox>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <!-- row4 -->
                    <el-row>
                         <el-col :span="8">
                            <el-form-item label="状态" prop="state">
                              <!-- 只有物业员工才能编辑state -->
                                <el-select v-model="form.state"  placeholder="请选择"  :disabled="true">
                                    <el-option v-for="item in statelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维修状态" prop="fix_state">
                              <!-- 只有物业员工才能编辑fix_state -->
                                <el-select v-model="form.fix_state"  placeholder="请选择" :disabled="true">
                                    <el-option v-for="item1 in fix_statelist" :key="item1.value" :label="item1.label" :value="item1.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="类别" prop="type">
                                <!-- 只有物业员工才能编辑 -->
                                <el-select v-model="form.type" placeholder="请选择" :disabled="true">
                                    <el-option v-for="item in typelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="标题" prop="subject">
                        <el-input v-model="form.subject" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="具体描述" prop="description">
                        <el-input type="textarea" rows="5" v-model="form.description" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <template>
                           <el-tabs v-model="activeName">
                            <el-tab-pane label="历史记录" name="first">
                              <el-form-item label="留言" prop="message">
                                  <el-input type="textarea" rows="5" v-model="message" :disabled="form.state==5?true:false"></el-input>
                                  <el-button style="margin-top: 20px; float:right;" type="primary" @click="clickbuttonlist(11)">留言</el-button>
                              </el-form-item>
                              <el-form-item style="margin-top: 20px;" label="历史记录" prop="activity">
                                <div v-for="(ac, index) in form.activities" :key="index">
                                  <el-card v-if="ac.updated_role==1" class="box-card" style="border-left: 4px solid rgb(66, 128, 8);">
                                    <div slot="header" class="clearfix">
                                      <span>物业员工: {{ac.updated_name}}</span>
                                      <span style="float: right">{{ac.updated}}</span>
                                    </div>
                                    <div style="color:#68696d;">{{ac.message}}</div>
                                  </el-card>
                                  <el-card v-else-if="ac.updated_role==2" class="box-card" style="border-left: 4px solid rgb(44, 154, 250)">
                                    <div slot="header" class="clearfix">
                                      <span>住户：{{ac.updated_name}}</span>
                                      <span style="float: right">{{ac.updated}}</span>
                                    </div>
                                    <div style="color:#68696d;">{{ac.message}}</div>
                                  </el-card>
                                  <el-card v-else class="box-card" style="border-left: 4px solid rgb(182, 107, 10)">
                                    <div slot="header" class="clearfix">
                                      <span>维修方: {{ac.updated_name}}</span>
                                      <span style="float: right">{{ac.updated}}</span>
                                    </div>
                                    <div style="color:#68696d">{{ac.message}}</div>
                                  </el-card>
                                </div>
                              </el-form-item>
                            </el-tab-pane>
                            <el-tab-pane label="提供解决方案" name="second">
                              <el-form-item label="解决方案" prop="solution">
                                  <el-input type="textarea" rows="5" v-model="form.solution" :disabled="usertype==1&&(form.state==1||(form.state==3&&form.fix_state==4))?false:true"></el-input>
                              </el-form-item>
                            </el-tab-pane>
                          </el-tabs>
                      </template>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      form: null,
      // 通过user的身份设置某些字段是否可以编辑 按钮是否可见
      usertype: null,
      username: null,
      message: null,
      // 选项卡
      activeName: 'first',
      typelist: [
        {
          label: '水管',
          value: 1
        },
        {
          label: '电路',
          value: 2
        },
        {
          label: '绿化',
          value: 3
        },
        {
          label: '公共设施',
          value: 4
        },
        {
          label: '其他',
          value: 5
        }
      ],
      statelist: [
        {
          label: '新建',
          value: 0
        },
        {
          label: '受理中',
          value: 1
        },
        {
          label: '待补充',
          value: 2
        },
        {
          label: '维修中',
          value: 3
        },
        {
          label: '已解决',
          value: 4

        }, {
          label: '关闭',
          value: 5
        }
      ],
      fix_statelist: [
        {
          label: '待分配',
          value: 1
        },
        {
          label: '已分配',
          value: 2
        },
        {
          label: '维修中',
          value: 3
        },
        {
          label: '已解决',
          value: 4
        }
      ]
    }
  },
  mounted: function () {
    this.GetCaseDetailByNumber(this.$route.query.casenumber)
    // type=1 employee  type=2 household  type=3 partner
    this.usertype = localStorage.getItem('logintype')
    this.username = localStorage.getItem('loginuser')
  },
  methods: {
    GetCaseDetailByNumber (number) {
      axios.post('/getcasebynumber?number=' + number)
        .then(res => {
          this.form = res.data
        })
        .catch(err => {
          this.postErrorMessage('获取投诉单数据失败:' + err)
        })
    },
    clickbuttonlist (buttonNum) {
      // 分配 assgned_to new->in progress
      // eslint-disable-next-line eqeqeq
      if (buttonNum == 1) {
        if (this.form.assigned_to == null) {
          this.postErrorMessage('分配受理失败！受理人字段为空，无法分配！')
        } else {
          this.$confirm('此操作将把该投诉单分配给工号' + this.form.assigned_to.name + '员工, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.changeCaseState(this.form.number, buttonNum, this.form.assigned_to.name, '', this.username)
          }).catch(() => {
            this.postInfoMessage('已取消操作')
          })
        }
      // eslint-disable-next-line brace-style
      } // 待补充 awaiting in progress->awaiting info
      // eslint-disable-next-line eqeqeq
      else if (buttonNum == 2) {
        if (this.message == null) {
          this.postErrorMessage('留言为空，请填写留言，告知住户需要补充的内容！')
        } else {
          this.$confirm('此操作将把该投诉单状态置为待补充, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.changeCaseState(this.form.number, buttonNum, 0, this.message, this.username)
          }).catch(() => {
            this.postInfoMessage('已取消操作')
          })
        }
      // eslint-disable-next-line brace-style
      } // 分配维修 fix_assgned_to in progress->in fix
      // eslint-disable-next-line eqeqeq
      else if (buttonNum == 3) {
        if (this.form.fix_assigned_to.name == null) {
          this.postErrorMessage('分配维修方失败！维修方字段为空，无法分配！')
        } else {
          this.$confirm('此操作将把该投诉单分配给维修方' + this.form.fix_assigned_to.name + '维修, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.changeCaseState(this.form.number, buttonNum, this.form.fix_assigned_to.name, '', this.username)
          }).catch(() => {
            this.postInfoMessage('已取消操作')
          })
        }
      // eslint-disable-next-line brace-style
      }// 提供解决方案 resolved in progress/in fix->resolved
      // eslint-disable-next-line eqeqeq
      else if (buttonNum == 4) {
        if (this.form.solution == null) {
          this.postErrorMessage('设置该投诉单为解决状态失败!解决方案字段为空，请填写解决方案！')
        } else {
          this.$confirm('此操作将把该投诉单状态更改为已解决, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.changeCaseState(this.form.number, buttonNum, 0, this.form.solution, this.username)
          }).catch(() => {
            this.postInfoMessage('已取消操作')
          })
        }
      // eslint-disable-next-line brace-style
      }// 接受维修单 维修状态：维修中 ← 已分配
      // eslint-disable-next-line eqeqeq
      else if (buttonNum == 5) {
        this.$confirm('此操作将接收该维修委托, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeCaseState(this.form.number, buttonNum, 0, '', this.username)
        }).catch(() => {
          this.postInfoMessage('已取消操作')
        })
      // eslint-disable-next-line brace-style
      }// 拒绝维修单 维修状态：待分配 ← 已分配
      // eslint-disable-next-line eqeqeq
      else if (buttonNum == 6) {
        this.$confirm('此操作将拒绝该维修委托, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeCaseState(this.form.number, buttonNum, 0, '', this.username)
        }).catch(() => {
          this.postInfoMessage('已取消操作')
        })
      // eslint-disable-next-line brace-style
      }// 维修结束 维修状态：已解决 ← 维修中
      // eslint-disable-next-line eqeqeq
      else if (buttonNum == 7) {
        if (this.message == null) {
          this.postErrorMessage('留言为空，请填写留言，告知物业方维修细节！')
        } else {
          this.$confirm('此操作将把该投诉单维修状态置为完成维修, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.changeCaseState(this.form.number, buttonNum, 0, this.message, this.username)
          }).catch(() => {
            this.postInfoMessage('已取消操作')
          })
        }
      // eslint-disable-next-line brace-style
      }// 发送留言 // payload type 8-employee/8-household/10-customer
      // eslint-disable-next-line eqeqeq
      else if (buttonNum == 8) {
        if (this.message == null) {
          this.postErrorMessage('操作失败, 留言内容为空！')
        } else {
          this.$confirm('此操作将发送留言, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //     usertype 1-employee 2-household  3-partner
            // payload type 8-employee/9-household/10-customer
            // eslint-disable-next-line eqeqeq
            if (this.usertype == 1) {
              this.changeCaseState(this.form.number, 8, 0, this.message, this.username)
            // eslint-disable-next-line eqeqeq
            } else if (this.usertype == 2) {
              this.changeCaseState(this.form.number, 9, 0, this.message, this.username)
            } else {
              this.changeCaseState(this.form.number, 10, 0, this.message, this.username)
            }
          }).catch(() => {
            this.postInfoMessage('已取消操作')
          })
        }
      // eslint-disable-next-line brace-style
      }
      // 关闭 状态：关闭。清除escalation emergency，
      // eslint-disable-next-line eqeqeq
      else if (buttonNum == 11) {
        this.$confirm('此操作将关闭投诉单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.changeCaseState(this.form.number, buttonNum, 0, '', this.username)
        }).catch(() => {
          this.postInfoMessage('已取消操作')
        })
      // eslint-disable-next-line brace-style
      } else {
      }
    },
    changeCaseState (casenumber, type, assign, message, updateduser) {
      // type=1 分配   state: assgned_to new->in progress; casenumber&type&assigned_to&updated_usernumber
      // type=2 待补充 state: in progress->awaiting info; casenumber&type&message&updated_usernumber
      // type=3 维修中 state: in progress->in fix, fix_state:已分配 ← 空/待分配/已解决; casenumber&type&(fix)assigned_to&updated_usernumber
      // type=4 已解决 state: in progress/in fix->resolved; casenumber&type&(resolution)message&updated_usernumber
      // type=5 接收维修单 维修状态：维修中 ← 已分配; casenumber&type&updated_usernumber
      // type=6 拒绝维修单 维修状态：待分配 ← 已分配; casenumber&type&updated_usernumber
      // type=7 维修状态：已解决 ← 维修中; casenumber&type&message&updated_usernumber
      // type=8-household/9-employee/10-customer 发送留言,household可能状态变化; casenumber&type&message&updated_usernumber
      axios.post('/updatecasebynumber?number=' + this.form.number + '&type=' + type + '&assigned_to=' + assign + '&message=' + message + '&updateduser=' + updateduser)
        .then(res => {
          this.form = res.data
          this.postSuccessMessage('操作成功!')
          this.refresh(casenumber)
        })
        .catch(err => {
          this.postErrorMessage('操作失败:' + err)
        })
    },
    postSuccessMessage (successMessage) {
      this.$message({
        type: 'success',
        message: successMessage
      })
    },
    postInfoMessage (infoMessage) {
      this.$message({
        type: 'info',
        message: infoMessage
      })
    },
    postErrorMessage (errmessage) {
      this.$message.error(errmessage)
    },
    refresh (casenumber) {
      this.$router.push({
        path: '/loading',
        query: {
          url: '/casedetail',
          casenumber: casenumber
        }
      })
    }
  }
}
</script>

<style scoped>
 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 99.1%;
  }
</style>
