<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="12" :sm="16">
            <a-form-item label="活动">
                 <a-select
          v-model="queryParam.activeId"
         
          style="width: 100%"
            placeholder="请选择活动"
  >
    <a-select-option v-for="(item) in actives" :key="item.id"
    
    >{{item.name}}</a-select-option>
  </a-select>
              </a-form-item>
          </a-col>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <!-- <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a> -->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <!-- <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button> -->
      <a-button type="primary" icon="download" @click="handleExportXls('活动报名表')">导出</a-button>
      <!-- <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown> -->
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{fixed:true,selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此图片</span>
          <img v-else :src="getImgView(text)" height="25px" alt="图片不存在" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无此文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="uploadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <wxActiveEnrolUser-modal ref="modalForm" @ok="modalFormOk"></wxActiveEnrolUser-modal>
  </a-card>
</template>

<script>
import { getAction } from '@/api/manage'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import WxActiveEnrolUserModal from './modules/WxActiveEnrolUserModal'
  import {initDictOptions, filterMultiDictText} from '@/components/dict/JDictSelectUtil'

  export default {
    name: "WxActiveEnrolUserList",
    mixins:[JeecgListMixin],
    components: {
      WxActiveEnrolUserModal
    },
    data () {
      return {
        description: '活动报名表管理页面',
        actives:[],
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: '',
            key:'rowIndex',
            width:60,
            align:"center",
            customRender:function (t,r,index) {
              return parseInt(index)+1;
            }
          },
          // {
          //   title:'活动ID',
          //   align:"center",
          //   dataIndex: 'enrolInfo.activeId'
          // },
          {
            title:'报名微信用户',
            align:"center",
            dataIndex: 'userInfo.nickName'
          },
          {
            title:'报名用户类型',
            align:"center",
            dataIndex: 'enrolInfo.userType',
             customRender:(text)=>{
              if(!text){
                return ''
              }else{
                return text=='0'?'本人报名':'别人帮报'
              }
            }
          },
          {
            title:'用户电话',
            align:"center",
            dataIndex: 'enrolInfo.userPhone'
          },
          {
            title:'活动期间昵称',
            align:"center",
            dataIndex: 'enrolInfo.userNickName'
          },
          {
            title:'真实姓名',
            align:"center",
            dataIndex: 'enrolInfo.userRealName'
          },
          {
            title:'身份证号',
            align:"center",
            dataIndex: 'enrolInfo.userCid'
          },
          {
            title:'性别',
            align:"center",
            dataIndex: 'enrolInfo.userGender',
            customRender:(text)=>{
              if(!text){
                return ''
              }else{
                return filterMultiDictText(this.dictOptions['userGender'], text+"")
              }
            }
          },
          {
            title:'帮报人微信',
            align:"center",
            dataIndex: 'agentInfo.nickName'
          },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   scopedSlots: { customRender: 'action' }
          // }
        ],
        url: {
          activeList:"/wx/wxActive/listVOall",
          list: "/wx/wxActiveEnrolUser/listPageUser",
          delete: "/wx/wxActiveEnrolUser/delete",
          deleteBatch: "/wx/wxActiveEnrolUser/deleteBatch",
          exportXlsUrl: "/wx/wxActiveEnrolUser/exportXls",
          importExcelUrl: "wx/wxActiveEnrolUser/importExcel",
        },
        dictOptions:{
         userGender:[],
        },
        queryParam:{
          activeId:null
        }
      }
    },
    mounted(){
        getAction(this.url.activeList,{
          column:'createTime',
          order:'desc',          
        }).then(
          res=>{
            console.log(res)
            this.actives= res.result
          }
        )
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      initDictConfig(){
        initDictOptions('user_gender').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'userGender', res.result)
          }
        })
      }
       
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>