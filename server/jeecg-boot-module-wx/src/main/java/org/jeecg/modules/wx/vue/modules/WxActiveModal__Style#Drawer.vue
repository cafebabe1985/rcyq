<template>
  <a-drawer
    :title="title"
    :width="width"
    placement="right"
    :closable="false"
    @close="close"
    :visible="visible">
  
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="活动名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入活动名称"></a-input>
        </a-form-item>
        <a-form-item label="活动开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择活动开始时间" v-decorator="[ 'startTime', validatorRules.startTime]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="活动结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择活动结束时间" v-decorator="[ 'endTime', validatorRules.endTime]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="报名截止时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择报名截止时间" v-decorator="[ 'endEnrol', validatorRules.endEnrol]" :trigger-change="true" :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="封面图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-upload v-decorator="['poster', validatorRules.poster]" :trigger-change="true"></j-upload>
        </a-form-item>
        <a-form-item label="详细说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'detail', validatorRules.detail]" placeholder="请输入详细说明"></a-input>
        </a-form-item>
        <a-form-item label="发布状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['displayType', validatorRules.displayType]" :trigger-change="true" dictCode="display_type" placeholder="请选择发布状态"/>
        </a-form-item>
        <a-form-item label="队伍数量" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'teamSize', validatorRules.teamSize]" placeholder="请输入队伍数量" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="活动地点" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'address', validatorRules.address]" placeholder="请输入活动地点"></a-input>
        </a-form-item>
        <a-form-item label="报名方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['enrolWay', validatorRules.enrolWay]" :trigger-change="true" dictCode="enrol_way" placeholder="请选择报名方式"/>
        </a-form-item>
        <a-form-item label="需要审核报名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['needExamineEnrol', validatorRules.needExamineEnrol]" :trigger-change="true" dictCode="need_examine" placeholder="请选择需要审核报名"/>
        </a-form-item>
        <a-form-item label="允许代替报名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['allowEnrolAgent', validatorRules.allowEnrolAgent]" :trigger-change="true" dictCode="allow_enrol" placeholder="请选择允许代替报名"/>
        </a-form-item>
        <a-form-item label="报名须知" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'notice', validatorRules.notice]" placeholder="请输入报名须知"></a-input>
        </a-form-item>
        <a-form-item label="保险类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['insuranceType', validatorRules.insuranceType]" :trigger-change="true" dictCode="insurance_type" placeholder="请选择保险类型"/>
        </a-form-item>
        <a-form-item label="每队人数上限" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'everyTeamMax', validatorRules.everyTeamMax]" placeholder="请输入每队人数上限" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="每队人数下限" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'everyTeamMin', validatorRules.everyTeamMin]" placeholder="请输入每队人数下限" style="width: 100%"/>
        </a-form-item>
        
      </a-form>
    </a-spin>
    <a-button type="primary" @click="handleOk">确定</a-button>
    <a-button type="primary" @click="handleCancel">取消</a-button>
  </a-drawer>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDate from '@/components/jeecg/JDate'  
  import JUpload from '@/components/jeecg/JUpload'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"
  
  export default {
    name: "WxActiveModal",
    components: { 
      JDate,
      JUpload,
      JDictSelectTag,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        title:"操作",
        width:800,
        visible: false,
        model: {},
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        validatorRules: {
          name: {rules: [
            {required: true, message: '请输入活动名称!'},
          ]},
          startTime: {rules: [
            {required: true, message: '请输入活动开始时间!'},
          ]},
          endTime: {rules: [
            {required: true, message: '请输入活动结束时间!'},
          ]},
          endEnrol: {rules: [
            {required: true, message: '请输入报名截止时间!'},
          ]},
          poster: {rules: [
            {required: true, message: '请输入封面图!'},
          ]},
          detail: {rules: [
            {required: true, message: '请输入详细说明!'},
          ]},
          displayType: {rules: [
            {required: true, message: '请输入发布状态!'},
          ]},
          teamSize: {rules: [
            {pattern:/^-?\d+$/, message: '请输入整数!'},
          ]},
          address: {rules: [
            {required: true, message: '请输入活动地点!'},
          ]},
          enrolWay: {rules: [
            {required: true, message: '请输入报名方式!'},
          ]},
          needExamineEnrol: {rules: [
          ]},
          allowEnrolAgent: {rules: [
          ]},
          notice: {rules: [
          ]},
          insuranceType: {rules: [
            {required: true, message: '请输入保险类型!'},
          ]},
          everyTeamMax: {rules: [
          ]},
          everyTeamMin: {rules: [
          ]},
        },
        url: {
          add: "/wx/wxActive/add",
          edit: "/wx/wxActive/edit",
        }
      }
    },
    created () {
    },
    methods: {
      add () {
        this.edit({});
      },
      edit (record) {
        this.form.resetFields();
        this.model = Object.assign({}, record);
        this.visible = true;
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.model,'name','startTime','endTime','endEnrol','poster','detail','displayType','teamSize','address','enrolWay','needExamineEnrol','allowEnrolAgent','notice','insuranceType','everyTeamMax','everyTeamMin'))
        })
      },
      close () {
        this.$emit('close');
        this.visible = false;
      },
      handleOk () {
        const that = this;
        // 触发表单验证
        this.form.validateFields((err, values) => {
          if (!err) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            let formData = Object.assign(this.model, values);
            console.log("表单提交数据",formData)
            httpAction(httpurl,formData,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
              that.close();
            })
          }
         
        })
      },
      handleCancel () {
        this.close()
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'name','startTime','endTime','endEnrol','poster','detail','displayType','teamSize','address','enrolWay','needExamineEnrol','allowEnrolAgent','notice','insuranceType','everyTeamMax','everyTeamMin'))
      }
      
    }
  }
</script>

<style lang="less" scoped>
/** Button按钮间距 */
  .ant-btn {
    margin-left: 30px;
    margin-bottom: 30px;
    float: right;
  }
</style>