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

        <a-form-item label="微信ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'openId', validatorRules.openId]" placeholder="请输入微信ID"></a-input>
        </a-form-item>
        <a-form-item label="微信昵称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'nickName', validatorRules.nickName]" placeholder="请输入微信昵称"></a-input>
        </a-form-item>
        <a-form-item label="城市" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'city', validatorRules.city]" placeholder="请输入城市"></a-input>
        </a-form-item>
        <a-form-item label="国家" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'country', validatorRules.country]" placeholder="请输入国家"></a-input>
        </a-form-item>
        <a-form-item label="性别" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'gender', validatorRules.gender]" placeholder="请输入性别"></a-input>
        </a-form-item>
        <a-form-item label="语言" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'language', validatorRules.language]" placeholder="请输入语言"></a-input>
        </a-form-item>
        <a-form-item label="省份" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'province', validatorRules.province]" placeholder="请输入省份"></a-input>
        </a-form-item>
        <a-form-item label="头像" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'avatarUrl', validatorRules.avatarUrl]" placeholder="请输入头像"></a-input>
        </a-form-item>
        <a-form-item label="会员等级" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'vipLevel', validatorRules.vipLevel]" placeholder="请输入会员等级"></a-input>
        </a-form-item>
        <a-form-item label="积分" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'accumulatePoint', validatorRules.accumulatePoint]" placeholder="请输入积分" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="手机" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'phone', validatorRules.phone]" placeholder="请输入手机"></a-input>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: "WxUserModal",
    components: { 
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
          openId: {rules: [
          ]},
          nickName: {rules: [
          ]},
          city: {rules: [
          ]},
          country: {rules: [
          ]},
          gender: {rules: [
          ]},
          language: {rules: [
          ]},
          province: {rules: [
          ]},
          avatarUrl: {rules: [
          ]},
          vipLevel: {rules: [
          ]},
          accumulatePoint: {rules: [
          ]},
          phone: {rules: [
          ]},
        },
        url: {
          add: "/wx/wxUser/add",
          edit: "/wx/wxUser/edit",
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
          this.form.setFieldsValue(pick(this.model,'openId','nickName','city','country','gender','language','province','avatarUrl','vipLevel','accumulatePoint','phone'))
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
        this.form.setFieldsValue(pick(row,'openId','nickName','city','country','gender','language','province','avatarUrl','vipLevel','accumulatePoint','phone'))
      },

      
    }
  }
</script>