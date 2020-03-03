<template>
  <a-modal :title="title" :width="width" :visible="visible" :confirmLoading="confirmLoading" @ok="handleOk"
    @cancel="handleCancel" cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="活动名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入活动名称"></a-input>
        </a-form-item>
        <a-form-item label="活动开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择活动开始时间" v-decorator="[ 'startTime', validatorRules.startTime]" :trigger-change="true"
            :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" />
        </a-form-item>
        <a-form-item label="活动结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择活动结束时间" v-decorator="[ 'endTime', validatorRules.endTime]" :trigger-change="true"
            :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" />
        </a-form-item>
        <a-form-item label="报名截止时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择报名截止时间" v-decorator="[ 'endEnrol', validatorRules.endEnrol]" :trigger-change="true"
            :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%" />
        </a-form-item>
        
        <a-form-item label="封面图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-upload v-decorator="['poster', validatorRules.poster]" :trigger-change="true"></j-upload>
        </a-form-item>
        <a-form-item label="详细说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-editor v-decorator="['detail',{trigger:'input'}]" />
        </a-form-item>
        
        <a-form-item label="点击数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number 
          style="width:100%"
          v-decorator="[ 'hit']" placeholder="请输入活动地点"></a-input-number>
        </a-form-item>

        <a-form-item label="活动地点" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'address', validatorRules.address]" placeholder="请输入活动地点"></a-input>
        </a-form-item>


        <a-form-item label="保险类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['insuranceType', validatorRules.insuranceType]"
            :trigger-change="true" dictCode="insurance_type" placeholder="请选择保险类型" />
        </a-form-item>


        <a-divider>费用设置</a-divider>

        <a-form-item label="活动费用" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['cost.type', validatorRules.costType]" :trigger-change="true"
            dictCode="cost_type" placeholder="请选择报名方式" @change="handleCostTypeChange" />
        </a-form-item>
        <div v-if="form.getFieldValue('cost.type')&& form.getFieldValue('cost.type')!='0'">
        <!-- <a-form-item label="活动总名额" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number style="width:100%" v-decorator="['cost.number', validatorRules.costNumber]"
            placeholder="填写总名额"></a-input-number>
        </a-form-item> -->
        <a-form-item label="退款方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['cost.refundType', validatorRules.refundType]"
            :trigger-change="true" dictCode="refund_type" placeholder="请选择退款方式" />
        </a-form-item>
        <a-col :offset="5">
 <a-button  type="primary" style="margin-right:15px;margin-bottom:10px" @click="addCostOpt">
              新增收费项目
            </a-button>
          </a-col>
        <div v-for="(item,index) in form.getFieldValue('keys')" :key="index">

          <a-col :span="5" style="text-align:right;height:100px;line-height:100px">
           
            <a-button  
            @click="removeOpt(index)"
            type="danger" style="margin-right:15px;">
              删除
            </a-button>
          </a-col>
          <a-col :span="18">

            <a-form-item label="" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="[
          `cost[opts][${index}][name]`,
          {
            validateTrigger: ['change', 'blur'],
            preserve: true,
            rules: [{
             validator:validateCostOpt,
              message: '必填',
            }],
          }
        ]" 
        placeholder="费用名称" maxLength="15"></a-input>
            </a-form-item>
            <a-form-item label="" :labelCol="labelCol" :wrapperCol="wrapperCol">

              <a-input-number 
              v-decorator="[
         `cost[opts][${index}][cost]`,
          {
            validateTrigger: ['change', 'blur'],
            preserve: true,
            rules: [{
             validator:validateCostOpt,
              message: '必填',
            }],
          }
        ]" 
              placeholder="金额" style="width:100%" type="number"></a-input-number>
            </a-form-item>
            <a-form-item label="" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number  
              v-decorator="[
          `cost[opts][${index}][number]`,
          {
            validateTrigger: ['change', 'blur'],
            preserve: true,
            rules: [{
             validator:validateCostOpt,
              message: '必填',
            }],
          }
        ]" 
              placeholder="名额'" style="width:100%" type="number"></a-input-number>
            </a-form-item>
            <a-divider />
          </a-col>
           </div> 
        </div>
       
        <a-divider></a-divider>
        <a-form-item label="报名方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['enrolWay', validatorRules.enrolWay]" :trigger-change="true"
            dictCode="enrol_way" placeholder="请选择报名方式" />
        </a-form-item>
        <div v-if="form.getFieldValue('enrolWay')&&form.getFieldValue('enrolWay') != '0'">
          <a-form-item label="队伍数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number v-decorator="[ 'teamSize', validatorRules.teamSize]" placeholder="请输入队伍数量"
              style="width: 100%" />
          </a-form-item>
          <a-form-item label="每队人数上限" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number v-decorator="[ 'everyTeamMax', validatorRules.everyTeamMax]" placeholder="请输入每队人数上限"
              style="width: 100%" />
          </a-form-item>
          <a-form-item label="每队人数下限" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number v-decorator="[ 'everyTeamMin', validatorRules.everyTeamMin]" placeholder="请输入每队人数下限"
              style="width: 100%" />
          </a-form-item>
        </div>

        <a-divider>其他设置</a-divider>
        <a-form-item label="需要审核报名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['needExamineEnrol', validatorRules.needExamineEnrol]"
            :trigger-change="true" dictCode="need_examine" placeholder="请选择需要审核报名" />
        </a-form-item>
        <a-form-item label="允许代替报名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['allowEnrolAgent', validatorRules.allowEnrolAgent]"
            :trigger-change="true" dictCode="allow_enrol" placeholder="请选择允许代替报名" />
        </a-form-item>
        <a-form-item label="报名须知" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'notice', validatorRules.notice]" placeholder="请输入报名须知"></a-input>
        </a-form-item>
       
            <a-form-item label="报名填写项" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-checkbox-group              
              v-decorator="[ 'enrolWriteOpts',validatorRules.enrolWriteOpts]">
                <a-checkbox 
                :disabled="item.required"
                :value="item" 
                v-for="(item,index) in enrolWriteOpts" :key="index">
                {{item.name}}</a-checkbox>
                <a-button @click="addEnrolOpts" type="primary" style="margin-left:5px">
                  <a-icon type="plus" />
                </a-button>
              </a-checkbox-group>
            </a-form-item>
            <div v-if="showAddEnrolWriteForm">           
            <a-form-item label="报名填写项类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <j-dict-select-tag @change="handleEnrolWriteTypeChange" type="radio" v-model="enrolWriteOptsItem.type"
                  :trigger-change="true" dictCode="enrol_write_type" placeholder="请选择报名填写类型" />
              </a-form-item>
              <a-form-item label="报名填写项名称" 
              :labelCol="labelCol" :wrapperCol="wrapperCol"
              :validate-status="enrolWriteOptsItem.name?'success':'error'"
              :help="enrolWriteOptsItem.name?'':'*必须填写名称'"
              >
                <a-input v-model="enrolWriteOptsItem.name" placeholder="请输入填写项名称"></a-input>
              </a-form-item>
 <div v-if="showAddEnrolWriteOpt">
              <a-col v-for="(item,index) in writeOptItems" :key="index" :span="24">
                <a-form-item :label="'候选项'+(index+1)" :labelCol="labelCol" :wrapperCol="wrapperCol">
                  <div class="flex-center">
                    <a-input v-model="writeOptItems[index]" placeholder="请输入候选项">

                    </a-input>
                    <a-button v-if="index===writeOptItems.length-1" 
                    @click="addEnrolOptsItem" type="primary"
                      style="margin-left:5px">
                      <a-icon type="plus" />
                    </a-button>
                    <a-button v-else @click="removeEnrolOptsItem(index)" type="danger" style="margin-left:5px">
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
         
        <a-divider></a-divider>
        <a-form-item label="发布状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['displayType', validatorRules.displayType]"
            :trigger-change="true" dictCode="display_type" placeholder="请选择发布状态" />
        </a-form-item>

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
let id = 0
const enrolWriteOpts = [
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
]
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
      optsInited: false,
      showAddEnrolWriteOpt: false,
      showAddEnrolWriteForm: false,
      writeOptItems: [''],
      title: '操作',
      width: 1000,
      visible: false,
      enrolWriteOpts: enrolWriteOpts,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      validatorRules: {
        name: {
          rules: [{ required: true, message: '请输入活动名称!' }]
        },
        startTime: {
          rules: [{ required: true, message: '请输入活动开始时间!' }]
        },
        endTime: {
          rules: [
            { required: true, message: '请输入活动结束时间!' },
            {
              validator: (rule, value, callback) => {
                let s = this.form.getFieldValue('startTime')
                if (s && s >= value) {
                  callback(true)
                } else {
                  callback()
                }
              },
              message: '结束时间要晚于开始时间'
            }
          ]
        },
        endEnrol: {
          rules: [
            { required: true, message: '请输入报名截止时间!' },
            {
              validator: (rule, value, callback) => {
                let e = this.form.getFieldValue('endTime')
                if (e && e <= value) {
                  callback(true)
                } else {
                  callback()
                }
              },
              message: '报名截止时间要早于结束时间'
            }
          ]
        },
        poster: {
          rules: [{ required: true, message: '请输入封面图!' }]
        },
        detail: {
          rules: [{ required: true, message: '请输入详细说明!' }]
        },
        displayType: {
          rules: [{ required: true, message: '请输入发布状态!' }]
        },
        costType: {
          initialValue: '0'
        },
        refundType: {
          initialValue: '0',
          preserve: true
        },
        teamSize: {
          rules: [
            {
              validator: (rule, value, callback) => {
                if (this.form.getFieldValue('enrolWay') != '0' && !value) {
                  callback(true)
                } else {
                  callback()
                }
              },
              message: '必须填写队伍数量'
            },
            { pattern: /^-?\d+$/, message: '请输入整数!' }
          ]
        },

        address: {
          rules: [{ required: true, message: '请输入活动地点!' }]
        },
        enrolWay: {
          rules: [{ required: true, message: '请输入报名方式!' }],
          initialValue: '0'
        },
        needExamineEnrol: {
          rules: [],
          initialValue: '0'
        },
        allowEnrolAgent: {
          rules: [],
          initialValue: '1'
        },
        notice: {
          rules: []
        },
        insuranceType: {
          rules: [{ required: true, message: '请输入保险类型!' }]
        },
        everyTeamMax: {
          rules: []
        },
        everyTeamMin: {
          rules: []
        },
        enrolWriteOpts: {
          initialValue: [enrolWriteOpts[0], enrolWriteOpts[1]]
        }
      },
      enrolWriteOptsItem: {
        name: null,
        type: null,
        opts: null
      },
      url: {
        add: '/wx/wxActive/addVO',
        edit: '/wx/wxActive/editVO'
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
    this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
  },
  created() {},
  methods: {
    handleEnrolWriteTypeChange(e) {
      this.enrolWriteOptsItem.type = e
      if (e != '0') {
        this.showAddEnrolWriteOpt = true
      } else {
        this.showAddEnrolWriteOpt = false
      }
    },
    addEnrolOpts() {
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
    removeEnrolOptsItem(index) {
      this.writeOptItems.splice(index, 1)
    },
    addEnrolOptsItem() {
      this.writeOptItems.push('')
    },
    configAddItem() {
      if (this.enrolWriteOptsItem.name) {
        this.enrolWriteOptsItem.opts = this.writeOptItems
        this.enrolWriteOpts.push(this.enrolWriteOptsItem)
        this.showAddEnrolWriteForm = false
      }
    },
    validateCostOpt(r, v, cb) {
      console.log(this.form.getFieldValue('cost.type') != '0')
      if (this.form.getFieldValue('cost.type') != '0') {
        if (!v) {
          cb(true)
        } else {
          cb()
        }
      } else {
        cb()
      }
    },
    onCostOptInput() {},
    handleCostTypeChange(val) {},
    removeOpt(index) {
      const keys = this.form.getFieldValue('keys')

      this.form.setFieldsValue({
        keys: keys.filter(key => key !== index)
      })
    },
    addCostOpt() {
      const keys = this.form.getFieldValue('keys')
      const nextKeys = keys.concat(id)

      this.form.setFieldsValue({
        keys: nextKeys
      })
      id++
    },
    add() {
      this.edit({}, 1)
    },
    edit(record, isEdit) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true

      if (isEdit != 1) {
        this.form.getFieldDecorator('teamSize', { initialValue: null, preserve: true })
        this.form.getFieldDecorator('everyTeamMax', { initialValue: null, preserve: true })
        this.form.getFieldDecorator('everyTeamMin', { initialValue: null, preserve: true })
        if (record.cost && record.cost.opts) {
          this.form.getFieldDecorator('cost.type', { initialValue: record.cost.type, preserve: true })
          this.form.getFieldDecorator('cost.id', { initialValue: record.cost.id, preserve: true })
          this.form.getFieldDecorator('cost.number', { initialValue: null, preserve: true })
          this.form.getFieldDecorator('cost.refundType', { initialValue: null, preserve: true })
          if (record.cost.opts.length > 0) {
            for (let index in record.cost.opts) {
              this.form.getFieldDecorator(`cost[opts][${index}][id]`, {
                initialValue: record.cost.opts[index]['id'],
                preserve: true
              })
              this.form.getFieldDecorator(`cost[opts][${index}][name]`, {
                initialValue: record.cost.opts[index]['name'],
                preserve: true
              })
              this.form.getFieldDecorator(`cost[opts][${index}][cost]`, {
                initialValue: record.cost.opts[index]['cost'],
                preserve: true
              })
              this.form.getFieldDecorator(`cost[opts][${index}][number]`, {
                initialValue: record.cost.opts[index]['number'],
                preserve: true
              })
            }
            let keyn = record.cost.opts
            let keysEd = []
            for (let i in keyn) {
              keysEd.push(parseInt(i))
            }
            this.model.keys = keysEd
          }
        }

        let indexs = []
        let remain = []
        let dfTrail = enrolWriteOpts.length - 1

        let catArr = enrolWriteOpts.concat(record.enrolWriteOpts).filter((cur, index, arr) => {
          if (index <= dfTrail) {
            for (let i in record.enrolWriteOpts) {
              if (cur.name === record.enrolWriteOpts[i].name) {
                if (indexs.indexOf(index) == -1) {
                  indexs.push(index)
                }
                let j = parseInt(i) + parseInt(dfTrail) + 1
                if (remain.indexOf(j) == -1) {
                  remain.push(j)
                }
              }
            }
          }
          return true
        })

        for (let i in indexs) {
          catArr[indexs[i]] = catArr[remain[i]]
        }

        let catArr2 = catArr.filter((cur, index, arr) => {
          if (remain.indexOf(index) == -1) {
            return true
          }
        })
        catArr2[0].required = true
        catArr2[1].required = true
        this.enrolWriteOpts = catArr2
        this.validatorRules.enrolWriteOpts.initialValue = record.enrolWriteOpts
      } else {
        this.enrolWriteOpts = enrolWriteOpts
        this.validatorRules.enrolWriteOpts.initialValue = [enrolWriteOpts[0], enrolWriteOpts[1]]
      }

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
            'everyTeamMin',
            'cost',
            'enrolWriteOpts',
            'keys',
            'hit'
          )
        )
        console.log(this.form.getFieldsValue())
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
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
          formData.cost.number = 0
          if (formData.cost['type'] != '') {
            if (formData.cost.opts) {
              for (let i in formData.cost.opts) {
                formData.cost.number += parseInt(formData.cost.opts[i].number)
              }
            }
          }

          console.log('表单提交数据', formData)
          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              this.optsInited = false
              this.showAddEnrolWriteOpt = false
              this.showAddEnrolWriteForm = false
              this.writeOptItems = ['']
              this.enrolWriteOptsItem = {
                name: null,
                type: null,
                opts: null
              }
              this.enrolWriteOpts = enrolWriteOpts
              that.confirmLoading = false

              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    }
  }
}
</script>