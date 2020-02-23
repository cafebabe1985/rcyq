<template>
  <a-modal :title="title" :width="1200" :visible="visible" :maskClosable="false" :confirmLoading="confirmLoading"
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
          <a-divider>报名方式--个人/组队</a-divider>
          <a-col :span="24">
            <a-form-item label="报名方式" 
           
            :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-dict-select-tag 
               defaultValue="0"
              @change="handleEnrolWayChange" type="radio"
                v-decorator="['enrolWay']" :trigger-change="true" dictCode="enrol_way"
                placeholder="请选择报名方式" />
            </a-form-item>
          </a-col>
          <div v-if="showEnrolOpt">


            <a-col :span="24">
              <a-form-item label="队伍数量" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
                <a-input-number v-decorator="[ 'teamSize', validatorRules.teamSize]" placeholder="请输入队伍数量"
                  style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="每队人数上限" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
                <a-input-number v-decorator="[ 'everyTeamMax', validatorRules.everyTeamMax]" placeholder="请输入每队人数上限"
                  style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item label="每队人数下限" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
                <a-input-number v-decorator="[ 'everyTeamMin', validatorRules.everyTeamMin]" placeholder="请输入每队人数下限"
                  style="width: 100%" />
              </a-form-item>
            </a-col>
          </div>
          <a-divider>其他报名设置</a-divider>

          <a-col :span="24">
            <a-form-item label="需要审核报名" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-dict-select-tag 
              defaultValue="1"
              type="radio" v-decorator="['needExamineEnrol']" :trigger-change="true"
                dictCode="need_examine" placeholder="请选择需要审核报名" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item 
            defaultValue="0"
            label="允许代替报名" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-dict-select-tag type="radio" v-decorator="['allowEnrolAgent']" :trigger-change="true"
                dictCode="allow_enrol" placeholder="请选择允许代替报名" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="报名须知" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-input v-decorator="[ 'notice', validatorRules.notice]" placeholder="请输入报名须知"></a-input>
            </a-form-item>
          </a-col>
          <a-divider></a-divider>
          <a-col :span="24">
            <a-form-item 
            label="报名填写项" 
            :labelCol="labelCol2" 
            :wrapperCol="wrapperCol2">

              <a-checkbox-group 
              @change="onEnrolWriteChange"
              v-decorator="[ 'enrolWriteOpts']"
              :defaultValue="defultWriteOpts"
              >
                <a-checkbox :value="item" 
                v-for="(item,index) in enrolWriteOpts" 
                :key="index" >{{item.name}}</a-checkbox>
               <a-button 
               @click="addOpts"
               type="primary" style="margin-left:5px" >
                <a-icon type="plus" /> 
              </a-button>
              </a-checkbox-group>
            </a-form-item>
              
          </a-col>
<div v-if="showAddEnrolWriteForm">
  <a-col :span="24">
            <a-form-item label="报名填写项类型" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-dict-select-tag 
                @change="handleEnrolWriteTypeChange" 
                type="radio"
                defaultValue="0"
                v-decorator="['enrolWriteType']" 
                :trigger-change="true" 
                dictCode="enrol_write_type"
                placeholder="请选择报名填写类型" />
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item label="报名填写项名称" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-input v-decorator="[ 'enrolWriteName']" placeholder="请输入填写项名称"></a-input>
            </a-form-item>
          </a-col>
          <div v-if="showAddEnrolWriteOpt">
            <a-col :span="24">
            <a-form-item label="候选项" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <a-input v-decorator="[ 'enrolWriteOpt']" placeholder="请输入候选项"></a-input>
            </a-form-item>
          </a-col>
          </div>
           <a-divider />
