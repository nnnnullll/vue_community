<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 新建
                </el-breadcrumb-item>
                <el-breadcrumb-item>投诉单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="form" :rules="rules" ref="form"  label-width="80px">
                    <!-- row1 -->
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="单号" prop="number">
                                <el-input v-model="form.number" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="物业" prop="company.numner">
                                <el-input v-model="form.company.number" :disabled="true"></el-input>
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
                            <el-form-item label="社区" prop="community.number">
                                <el-select @change="onCommunityChange(form.community.number)" v-model="form.community.number" placeholder="请选择" :disabled="form.created_role!=1">
                                    <el-option v-for="item in option_community" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                                <!-- <el-input v-model="form.community.number" :disabled="form.created_role!=1"></el-input> -->
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="住户" prop="household">
                               <el-select v-model="form.household" placeholder="请选择" :disabled="form.created_role!=1||form.community.number==null">
                                    <el-option v-for="item in option_household" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
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
                            <el-form-item label="受理人" prop="assigned_to.number">
                                <el-input v-model="form.assigned_to.number" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维修方" prop="fix_assigned_to.number">
                                <el-input v-model="form.fix_assigned_to.number" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="" prop="escalation">
                                        <el-checkbox label="加急" :disabled="true" name="escalation"></el-checkbox>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="" prop="emergency">
                                        <el-checkbox label="逾期" :disabled="true" name="emergency"></el-checkbox>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <!-- row4 -->
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="状态" prop="state">
                                <el-select v-model="form.state"  placeholder="请选择" :disabled="true">
                                    <el-option v-for="item in statelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维修状态" prop="fix_state">
                                <el-select v-model="form.fix_state"  placeholder="请选择" :disabled="true">
                                    <el-option v-for="item in fix_statelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="类别" prop="type">
                                <el-select v-model="form.type" placeholder="请选择">
                                    <el-option v-for="item in typelist" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="标题" prop="subject">
                        <el-input v-model="form.subject" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="具体描述" prop="description">
                        <el-input type="textarea" rows="5" v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">表单提交</el-button>
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
      rules: {
        subject: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类别', trigger: 'change' }
        ],
        description: [
          { required: true, message: '请输入具体描述', trigger: 'blur' }
        ]
      },
      form: {
        number: null,
        company: {
          number: null,
          name: ''
        },
        community: {
          number: null,
          name: ''
        },
        household: {
          number: null,
          name: ''
        },
        subject: '',
        description: '',
        type: null,
        assigned_to: {
          number: null,
          name: ''
        },
        state: null,
        fix_assigned_to: {
          number: null,
          name: ''
        },
        fix_state: null,
        emergency: null,
        escalation: null,
        created: '',
        created_by: null,
        created_role: null,
        updated: '',
        updated_by: null,
        updated_role: null
      },
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
      ],
      option_community: null,
      option_household: null
    }
  },
  mounted: function () {
    this.GetCommunityOptionByCompany(localStorage.getItem('loginuser_commpany'))
    this.form.created_role = localStorage.getItem('logintype')
    this.form.created_by = localStorage.getItem('loginuser')
  },
  methods: {
    GetCommunityOptionByCompany (company) {
      axios.post('/getcommunityoptionbycompany?company=' + company)
        .then(res => {
          console.log(res.data)
          this.option_community = res.data
        })
        .catch(err => {
          this.postErrorMessage('获取投诉单数据失败:' + err)
        })
    },
    onCommunityChange () {
      this.form.household = null
      axios.post('/gethouseholdoptionbycommunity?community=' + this.form.community.number)
        .then(res => {
          console.log(res.data)
          this.option_household = res.data
        })
        .catch(err => {
          this.postErrorMessage('获取投诉单数据失败:' + err)
        })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 1-employee 2-Customer
          // eslint-disable-next-line eqeqeq
          axios.post('/insertcase?subject=' + this.form.subject + '&description=' + this.form.description + '&type=' + this.form.type + '&created_by=' + this.form.created_by + '&created_role=' + this.form.created_role + '&household=' + (this.form.created_role == 1 ? this.form.household : 0))
            .then(res => {
              this.$message({
                message: '创建成功',
                type: 'success'
              })
              this.$router.push({
                path: '/casedetail',
                query: {
                  casenumber: res.data
                }
              })
            })
            .catch(err => {
              this.$message.error('创建失败:' + err)
              console.error(err)
            })
        } else {
          this.$message.error('请输入必填项')
          return false
        }
      })
    }
  }
}
</script>
