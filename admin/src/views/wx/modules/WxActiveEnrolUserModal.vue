<template>
  <a-modal
    :title="title"
    :width="width"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭">
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">

        <a-form-item label="活动ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'activeId', validatorRules.activeId]" placeholder="请输入活动ID"></a-input>
        </a-form-item>
        <a-form-item label="用户openID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'userOpneId', validatorRules.userOpneId]" placeholder="请输入用户openID"></a-input>
        </a-form-item>
        <a-form-item label="用户类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'userType', validatorRules.userType]" placeholder="请输入用户类型"></a-input>
        </a-form-item>
        <a-form-item label="用户电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'userPhone', validatorRules.userPhone]" placeholder="请输入用户电话"></a-input>
        </a-form-item>
        <a-form-item label="活动期间昵称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'userNickName', validatorRules.userNickName]" placeholder="请输入活动期间昵称"></a-input>
        </a-form-item>
        <a-form-item label="真实姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'userRealName', validatorRules.userRealName]" placeholder="请输入真实姓名"></a-input>
        </a-form-item>
        <a-form-item label="身份证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'userCid', validatorRules.userCid]" placeholder="请输入身份证号"></a-input>
        </a-form-item>
        <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['userGender', validatorRules.userGender]" :trigger-change="true" dictCode="user_gender" placeholder="请选择性别"/>
        </a-form-item>
        <a-form-item label="帮助报名人ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'enrolAgentOpenId', validatorRules.enrolAgentOpenId]" placeholder="请输入帮助报名人ID"></a-input>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"

  export default {
    name: "WxActiveEnrolUserModal",
    components: { 
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
          activeId: {rules: [
          ]},
          userOpneId: {rules: [
          ]},
          userType: {rules: [
          ]},
          userPhone: {rules: [
          ]},
          userNickName: {rules: [
          ]},
          userRealName: {rules: [
          ]},
          userCid: {rules: [
          ]},
          userGender: {rules: [
          ]},
          enrolAgentOpenId: {rules: [
          ]},
        },
        url: {
          add: "/wx/wxActiveEnrolUser/add",
          edit: "/wx/wxActiveEnrolUser/edit",
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
          this.form.setFieldsValue(pick(this.model,'activeId','userOpneId','userType','userPhone','userNickName','userRealName','userCid','userGender','enrolAgentOpenId'))
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
        this.form.setFieldsValue(pick(row,'activeId','userOpneId','userType','userPhone','userNickName','userRealName','userCid','userGender','enrolAgentOpenId'))
      },

      
    }
  }
</script>