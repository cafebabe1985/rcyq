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

        <a-form-item label="广告图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-upload v-decorator="['img', validatorRules.img]" :trigger-change="true"></j-upload>
        </a-form-item>
        <a-form-item label="跳转地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'targetHref', validatorRules.targetHref]" placeholder="请输入跳转地址"></a-input>
        </a-form-item>
        <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['type', validatorRules.type]" :trigger-change="true" dictCode="swiper_type" placeholder="请选择类型"/>
        </a-form-item>
        <a-form-item label="名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'name', validatorRules.name]" placeholder="请输入名称"></a-input>
        </a-form-item>
        <a-form-item label="轮播顺序" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'displayOrder', validatorRules.displayOrder]" placeholder="请输入轮播顺序" style="width: 100%"/>
        </a-form-item>
        <a-form-item label="是否展示" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['display', validatorRules.display]" :trigger-change="true" dictCode="display_type" placeholder="请选择是否展示"/>
        </a-form-item>
        <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-editor v-decorator="['content',{trigger:'input'}]"/>
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
  import JEditor from '@/components/jeecg/JEditor'

  export default {
    name: "WxSwiperModal",
    components: { 
      JUpload,
      JDictSelectTag,
      JEditor,
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
          img: {rules: [
            {required: true, message: '请输入广告图!'},
          ]},
          targetHref: {rules: [
          ]},
          type: {rules: [
            {required: true, message: '请输入类型!'},
          ]},
          name: {rules: [
            {required: true, message: '请输入名称!'},
          ]},
          displayOrder: {rules: [
            {required: true, message: '请输入轮播顺序!'},
           {pattern:/^-?\d+\.?\d*$/, message: '请输入数字!'},
          ]},
          display: {rules: [
            {required: true, message: '请输入是否展示!'},
          ]},
          content: {rules: [
          ]},
        },
        url: {
          add: "/wx/wxSwiper/add",
          edit: "/wx/wxSwiper/edit",
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
          this.form.setFieldsValue(pick(this.model,'img','targetHref','type','name','displayOrder','display','content'))
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
        this.form.setFieldsValue(pick(row,'img','targetHref','type','name','displayOrder','display','content'))
      },

      
    }
  }
</script>