</div>
          <!-- <a-col :span="24">
            <a-form-item v-for="(k, index) in form.getFieldValue('keys')" :key="k"
              v-bind="index <= 4 ? formItemLayout : formItemLayoutWithOutLabel" :label="index <= 4 ? 'Passengers' : ''"
              :required="false">
              <a-input v-decorator="[
          `names[${k}]`,
          {
            validateTrigger: ['change', 'blur'],
            preserve: true,
            rules: [{
              required: true,
              whitespace: true,
              message: 'Please input passenger\'s name or delete this field.',
            }],
          }
        ]" placeholder="passenger name" style="width: 60%; margin-right: 8px" />
              <a-icon v-if="form.getFieldValue('keys').length > 1" class="dynamic-delete-button" type="minus-circle-o"
                :disabled="form.getFieldValue('keys').length === 1" @click="() => remove(k)" />
            </a-form-item>
            <a-form-item v-bind="formItemLayoutWithOutLabel">
              <a-button type="dashed" style="width: 60%" @click="add">
                <a-icon type="plus" /> Add field
              </a-button>
            </a-form-item>
            <a-form-item v-bind="formItemLayoutWithOutLabel">
              <a-button type="primary" html-type="submit">
                Submit
              </a-button>
            </a-form-item>
          </a-col> -->

          <a-divider />
          <a-col :span="24">
            <a-form-item label="发布状态" :labelCol="labelCol2" :wrapperCol="wrapperCol2">
              <j-dict-select-tag type="radio" v-decorator="['displayType',validatorRules.displayType]"
                :trigger-change="true" dictCode="display_type" placeholder="请选择发布状态" />
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>

      <!-- 子表单区域 -->
      <!-- <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="活动费用表" :key="refKeys[0]" :forceRender="true">
          <wx-active-cost-form ref="wxActiveCostForm" @validateError="validateError"></wx-active-cost-form>
        </a-tab-pane>
      
      </a-tabs> -->

    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { FormTypes, getRefPromise } from '@/utils/JEditableTableUtil'
import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
import WxActiveCostForm from './WxActiveCostForm.vue'
import JDate from '@/components/jeecg/JDate'
import JUpload from '@/components/jeecg/JUpload'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import JEditor from '@/components/jeecg/JEditor'

export default {
  name: 'WxActiveModal',
  mixins: [JEditableTableMixin],
  components: {
    WxActiveCostForm,
    JDate,
    JUpload,
    JDictSelectTag,
    JEditor
  },
  data() {
    return {
      showAddEnrolWriteForm: false,
      showEnrolOpt: false,
      showAddEnrolWriteOpt: false,
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
      // 新增时子表默认添加几行空数据
      addDefaultRowNum: 1,
      validatorRules: {
        name: { rules: [{ required: true, message: '请输入活动名称!' }] },
        startTime: { rules: [{ required: true, message: '请输入活动开始时间!' }] },
        endTime: { rules: [{ required: true, message: '请输入活动结束时间!' }] },
        endEnrol: { rules: [{ required: true, message: '请输入报名截止时间!' }] },
        poster: { rules: [{ required: true, message: '请输入封面图!' }] },
        detail: { rules: [{ required: true, message: '请输入详细说明!' }] },
        displayType: { rules: [{ required: true, message: '请输入发布状态!' }] },
        teamSize: {},
        address: { rules: [{ required: true, message: '请输入活动地点!' }] },
        enrolWay: { rules: [{ required: true, message: '请输入报名方式!' }] },
        needExamineEnrol: {},
        allowEnrolAgent: {},
        notice: {},
        insuranceType: { rules: [{ required: true, message: '请输入保险类型!' }] },
        everyTeamMax: {},
        everyTeamMin: {}
      },
      refKeys: ['wxActiveCost'],
      tableKeys: [],
      activeKey: 'wxActiveCost',
      // 活动费用表
      wxActiveCostTable: {
        loading: false,
        dataSource: [],
        columns: []
      },
      url: {
        add: '/wx/wxActive/add',
        edit: '/wx/wxActive/edit',
        wxActiveCost: {
          list: '/wx/wxActive/queryWxActiveCostByMainId'
        }
      }
    }
  },
  computed: {
    defultWriteOpts() {
      return [this.enrolWriteOpts[0], this.enrolWriteOpts[1]]
    }
  },
  methods: {
    addOpts() {
      this.showAddEnrolWriteForm = true
    },
    handleEnrolWriteTypeChange(e) {
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
    onEnrolWriteChange(e) {
      console.log(this.form)
      this.form.setFieldsValue({ enrolWriteOpts: e })
      console.log(this.form.getFieldsValue())
    },
    getAllTable() {
      let values = this.tableKeys.map(key => getRefPromise(this, key))
      return Promise.all(values)
    },
    /** 调用完edit()方法之后会自动调用此方法 */
    editAfter() {
      let fieldval = pick(
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
        'enrolWriteOpts'
      )
      this.$nextTick(() => {
        this.form.setFieldsValue(fieldval)
        // this.$refs.wxActiveCostForm.initFormData(this.url.wxActiveCost.list, this.model.id)
      })
      // 加载子表数据
      // if (this.model.id) {
      //   let params = { id: this.model.id }
      // }
    },
    /** 整理成formData */
    classifyIntoFormData(allValues) {
      let main = Object.assign(this.model, allValues.formValue)

      return {
        ...main, // 展开
        wxActiveCostList: this.$refs.wxActiveCostForm.getFormData()
      }
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
</style>