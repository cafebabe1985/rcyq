<template>
 <a-spin :spinning="spinning">
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
<a-form-item label="内容类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="radio" v-decorator="['newsType', validatorRules.newsType]" :trigger-change="true" dictCode="content_type" placeholder="请选择内容类型"/>
        </a-form-item>
        <a-form-item label="景点名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'scenicName', validatorRules.scenicName]" placeholder="请输入小片名称"></a-input>
        </a-form-item>
        <a-form-item label="广告标语" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'title', validatorRules.title]" placeholder="请输入标题"></a-input>
        </a-form-item>
        <!-- <a-form-item label="景点标语" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'subTitle', validatorRules.subTitle]" placeholder="请输入副标题"></a-input>
        </a-form-item> -->
        <a-form-item label="封面图" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-upload 
          :multiple="false"
          v-decorator="['poster', validatorRules.poster]" :trigger-change="true"></j-upload>
        </a-form-item>
        <a-form-item label="编辑人" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'author', validatorRules.author]" placeholder="请输入编辑"></a-input>
        </a-form-item>
        <a-form-item label="内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <!-- <span>上传中</span><a-progress :percent="30" size="small" /> -->
          <j-editor 
         @updateLoading="showEditorLoading"
         @updateErrMessage="showEditorErrMessage"
          v-decorator="['content',{trigger:'input'}]"/>
        </a-form-item>
        <a-form-item label="点击数" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input-number v-decorator="[ 'hit', validatorRules.hit]" placeholder="请输入点击数" style="width: 100%"/>
        </a-form-item>
        
        <a-form-item label="所在城市" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-select
          v-decorator="[ 'city', validatorRules.city]"
         
          style="width: 100%"
            placeholder="选择所在城市"
  >
    <a-select-option v-for="(item,index) in tabs" :key="index+''"
    
    >{{item.name}}</a-select-option>
  </a-select>
          
          <!-- <a-input v-decorator="[ 'city', validatorRules.city]" placeholder="请输入所在城市"></a-input> -->
        </a-form-item>
        
        <a-form-item label="跳转地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <a-input v-decorator="[ 'targetUrl', validatorRules.targetUrl]" placeholder="请输入跳转地址"></a-input>
        </a-form-item>
        <a-form-item label="发布状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
          <j-dict-select-tag type="list" v-decorator="['displayType', validatorRules.displayType]" :trigger-change="true" dictCode="display_type" placeholder="请选择展示类型"/>
        </a-form-item>

      </a-form>
    </a-spin>
  </a-modal>
 </a-spin>
</template>

<script>
import { httpAction } from '@/api/manage'
import pick from 'lodash.pick'
import { validateDuplicateValue } from '@/utils/util'
import JUpload from '@/components/jeecg/JUpload'
import JDictSelectTag from '@/components/dict/JDictSelectTag'
import JEditor from '@/components/jeecg/JEditor'
import { getAction } from '@/api/manage'
export default {
  name: 'WxScenicModal',
  components: {
    JUpload,
    JDictSelectTag,
    JEditor
  },
  data() {
    return {
      form: this.$form.createForm(this),
      title: '操作',
      width: 800,
      visible: false,
      spinning: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      confirmLoading: false,
      tabs:[],
      validatorRules: {
        title: {
          rules: [{ required: true, message: '请输入广告标语!' }]
        },
        subTitle: {
          rules: []
        },
        poster: {
          rules: [{ required: true, message: '请输入封面图!' }]
        },
        content: {
          rules: [{ required: true, message: '请输入内容!' }]
        },
        author: {
          rules: [{ required: true, message: '请输入编辑!' }]
        },
        scenicName: {
          rules: [{ required: true, message: '请输入景点名称!' }]
        },
        city: {
          rules: [{ required: true, message: '请输入所在城市!' }]
        },
        displayType: {
          rules: [{ required: true, message: '请输入展示类型!' }]
        },
        targetUrl: {
          rules: []
        },
        newsType: {
          rules: [{ required: true, message: '请输入内容类型!' }]
        }
      },
      url: {
        add: '/wx/wxScenic/add',
        edit: '/wx/wxScenic/edit'
      }
    }
  },
 
 async mounted() {
     await this.initCityTabs()
  },
  methods: {
     async initCityTabs(){
          let listCityTabUrl ="/wx/scenicCityTab/list?column=displayOrder&order=asc"
           let res = await getAction(listCityTabUrl)
           if(res.success){
                this.tabs = res.result.records
           }
          
     
      },
    add() {
      this.edit({})
    },
    edit(record) {
      this.form.resetFields()
      this.model = Object.assign({}, record)
      this.visible = true
      this.$nextTick(() => {
        this.form.setFieldsValue(
          pick(
            this.model,
            'title',
            'subTitle',
            'poster',
            'hit',
            'content',
            'author',
            'scenicName',
            'city',
            'displayType',
            'targetUrl',
            'newsType'
          )
        )
      })
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
            this.model['createBy'] = JSON.parse(localStorage.getItem('pro__Login_Userinfo')).value.id
          } else {
            httpurl += this.url.edit
            method = 'put'
            this.model['updateBy'] = JSON.parse(localStorage.getItem('pro__Login_Userinfo')).value.id
          }
          let formData = Object.assign(this.model, values)
          console.log('表单提交数据', formData)
          //  console.log(JSON.parse(localStorage.getItem("pro__Login_Userinfo")).value)

          httpAction(httpurl, formData, method)
            .then(res => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },
    popupCallback(row) {
      this.form.setFieldsValue(
        pick(
          row,
          'title',
          'subTitle',
          'poster',
          'hit',
          'content',
          'author',
          'scenicName',
          'city',
          'displayType',
          'targetUrl',
          'newsType'
        )
      )
    },
    showEditorLoading(e) {
     
      this.spinning = e
    },
    showEditorErrMessage(e) {
     console.log(e)
      if (e) {
        if (e === 'ok') {
          this.$message.success('上传成功')
        } else {
          this.$message.warning(e)
        }
      }
    }
  }
}
</script>