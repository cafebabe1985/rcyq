<template>
  <a-modal 
  :title="title" 
  :width="1200" 
  :visible="visible" :maskClosable="false" :confirmLoading="confirmLoading"
    @ok="handleOk" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-row>

          <a-col :span="24">
            <a-form-item label="活动主题" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入活动名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="活动开始时间" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-date placeholder="请选择活动开始时间" v-decorator="[ 'startTime', validatorRules.startTime]"
                :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="活动结束时间" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-date placeholder="请选择活动结束时间" v-decorator="[ 'endTime', validatorRules.endTime]" :trigger-change="true"
                :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="报名截止时间" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-date placeholder="请选择报名截止时间" v-decorator="[ 'endEnrol', validatorRules.endEnrol]"
                :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="活动地点" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-input v-decorator="[ 'address', validatorRules.address]" placeholder="请输入活动地点"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="活动封面" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-upload v-decorator="['poster',validatorRules.poster]" :trigger-change="true"></j-upload>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="活动详情" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-editor v-decorator="['detail',{trigger:'input'}]" />
            </a-form-item>
          </a-col>
          <a-divider>费用设置</a-divider>
          <a-col :span="24">
            <a-form-item label="活动费用" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-dict-select-tag defaultValue="0" @change="handleCostChange" type="radio" v-model="cost.type"
                :trigger-change="true" dictCode="cost_type" placeholder="请选择报名方式" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="活动总名额" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-input v-model="cost.number"
               :class="validateCostOpts[index].number?'':'invalid'"                
                :placeholder="validateCostOpts[index].number?'名额':'*总名额必填'"
                type="number"></a-input>
            </a-form-item>
          </a-col>
          <div v-if="showCostForm">
            <!--refundType-->
            <a-col :span="24">
              <a-form-item label="退款方式" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
                <j-dict-select-tag defaultValue="0" @change="handleRefundTypeChange" type="radio"
                  v-model="cost.refundType" :trigger-change="true" dictCode="refund_type" placeholder="请选择退款方式" />
              </a-form-item>
            </a-col>
            <div v-for="(item,index) in cost.opts" :key="index">

            <a-col :span="3" style="text-align:right;height:100px;line-height:100px">
              <a-button 
              v-if="index == cost.opts.length-1"
              @click="addCostOpt" type="primary" style="margin-right:15px;">
                新增
              </a-button>
               <a-button 
               v-else
               @click="removeCostOpt(index)" type="danger" style="margin-right:15px;">
                删除
              </a-button>
            </a-col>
            <a-col :span="21">

              <a-form-item label="" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
                <a-input 
                v-model="item.name" 
                :class="validateCostOpts[index].name?'':'invalid'"
                
                :placeholder="validateCostOpts[index].name?'费用名称':'*费用名称必填'" 
                         maxLength="15"></a-input>
                <a-input v-model="item.cost"
                :class="validateCostOpts[index].cost?'':'invalid'"                
                :placeholder="validateCostOpts[index].cost?'金额':'*金额必填'"
                 type="number"></a-input>
                <a-input 
                v-model="item.number" 
                 :class="validateCostOpts[index].number?'':'invalid'"                
                :placeholder="validateCostOpts[index].number?'名额':'*名额必填'" 
                type="number"></a-input>
              </a-form-item>
            </a-col>
            </div>
          </div>

          <a-divider>报名方式--个人/组队</a-divider>
          <a-col :span="24">
            <a-form-item label="报名方式" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-dict-select-tag  @change="handleEnrolWayChange" type="radio" v-decorator="['enrolWay',validatorRules.enrolWay]"
                :trigger-change="true" dictCode="enrol_way" placeholder="请选择报名方式" />
            </a-form-item>
          </a-col>
          <div v-if="showEnrolOpt">
            <a-col :span="24">
              <a-form-item label="队伍数量" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
                <a-input-number v-decorator="[ 'teamSize', validatorRules.teamSize]"
                :min="1"
                
                 placeholder="请输入队伍数量"
                  style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="每队人数上限" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
                <a-input-number v-decorator="[ 'everyTeamMax', validatorRules.everyTeamMax]" placeholder="默认不限"
                  :max="100"
                  :min="form.getFieldValue('everyTeamMin')||1"
                  style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="每队人数下限" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
                <a-input-number v-decorator="[ 'everyTeamMin', validatorRules.everyTeamMin]" placeholder="默认不限"
                  :min="1"
                  :max="form.getFieldValue('everyTeamMax')||100"
                  style="width: 100%" />
              </a-form-item>
            </a-col>
          </div>
          <a-divider>其他报名设置</a-divider>
          <a-col :span="24">
            <a-form-item label="需要审核报名" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-dict-select-tag  type="radio" v-decorator="['needExamineEnrol',validatorRules.needExamineEnrol]" :trigger-change="true"
                dictCode="need_examine" placeholder="请选择需要审核报名" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="允许代替报名" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-dict-select-tag  type="radio" v-decorator="['allowEnrolAgent',validatorRules.allowEnrolAgent]" :trigger-change="true"
                dictCode="allow_enrol" placeholder="请选择允许代替报名" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="报名须知" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-textarea v-decorator="[ 'notice', validatorRules.notice]" placeholder="请输入报名须知"></a-textarea>
            </a-form-item>
          </a-col>
          <a-divider></a-divider>
          <a-col :span="24">
            <a-form-item label="报名填写项" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-checkbox-group 
              @change="onEnrolWriteChange" 
              v-decorator="[ 'enrolWriteOpts',validatorRules.enrolWriteOpts]"
              
                >
                <a-checkbox 
                :disabled="item.required"
                :value="item" 
                v-for="(item,index) in enrolWriteOpts" :key="index">
                {{item.name}}</a-checkbox>
                <a-button @click="addOpts" type="primary" style="margin-left:5px">
                  <a-icon type="plus" />
                </a-button>

              </a-checkbox-group>
            </a-form-item>

          </a-col>
          <div v-if="showAddEnrolWriteForm">
            <a-col :span="24">
              <a-form-item label="报名填写项类型" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
                <j-dict-select-tag @change="handleEnrolWriteTypeChange" type="radio" v-model="enrolWriteOptsItem.type"
                  :trigger-change="true" dictCode="enrol_write_type" placeholder="请选择报名填写类型" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="报名填写项名称" 
              :labelCol="labelCol2" :wrapperCol="wrapperCol2"
              :validate-status="enrolWriteOptsItem.name?'success':'error'"
              :help="enrolWriteOptsItem.name?'':'*必须填写名称'"
              >
                <a-input v-model="enrolWriteOptsItem.name" placeholder="请输入填写项名称"></a-input>
              </a-form-item>
            </a-col>
            <div v-if="showAddEnrolWriteOpt">
              <a-col v-for="(item,index) in writeOptItems" :key="index" :span="24">
                <a-form-item :label="'候选项'+(index+1)" :labelCol="labelCol2" :wrapperCol="wrapperCol">
                  <div class="flex-center">
                    <a-input v-model="writeOptItems[index]" placeholder="请输入候选项">

                    </a-input>
                    <a-button v-if="index===writeOptItems.length-1" @click="addOptsItem" type="primary"
                      style="margin-left:5px">
                      <a-icon type="plus" />
                    </a-button>
                    <a-button v-else @click="removeOptsItem(index)" type="danger" style="margin-left:5px">
                      <a-icon type="minus" />
                    </a-button>
                  </div>

                </a-form-item>

              </a-col>
            </div>
            <a-col :span="12" :offset="3">

              <a-button type="primary" style="margin-bottom:10px" @click="configAddItem"> 添加</a-button>

            </a-col>

            <a-divider />

          </div>

          <a-col :span="24">
            <a-form-item label="发布状态" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-dict-select-tag type="radio" v-decorator="['displayType',validatorRules.displayType]"
                :trigger-change="true" dictCode="display_type" placeholder="请选择发布状态" />
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'

