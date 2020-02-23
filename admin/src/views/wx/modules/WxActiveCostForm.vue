<template>
  <div>
    <a-form :form="form">
      <a-row>

        <a-col :span="12">
          <a-form-item label="费用类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag type="list" v-decorator="['type']" :trigger-change="true" dictCode="cost_type" placeholder="请选择费用类型"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="总名额" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number v-decorator="[ 'number', validatorRules.number]" placeholder="请输入总名额" style="width: 100%"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="退款方式" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <j-dict-select-tag type="list" v-decorator="['refundType']" :trigger-change="true" dictCode="refund_type" placeholder="请选择退款方式"/>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="活动ID" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="[ 'activeId', validatorRules.activeId]" placeholder="请输入活动ID"></a-input>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
  import pick from 'lodash.pick'
  import { getAction } from '@/api/manage'
  import JDictSelectTag from "@/components/dict/JDictSelectTag"

  export default {
    name: 'WxActiveCostForm',
    components: { 
      JDictSelectTag,
    },
    data () {
      return {
        form: this.$form.createForm(this),
        model: {},
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
        confirmLoading: false,
        validatorRules:{
          type:{},
          number:{},
          refundType:{},
          activeId:{},
        },
        
      }
    },
    methods:{
      initFormData(url,id){
        this.clearFormData()
        if(!id){
          this.edit({})
        }else{
          getAction(url,{id:id}).then(res=>{
            if(res.success){
              let records = res.result
              if(records && records.length>0){
                this.edit(records[0])
              }
            }
          })
        }
      },
      edit(record){
        this.model = Object.assign({}, record)
        console.log("WxActiveCostForm-edit",this.model);
        let fieldval = pick(this.model,'type','number','refundType','activeId')
        this.$nextTick(() => {
          this.form.setFieldsValue(fieldval)
        })
      },
      getFormData(){
        let formdata_arr = []
        this.form.validateFields((err, values) => {
          if (!err) {
            let formdata = Object.assign(this.model, values)
            let isNullObj = true
            Object.keys(formdata).forEach(key=>{
              if(formdata[key]){
                isNullObj = false
              }
            })
            if(!isNullObj){
              formdata_arr.push(formdata)
            }
          }else{
            this.$emit("validateError","活动费用表表单校验未通过");
          }
        })
        console.log("活动费用表表单数据集",formdata_arr);
        return formdata_arr;
      },
      popupCallback(row){
        this.form.setFieldsValue(pick(row,'type','number','refundType','activeId'))
      },
      clearFormData(){
        this.form.resetFields()
        this.model={}
      }
    
    }
  }
</script>
