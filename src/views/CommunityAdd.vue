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
                <el-form :model="form" ref="form"  label-width="80px">
                    <!-- row1 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="社区名" prop="name">
                          <el-input v-model="form.name"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="地址" prop="region">
                          <el-input v-model="form.region"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                     <!-- row2 -->
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="住户" prop="da">
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
                          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                          </el-upload>
                        </el-form-item>
                      </el-col>
                    </el-row>
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
      rooms: null,
      buildings: null,
      fileTemp: null,
      form: {
        name: '',
        region: ''
      }
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
          axios.post('/insertcommunity?name=' + this.form.name + '&region=' + this.form.region + '&company=' + localStorage.getItem('loginuser_commpany') + '&buildings=' + this.buildings + '&rooms=' + this.rooms)
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
