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
        <div class="container">
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
                                <el-select v-model="form.state"  placeholder="请选择"  :disabled="usertype==1?false:true">
                                    <el-option v-for="item in statelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维修状态" prop="fix_state">
                              <!-- 只有物业员工才能编辑fix_state -->
                                <el-select v-model="form.fix_state"  placeholder="请选择" :disabled="usertype==1?false:true">
                                    <el-option v-for="item in fix_statelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="类别" prop="type">
                                <!-- 只有物业员工才能编辑 -->
                                <el-select v-model="form.type" placeholder="请选择" :disabled="usertype==1?false:true">
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
                              <el-form-item label="留言" prop="description">
                                  <el-input type="textarea" rows="5" v-model="note" :disabled="true"></el-input>
                              </el-form-item>
                              <el-form-item style="margin-top: 20px;" label="历史记录" prop="activity">
                                <div v-for="ac in activity" :key="ac">
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
                              <el-form-item label="解决方案" prop="description">
                                  <el-input type="textarea" rows="5" v-model="form.solution" :disabled="true"></el-input>
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
      activity: null,
      usertype: null,
      activity_color: null,
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
          value: 1
        },
        {
          label: '受理中',
          value: 2
        },
        {
          label: '待补充',
          value: 3
        },
        {
          label: '维修中',
          value: 4
        },
        {
          label: '已解决',
          value: 5

        }, {
          label: '关闭',
          value: 6
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
    this.GetCaseActivityByNumber(this.$route.query.casenumber)
    // type=1 employee  type=2 household  type=3 partner
    this.usertype = localStorage.getItem('logintype')
  },
  methods: {
    GetCaseDetailByNumber (number) {
      axios.post('/getcasebynumber?number=' + number)
        .then(res => {
          this.form = res.data
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
        })
    },
    GetCaseActivityByNumber (number) {
      axios.post('/getactivitybycase_number?case_number=' + number)
        .then(res => {
          this.activity = res.data
        })
        .catch(err => {
          this.$message.error('加载失败:' + err)
          console.error(err)
        })
    },
    onSubmit (formName) {
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
