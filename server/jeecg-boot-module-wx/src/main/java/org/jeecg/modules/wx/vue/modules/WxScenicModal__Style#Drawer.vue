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

        <a-form-item label="标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'title', validatorRules.title]" placeholder="请输入标题"></a-input>
        </a-form-item>
        <a-form-item label="副标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'subTitle', validatorRules.subTitle]" placeholder="请输入副标题"></a-input>
        </a-form-item>
        <a-form-item label="封面图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-upload v-decorator="['poster', validatorRules.poster]" :trigger-change="true"></j-upload>
        </a-form-item>
        <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'content', validatorRules.content]" placeholder="请输入内容"></a-input>
        </a-form-item>
        <a-form-item label="编辑" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'author', validatorRules.author]" placeholder="请输入编辑"></a-input>
        </a-form-item>
        <a-form-item label="小片名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'scenicName', validatorRules.scenicName]" placeholder="请输入小片名称"></a-input>
        </a-form-item>
        <a-form-item label="所在城市" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'city', validatorRules.city]" placeholder="请输入所在城市"></a-input>
        </a-form-item>
        <a-form-item label="展示类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['displayType', validatorRules.displayType]" :trigger-change="true" dictCode="display_type" placeholder="请选择展示类型"/>
        </a-form-item>
        <a-form-item label="跳转地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'targetUrl', validatorRules.targetUrl]" placeholder="请输入跳转地址"></a-input>
        </a-form-item>
        <a-form-item label="内容类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['newsType', validatorRules.newsType]" :trigger-change="true" dictCode="content_type" placeholder="请选择内容类型"/>
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
  import JUpload from '@/components/jeecg/JUpload'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"
  
  export default {
    name: "WxScenicModal",
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
          title: {rules: [
            {required: true, message: '请输入标题!'},
          ]},
          subTitle: {rules: [
          ]},
          poster: {rules: [
            {required: true, message: '请输入封面图!'},
          ]},
          content: {rules: [
            {required: true, message: '请输入内容!'},
          ]},
          author: {rules: [
            {required: true, message: '请输入编辑!'},
          ]},
          scenicName: {rules: [
            {required: true, message: '请输入小片名称!'},
          ]},
          city: {rules: [
            {required: true, message: '请输入所在城市!'},
          ]},
          displayType: {rules: [
            {required: true, message: '请输入展示类型!'},
          ]},
          targetUrl: {rules: [
          ]},
          newsType: {rules: [
            {required: true, message: '请输入内容类型!'},
          ]},
        },
        url: {
          add: "/wx/wxScenic/add",
          edit: "/wx/wxScenic/edit",
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
          this.form.setFieldsValue(pick(this.model,'title','subTitle','poster','hit','content','author','scenicName','city','displayType','targetUrl','newsType'))
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
        this.form.setFieldsValue(pick(row,'title','subTitle','poster','hit','content','author','scenicName','city','displayType','targetUrl','newsType'))
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