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
          <j-date placeholder="请选择活动开始时间" v-decorator="[ 'startTime', validatorRules.startTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="活动结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择活动结束时间" v-decorator="[ 'endTime', validatorRules.endTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="报名开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择报名开始时间" v-decorator="[ 'enrolStartTime', validatorRules.enrolStartTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="报名结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-date placeholder="请选择报名结束时间" v-decorator="[ 'enrolEndTime', validatorRules.enrolEndTime]" :trigger-change="true" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="费用" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'cost', validatorRules.cost]" placeholder="请输入费用" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="活动类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['type', validatorRules.type]" :trigger-change="true" dictCode="active_type" placeholder="请选择活动类型"/>
        </a-form-item>
        <a-form-item label="封面图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-upload v-decorator="['poster', validatorRules.poster]" :trigger-change="true"></j-upload>
        </a-form-item>
        <a-form-item label="名额" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'remain', validatorRules.remain]" placeholder="请输入名额" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="详细说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'detail', validatorRules.detail]" placeholder="请输入详细说明"></a-input>
        </a-form-item>
        <a-form-item label="组织人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'managerId', validatorRules.managerId]" placeholder="请输入组织人"></a-input>
        </a-form-item>
        <a-form-item label="发布状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['displayType', validatorRules.displayType]" :trigger-change="true" dictCode="display_type" placeholder="请选择发布状态"/>
        </a-form-item>
        <a-form-item label="关键字" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'keyWords', validatorRules.keyWords]" placeholder="请输入关键字"></a-input>
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
          enrolStartTime: {rules: [
            {required: true, message: '请输入报名开始时间!'},
          ]},
          enrolEndTime: {rules: [
            {required: true, message: '请输入报名结束时间!'},
          ]},
          cost: {rules: [
            {required: true, message: '请输入费用!'},
           {pattern:/^(([1-9][0-9]*)|([0]\.\d{0,2}|[1-9][0-9]*\.\d{0,2}))$/, message: '请输入正确的金额!'},
          ]},
          type: {rules: [
            {required: true, message: '请输入活动类型!'},
          ]},
          poster: {rules: [
            {required: true, message: '请输入封面图!'},
          ]},
          remain: {rules: [
            {required: true, message: '请输入名额!'},
          ]},
          detail: {rules: [
            {required: true, message: '请输入详细说明!'},
          ]},
          managerId: {rules: [
            {required: true, message: '请输入组织人!'},
          ]},
          displayType: {rules: [
            {required: true, message: '请输入发布状态!'},
          ]},
          keyWords: {rules: [
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
          this.form.setFieldsValue(pick(this.model,'name','startTime','endTime','enrolStartTime','enrolEndTime','cost','type','poster','remain','detail','managerId','displayType','keyWords'))
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
        this.form.setFieldsValue(pick(row,'name','startTime','endTime','enrolStartTime','enrolEndTime','cost','type','poster','remain','detail','managerId','displayType','keyWords'))
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