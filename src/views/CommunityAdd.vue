<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 基本信息
                </el-breadcrumb-item>
                <el-breadcrumb-item>社区信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="form" :rules="rules" ref="form"  label-width="80px">
                    <!-- row1 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="社区名" prop="name">
                          <el-input v-model="form.name"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="地址" prop="region">
                          <div class="block">
                            <el-cascader
                              placeholder="例: 上海市,宝山区"
                              v-model="form.region"
                              :options="options"
                              :props="props"
                              clearable>
                            </el-cascader>
                          </div>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- row2 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="自动创建住户文件" prop="da">
                          <el-upload
                            class="upload-demo"
                            action=""
                            :on-change="handleChange"
                            :on-remove="handleRemove"
                            :on-exceed="handleExceed"
                            limit="1"
                            accept="application/vnd.openxmlformats-
                            officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                            :auto-upload="false">
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb
                              <!--导出用户信息excel表格-->
                              <download-excel
                                class = "export-excel-wrapper"
                                :data = "json_data"
                                :fields = "json_fields"
                                name = "住户自动创建列表.xls">
                                <el-link type="primary">点击获取自动创建住户的EXCEL模板，请填写后上传。</el-link>
                              </download-excel>
                          </div>
                          </el-upload>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="具体街道" prop="address">
                          <el-input placeholder="例:上大路99号" v-model="form.address"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
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
        name: [{ required: true, message: '名字不能为空', trigger: 'blur' }],
        address: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
        region: [{ required: true, message: '地址不能为空', trigger: 'blur' }],
        da: [{ required: true, message: '文件不能为空', trigger: 'blur' }]
      },
      rooms: null,
      buildings: null,
      fileTemp: null,
      form: {
        name: null,
        region: null,
        address: null,
        da: null
      },
      // 导出excel
      json_fields: {
        'building': 'building', // 常规字段
        'room': 'room'
      },
      json_data: [
        // 写死，后续可通过接口进行传值
        {
          building: '请输入楼号，eg:1。一行代表一户，社区中有几户就有几行。',
          room: '请输入室号，eg:101。请保留该行示例，从下一行开始填写数据。'
        }
      ],
      json_meta: [
        [
          {
            ' key ': ' charset ',
            ' value ': ' utf- 8 '
          }
        ]
      ],
      props: { multiple: false },
      options: [
        {
          value: `上海`,
          label: '上海',
          children: [
            { value: '黄浦区', label: '黄浦区' },
            { value: '徐汇区', label: '徐汇区' },
            { value: '长宁区', label: '长宁区' },
            { value: '静安区', label: '静安区' },
            { value: '普陀区', label: '普陀区' },
            { value: '虹口区', label: '虹口区' },
            { value: '杨浦区', label: '杨浦区' },
            { value: '浦东新区', label: '浦东新区' },
            { value: '闵行区', label: '闵行区' },
            { value: '宝山区', label: '宝山区' },
            { value: '嘉定区', label: '嘉定区' },
            { value: '金山区', label: '金山区' },
            { value: '松江区', label: '松江区' },
            { value: '青浦区', label: '青浦区' },
            { value: '奉贤区', label: '奉贤区' },
            { value: '崇明区', label: '崇明区' }
          ]
        },
        {
          value: '江苏',
          label: '江苏',
          children: [
            { value: '南京市', label: '南京市' },
            { value: '无锡市', label: '无锡市' },
            { value: '徐州市', label: '徐州市' },
            { value: '常州市', label: '常州市' },
            { value: '苏州市', label: '苏州市' },
            { value: '南通市', label: '南通市' },
            { value: '连云港市', label: '连云港市' },
            { value: '淮安市', label: '淮安市' },
            { value: '扬州市', label: '扬州市' },
            { value: '镇江市', label: '镇江市' },
            { value: '泰州市', label: '泰州市' },
            { value: '宿迁市', label: '宿迁市' },
            { value: '盐城市', label: '盐城市' }
          ]
        },
        {
          value: '浙江',
          label: '浙江',
          children: [
            { value: '杭州', label: '杭州' },
            { value: '宁波', label: '宁波' },
            { value: '嘉兴', label: '嘉兴' }
          ]
        },
        {
          value: null,
          label: '陕西',
          children: [
            { value: 33, label: '西安' },
            { value: 34, label: '延安' }
          ]
        },
        {
          value: null,
          label: '新疆维吾尔族自治区',
          children: [
            { value: 35, label: '乌鲁木齐' },
            { value: 36, label: '克拉玛依' }
          ]
        }
      ]
    }
  },
  mounted: function () {
    // 1-employee 2-Customer 3-partner 住户-我的社区
    // eslint-disable-next-line no-constant-condition
    // eslint-disable-next-line eqeqeq
    if (this.$route.query.from == 'internal') {
      this.GetHouseholdDetailByNumber(this.$route.query.number)
    // eslint-disable-next-line eqeqeq
    } else if (localStorage.getItem('logintype') == 2) {
      console.log(localStorage.getItem('loginuser_commmunity'))
      this.GetHouseholdDetailByNumber(localStorage.getItem('loginuser_commmunity'))
    } else {

    }
  },
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/insertcommunity?name=' + this.form.name + '&region=' + this.form.region + '&address=' + this.form.region + this.form.address + '&company=' + localStorage.getItem('loginuser_commpany') + '&buildings=' + this.buildings + '&rooms=' + this.rooms)
            .then(res => {
            // eslint-disable-next-line eqeqeq
              if (res.data != 0) {
                this.$message({
                  message: '创建成功',
                  type: 'success'
                })
                console.log(res.data)
                this.$router.push({
                  path: '/communitydetail',
                  query: {
                    number: res.data,
                    from: 'internal'
                  }
                })
              } else {
                this.$message.error('创建失败:检测到相同的身份证号或手机号，该同事已存在！点击查看')
              }
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
    },
    // 上传文件时处理方法
    handleChange (file, fileList) {
      this.form.da = 1
      this.fileTemp = file.raw
      if (this.fileTemp) {
        // eslint-disable-next-line eqeqeq
        if ((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
                // eslint-disable-next-line eqeqeq
                (this.fileTemp.type == 'application/vnd.ms-excel')) {
          this.importfxx(this.fileTemp)
        } else {
          this.$message({
            type: 'warning',
            message: '附件格式错误，请删除后重新上传！'
          })
        }
      } else {
        this.$message({
          type: 'warning',
          message: '请上传附件！'
        })
      }
    },
    // 超出最大上传文件数量时的处理方法
    handleExceed () {
      this.$message({
        type: 'warning',
        message: '只能上传一个文件！'
      })
    },
    // 移除文件的操作方法
    handleRemove (file, fileList) {
      this.form.da = null
      this.fileTemp = null
      this.buildings = null
      this.rooms = null
    },
    importfxx (obj) {
      let _this = this

      this.file = event.currentTarget.files[0]

      var rABS = false // 是否将文件读取为二进制字符串
      var f = this.file

      var reader = new FileReader()
      // if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = ''
        var rABS = false // 是否将文件读取为二进制字符串
        var wb // 读取完成的数据
        var outdata
        var reader = new FileReader()
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          // 如果没有在main.js中引入，则此处需要引入，用于解析excel
          var XLSX = require('xlsx')
          if (rABS) {
            wb = XLSX.read(btoa(_this.fixdata(binary)), {
              // 手动转化
              type: 'base64'
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary'
            })
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          // outdata就是读取的数据（不包含标题行即表头，表头会作为对象的下标）
          // 此处可对数据进行处理
          let buildings = []
          let rooms = []
          outdata.map(v => {
            buildings.push(v['building'])
            rooms.push(v['room'])
          })
          _this.buildings = buildings
          _this.rooms = rooms
        }
        reader.readAsArrayBuffer(f)
      }
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    fixdata (data) { // 文件流转BinaryString
      var o = ''
      var l = 0
      var w = 10240
      for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
      return o
    }

  }
}
</script>
