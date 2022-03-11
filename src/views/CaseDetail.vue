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
                            <el-form-item label="状态" prop="state">
                                <el-select v-model="form.state"  placeholder="请选择" >
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
                    </el-row>
                    <!-- row2 -->
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="社区" prop="community.name">
                                <el-input v-model="form.community.name" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="物业" prop="company.name">
                                <el-input v-model="form.company.name" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="维修方" prop="fix_assigned_to.name">
                                <el-input v-model="form.fix_assigned_to.name" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- row3 -->
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="住户" prop="household.name">
                                <el-input v-model="form.household.name" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="受理人" prop="assigned_to.name">
                                <el-input v-model="form.assigned_to.name" :disabled="true"></el-input>
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
                            <el-form-item label="创建时间" prop="created">
                                <el-input v-model="form.created" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="更新时间" prop="updated">
                                <el-input v-model="form.updated" :disabled="true"></el-input>
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
                    <el-form-item label="标题" prop="subject" :disabled="true">
                        <el-input v-model="form.subject" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="具体描述" prop="description" :disabled="true">
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
      form: null,
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
          label: '地面',
          value: 4
        },
        {
          label: '围墙外立面',
          value: 5

        }, {
          label: '公共设施',
          value: 6
        },
        {
          label: '其他',
          value: 7
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
    onSubmit (formName) {
    }
  }
}
</script>