import JDate from '@/components/jeecg/JDate'
import JUpload from '@/components/jeecg/JUpload'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import JEditor from '@/components/jeecg/JEditor'

export default {
  name: 'WxActiveModal',

  components: {
    JDate,
    JUpload,
    JDictSelectTag,
    JEditor
  },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 800,
      visible: false,
      model: {},
      confirmLoading: false,
      showAddEnrolWriteForm: false,
      showEnrolOpt: false,
      showAddEnrolWriteOpt: false,
      showCostForm: false,
      writeOptItems: [''],
      validateCostOpts: [
        {
          all: true,
          name: true,
          cost: true,
          number: true
        }
      ],

      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 20
      },
      labelCol2: {
        span: 3
      },
      wrapperCol2: {
        span: 20
      },
      enrolWriteOpts: [
        {
          name: '昵称',
          key: 'nickName',
          value: '1',
          required: true,
          type: '0',
          diy: '0'
        },
        {
          name: '手机',
          key: 'phone',
          value: '1',
          required: true,
          type: '0',
          diy: '0'
        },
        {
          name: '性别',
          key: 'gender',
          value: '0',
          required: false,
          type: '0',
          diy: '0'
        },
        {
          name: '真实姓名',
          key: 'realName',
          value: '0',
          required: false,
          type: '0',
          diy: '0'
        },
        {
          name: '身份证号',
          key: 'cardId',
          value: '0',
          required: false,
          type: '0',
          diy: '0'
        }
      ],
      enrolWriteOptsItem: null,
      cost: {
        type: '0',
        refundType: '0',
        number: null,
        opts: [
          {
            name: '',
            cost: '',
            number: ''
          }
        ]
      },
      // 新增时子表默认添加几行空数据

      validatorRules: {
        name: { rules: [{ required: true, message: '请输入活动名称!' }] },
        startTime: {
          rules: [
            { required: true, message: '请输入活动开始时间!' },
            {
              validator: (rule, value, callback) => {
                let st = this.form.getFieldValue('startTime')
                let et = this.form.getFieldValue('endTime')

                if (st && et && st >= et) {
                  callback(true)
                } else {
                  callback()
                }
              },
              message: '结束时间要晚于开始时间'
            }
          ]
        },
        endTime: {
          rules: [
            { required: true, message: '请输入活动结束时间!' },
            {
              validator: (rule, value, callback) => {
                let st = this.form.getFieldValue('startTime')
                let et = this.form.getFieldValue('endTime')

                if (st && et && st >= et) {
                  callback(true)
                } else {
                  callback()
                }
              },
              message: '结束时间要晚于开始时间'
            }
          ]
        },
        endEnrol: { rules: [{ required: true, message: '请输入报名截止时间!' },
         {
          validator:(rule, value, callback)=>{
            let st = this.form.getFieldValue("startTime")
            let ee = this.form.getFieldValue("endEnrol")
           
           if(st&&ee&&ee>=st){
 callback(true)
           }else{
             callback()
           }
           
          },
          message:"报名截止要早于活动开始"
        }] },
        poster: { rules: [{ required: true, message: '请输入封面图!' }] },
        detail: { rules: [{ required: true, message: '请输入详细说明!' }] },
        displayType: { rules: [{ required: true, message: '请输入发布状态!' }] },
        teamSize: {
          initialValue: 1
        },
        address: { rules: [{ required: true, message: '请输入活动地点!' }] },
        enrolWay: {
          rules: [{ required: true, message: '请输入报名方式!' }],
          initialValue: '0'
        },
        needExamineEnrol: {
          initialValue: '0'
        },
        allowEnrolAgent: {
          initialValue: '1'
        },
        notice: {},
        enrolWriteOpts: {},
        insuranceType: { rules: [{ required: true, message: '请输入保险类型!' }] },
        everyTeamMax: {},
        everyTeamMin: {}
      },
      refKeys: ['wxActiveCost'],
      tableKeys: [],
      activeKey: 'wxActiveCost',

      url: {
        add: '/wx/wxActive/add',
        edit: '/wx/wxActive/edit'
      }
    }
  },
  mounted() {
    this.validatorRules.enrolWriteOpts.initialValue = [this.enrolWriteOpts[0], this.enrolWriteOpts[1]]
  },
  // {
  //   defultWriteOpts() {
  //     return [this.enrolWriteOpts[0], this.enrolWriteOpts[1]]
  //   }
  // },
  methods: {
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'name',
            'startTime',
            'endTime',
            'endEnrol',
            'poster',
            'detail',
            'displayType',
            'teamSize',
            'address',
            'enrolWay',
            'needExamineEnrol',
            'allowEnrolAgent',
            'notice',
            'insuranceType',
            'everyTeamMax',
            'everyTeamMin'
          )
        )
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      let checkCost = this.checkCostOptsvalidate()
      // 触发表单验证
      this.form.validateFields({ firstFields: true }, (err, values) => {
        if (!err) {
          if (!checkCost) {
            return
          }
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
         
          if(this.cost.type!="0"){
            this.cost.number = 0
            for(let i in this.cost.opts){
              this.cost.number += parseInt(this.cost.opts[i].number) 
            }
          }
          formData.cost = this.cost
           console.log('表单提交数据', formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                ;(that.cost = {
                  type: '0',
                  refundType: '0',
                  number: null,
                  opts: [
                    {
                      name: '',
                      cost: '',
                      number: ''
                    }
                  ]
                }),
                  that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },
    addOpts() {
      this.enrolWriteOptsItem = {
        name: '',
        key: 'OPTI',
        value: '0',
        required: false,
        type: '0',
        diy: '1'
      }
      this.showAddEnrolWriteForm = true
    },
    configAddItem() {
      if (this.enrolWriteOptsItem.name) {
        this.enrolWriteOpts.push(this.enrolWriteOptsItem)
        this.showAddEnrolWriteForm = false
      } else {
      }
    },
    addOptsItem() {
      this.writeOptItems.push('')
    },
    addCostOpt() {
      if (this.checkCostOptsvalidate()) {
        this.cost.opts.push({
          name: '',
          cost: '',
          number: ''
        })
        this.validateCostOpts.push({
          all: true,
          name: true,
          cost: true,
          number: true
        })
      }
    },
    checkEnrolWay() {
      if (this.form.getFieldValue('enrolWay') === '1') {
        this.validatorRules.enrolWay = { rules: [{ required: true, message: '请输入队伍数量!' }] }
      } else {
        return true
      }
    },
    checkCostOptsvalidate() {
      if (this.cost.type === '0') {
        return true
      }
      for (let index in this.cost.opts) {
        for (let key in this.cost.opts[index]) {
          if (this.cost.opts[index][key]) {
            this.validateCostOpts[index][key] = true
          } else {
            this.validateCostOpts[index][key] = false
          }
        }
        if (
          this.validateCostOpts[index].name &&
          this.validateCostOpts[index].cost &&
          this.validateCostOpts[index].number
        ) {
          this.validateCostOpts[index].all = true
        } else {
          this.validateCostOpts[index].all = false
          return false
        }
      }
      return true
    },
    removeCostOpt(index) {
      this.cost.opts.splice(index, 1)
      this.validateCostOpts.splice(index, 1)
    },
    removeOptsItem(index) {
      this.writeOptItems.splice(index, 1)
    },
    handleRefundTypeChange(e) {
      this.cost.refundType = e
    },
    handleEnrolWriteTypeChange(e) {
      this.enrolWriteOptsItem.type = e
      if (e != '0') {
        this.showAddEnrolWriteOpt = true
      } else {
        this.showAddEnrolWriteOpt = false
      }
    },
    handleEnrolWayChange(e) {
      if (e === '1') {
        this.showEnrolOpt = true
      } else {
        this.showEnrolOpt = false
      }
    },
    handleCostChange(e) {
      this.cost.type = e
      if (e === '0') {
        this.showCostForm = false
      } else {
        this.showCostForm = true
      }
    },
    onEnrolWriteChange(e) {
     

      this.form.setFieldsValue({ enrolWriteOpts: e })
    },
    getAllTable() {
      let values = this.tableKeys.map(key => getRefPromise(this, key))
      return Promise.all(values)
    },

    
    validateError(msg) {
      this.$message.error(msg)
    },
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'name',
          'startTime',
          'endTime',
          'endEnrol',
          'poster',
          'detail',
          'displayType',
          'teamSize',
          'address',
          'enrolWay',
          'needExamineEnrol',
          'allowEnrolAgent',
          'notice',
          'insuranceType',
          'everyTeamMax',
          'everyTeamMin',
          'enrolWriteOpts'
        )
      )
    }
  }
}
</script>

<style scoped>
.flex-center {
  display: flex;
  align-items: center;
}
.invalid:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: red;
  opacity: 1;
}
.invalid::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: red;
  opacity: 1;
}

input.invalid:-ms-input-placeholder {
  color: red;
}
input.invalid::-webkit-input-placeholder {
  color: red;
}
</style>