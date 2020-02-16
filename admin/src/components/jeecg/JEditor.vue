<template>
  <div class="tinymce-editor">
    
    <editor
   
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick">
    </editor>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/fullscreen'
// import {getFilePaths,getUploadFileList} from '../../utils/commonUploadFile.js'
import { uploadAction } from '@/api/manage'
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      required: false
    },
    triggerChange: {
      type: Boolean,
      default: false,
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: 'lists image link media table textcolor wordcount contextmenu fullscreen'
    },
    toolbar: {
      type: [String, Array],
      default:
        'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists link unlink image media table | removeformat | fullscreen',
      branding: false
    }
  },
  data() {
    // console.log(this)
    let content = this
    return {
      //初始化配置
      loading: false,
      errMessage: '',
      init: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/lightgray',
        height: 300,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        toolbar_drawer: false,
        file_picker_types: 'media',
        file_picker_callback: function(cb, value, meta) {
          if (meta.filetype == 'media') {
            let input = document.createElement('input') //创建一个隐藏的input
            input.setAttribute('type', 'file')
            input.setAttribute('accept', 'video/*')

            let that = this

            input.onchange = function() {
              let file = this.files[0] //只选取第一个文件。如果要选取全部，后面注意做修改

              if (file.type.indexOf('video') == -1) {
              }
              let formData = new FormData()

              formData.append('file', file)
            
              if ((file.size / 1024 / 1024) > 10) {
                content.errMessage = '文件超过10M,请压缩文件,否则无法上传成功'
                cb("文件超过10M,上传失败", { title: file.name })
              } else {
                content.errMessage = ''
                content.loading = true
                 uploadAction(window._CONFIG['domianURL'] + '/sys/common/upload', 
                 formData, e => {
                   if(e.lengthComputable){
console.log(`${e.loaded/e.total*100}`.substring(0,4)+'%')
// cb(`${e.loaded/e.total*100}`.substring(0,4)+'%', { title: file.name })
                   }
                   
                
              })
                .then(res => {
                  cb(res.message, { title: file.name })
                  content.loading = false
                  content.errMessage = 'ok'
                  return
                })
                .catch(err => {
                  content.errMessage = '网络错误'
                  cb("网络错误,上传失败", { title: file.name })
                })
              }
             
              // }
            }
            //触发点击
            input.click()
          }
        },

        images_upload_handler: (blobInfo, success) => {
          const img = 'data:image/jpeg;base64,' + blobInfo.base64()
          success(img)
        }
      },
      myValue: this.value
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = ''
    },
    uploadImg(file, type) {
      console.log(file)
    }
  },
  watch: {
    loading(nv) {
     
      this.$emit('updateLoading', nv)
    },
    errMessage(nv) {
     
      this.$emit('updateErrMessage', nv)
    },
    value(newValue) {
      this.myValue = newValue == null ? '' : newValue
    },
    myValue(newValue) {
      if (this.triggerChange) {
        this.$emit('change', newValue)
      } else {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
<style scoped>
</style>