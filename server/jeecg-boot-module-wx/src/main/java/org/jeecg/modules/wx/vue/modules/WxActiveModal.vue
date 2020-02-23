<template>
  <a-modal
    :title="title"
    :width="1200"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
      <!-- 主表单区域 -->
      <a-form :form="form">
        <a-row>

          <a-col :span="12">
            <a-form-item label="活动名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入活动名称"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="活动开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择活动开始时间" v-decorator="[ 'startTime', validatorRules.startTime]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="活动结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择活动结束时间" v-decorator="[ 'endTime', validatorRules.endTime]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="报名截止时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-date placeholder="请选择报名截止时间" v-decorator="[ 'endEnrol', validatorRules.endEnrol]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="封面图" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-upload v-decorator="['poster']" :trigger-change="true"></j-upload>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="详细说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-editor v-decorator="['detail',{trigger:'input'}]"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="发布状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="radio" v-decorator="['displayType']" :trigger-change="true" dictCode="display_type" placeholder="请选择发布状态"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="队伍数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="[ 'teamSize', validatorRules.teamSize]" placeholder="请输入队伍数量" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="活动地点" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="[ 'address', validatorRules.address]" placeholder="请输入活动地点"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="报名方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="radio" v-decorator="['enrolWay']" :trigger-change="true" dictCode="enrol_way" placeholder="请选择报名方式"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="需要审核报名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="radio" v-decorator="['needExamineEnrol']" :trigger-change="true" dictCode="need_examine" placeholder="请选择需要审核报名"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="允许代替报名" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="radio" v-decorator="['allowEnrolAgent']" :trigger-change="true" dictCode="allow_enrol" placeholder="请选择允许代替报名"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="报名须知" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input v-decorator="[ 'notice', validatorRules.notice]" placeholder="请输入报名须知"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="保险类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <j-dict-select-tag type="list" v-decorator="['insuranceType']" :trigger-change="true" dictCode="insurance_type" placeholder="请选择保险类型"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="每队人数上限" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="[ 'everyTeamMax', validatorRules.everyTeamMax]" placeholder="请输入每队人数上限" style="width: 100%"/>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="每队人数下限" :labelCol="labelCol" :wrapperCol="wrapperCol">
              <a-input-number v-decorator="[ 'everyTeamMin', validatorRules.everyTeamMin]" placeholder="请输入每队人数下限" style="width: 100%"/>
            </a-form-item>
          </a-col>

        </a-row>
      </a-form>

      <!-- 子表单区域 -->
      <a-tabs v-model="activeKey" @change="handleChangeTabs">
        <a-tab-pane tab="活动费用表" :key="refKeys[0]" :forceRender="true">
          <wx-active-cost-form ref="wxActiveCostForm" @validateError="validateError"></wx-active-cost-form>
        </a-tab-pane>
      
      </a-tabs>

    </a-spin>
  </a-modal>
</template>

<script>

  import pick from 'lodash.pick'
  import { FormTypes,getRefPromise } from '@/utils/JEditableTableUtil'
  import { JEditableTableMixin } from '@/mixins/JEditableTableMixin'
  import WxActiveCostForm from './WxActiveCostForm.vue'
  import JDate from '@/components/jeecg/JDate'  
  import JUpload from '@/components/jeecg/JUpload'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"
  import JEditor from '@/components/jeecg/JEditor'

  export default {
    name: 'WxActiveModal',
    mixins: [JEditableTableMixin],
    components: {
    WxActiveCostForm,
      JDate,
      JUpload,
      JDictSelectTag,
      JEditor,
    },
    data() {
      return {
        labelCol: {
          span: 6
        },
        wrapperCol: {
          span: 16
        },
        labelCol2: {
          span: 3
        },
        wrapperCol2: {
          span: 20
        },
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
          teamSize:{},
          address: { rules: [{ required: true, message: '请输入活动地点!' }] },
          enrolWay: { rules: [{ required: true, message: '请输入报名方式!' }] },
          needExamineEnrol:{},
          allowEnrolAgent:{},
          notice:{},
          insuranceType: { rules: [{ required: true, message: '请输入保险类型!' }] },
          everyTeamMax:{},
          everyTeamMin:{},
        },
        refKeys: ['wxActiveCost', ],
        tableKeys:[],
        activeKey: 'wxActiveCost',
        // 活动费用表
        wxActiveCostTable: {
          loading: false,
          dataSource: [],
          columns: [
          ]
        },
        url: {
          add: "/wx/wxActive/add",
          edit: "/wx/wxActive/edit",
          wxActiveCost: {
            list: '/wx/wxActive/queryWxActiveCostByMainId'
          },
        }
      }
    },
    methods: {
      getAllTable() {
        let values = this.tableKeys.map(key => getRefPromise(this, key))
        return Promise.all(values)
      },
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        let fieldval = pick(this.model,'name','startTime','endTime','endEnrol','poster','detail','displayType','teamSize','address','enrolWay','needExamineEnrol','allowEnrolAgent','notice','insuranceType','everyTeamMax','everyTeamMin')
        this.$nextTick(() => {
          this.form.setFieldsValue(fieldval)
          this.$refs.wxActiveCostForm.initFormData(this.url.wxActiveCost.list,this.model.id)
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
        }
      },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)

        return {
          ...main, // 展开
          wxActiveCostList: this.$refs.wxActiveCostForm.getFormData(),
        }
      },
      validateError(msg){
        this.$message.error(msg)
      },
     popupCallback(row){
       this.form.setFieldsValue(pick(row,'name','startTime','endTime','endEnrol','poster','detail','displayType','teamSize','address','enrolWay','needExamineEnrol','allowEnrolAgent','notice','insuranceType','everyTeamMax','everyTeamMin'))
     },

    }
  }
</script>

<style scoped>
</style>