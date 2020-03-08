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

        <a-form-item label="真实姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'realName', validatorRules.realName]" placeholder="请输入真实姓名"></a-input>
        </a-form-item>
        <a-form-item label="微信openID" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'userOpenId', validatorRules.userOpenId]" placeholder="请输入微信openID"></a-input>
        </a-form-item>
        <a-form-item label="身份证号" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'cid', validatorRules.cid]" placeholder="请输入身份证号"></a-input>
        </a-form-item>
        <a-form-item label="身份证正面照" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-upload v-decorator="['cidfront', validatorRules.cidfront]" :trigger-change="true"></j-upload>
        </a-form-item>
        <a-form-item label="身份证背面照" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-upload v-decorator="['cidback', validatorRules.cidback]" :trigger-change="true"></j-upload>
        </a-form-item>
        <a-form-item label="授权状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['status', validatorRules.status]" :trigger-change="true" dictCode="apply_status" placeholder="请选择授权状态"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

  import { httpAction } from '@/api/manage'
  import pick from 'lodash.pick'
  import { validateDuplicateValue } from '@/utils/util'
  import JUpload from '@/components/jeecg/JUpload'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"

  export default {
    name: "ApplyScenicModal",
    components: { 
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
          realName: {rules: [
            {required: true, message: '请输入真实姓名!'},
          ]},
          userOpenId: {rules: [
            {required: true, message: '请输入微信openID!'},
          ]},
          cid: {rules: [
            {required: true, message: '请输入身份证号!'},
          ]},
          cidfront: {rules: [
            {required: true, message: '请输入身份证正面照!'},
          ]},
          cidback: {rules: [
            {required: true, message: '请输入身份证背面照!'},
          ]},
          status: {rules: [
            {required: true, message: '请输入授权状态!'},
          ]},
        },
        url: {
          add: "/wx/applyScenic/add",
          edit: "/wx/applyScenic/edit",
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
          this.form.setFieldsValue(pick(this.model,'realName','userOpenId','cid','cidfront','cidback','status'))
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
        this.form.setFieldsValue(pick(row,'realName','userOpenId','cid','cidfront','cidback','status'))
      },

      
    }
  }
</script>