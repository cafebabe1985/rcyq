<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
          <a-col :md="12" :sm="8">
            <a-form-item label="活动名称">
              <a-input placeholder="请输入活动名称" v-model="queryParam.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :md="12" :sm="16">
            <a-form-item label="活动开始时间">
              <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间" class="query-group-cust" v-model="queryParam.startTime_begin"></j-date>
              <span class="query-group-split-cust"></span>
              <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间" class="query-group-cust" v-model="queryParam.startTime_end"></j-date>
            </a-form-item>
          </a-col>
          <template v-if="toggleSearchStatus">
            <a-col :md="12" :sm="16">
              <a-form-item label="活动结束时间">
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间" class="query-group-cust" v-model="queryParam.endTime_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间" class="query-group-cust" v-model="queryParam.endTime_end"></j-date>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="16">
              <a-form-item label="报名截止时间">
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择开始时间" class="query-group-cust" v-model="queryParam.endEnrol_begin"></j-date>
                <span class="query-group-split-cust"></span>
                <j-date :show-time="true" date-format="YYYY-MM-DD HH:mm:ss" placeholder="请选择结束时间" class="query-group-cust" v-model="queryParam.endEnrol_end"></j-date>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="发布状态">
                <j-dict-select-tag placeholder="请选择发布状态" v-model="queryParam.displayType" dictCode="display_type"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="队伍数量">
                <a-input placeholder="请输入队伍数量" v-model="queryParam.teamSize"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="活动地点">
                <a-input placeholder="请输入活动地点" v-model="queryParam.address"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="报名方式">
                <j-dict-select-tag placeholder="请选择报名方式" v-model="queryParam.enrolWay" dictCode="enrol_way"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="需要审核报名">
                <j-dict-select-tag placeholder="请选择需要审核报名" v-model="queryParam.needExamineEnrol" dictCode="need_examine"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="允许代替报名">
                <j-dict-select-tag placeholder="请选择允许代替报名" v-model="queryParam.allowEnrolAgent" dictCode="allow_enrol"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="报名须知">
                <a-input placeholder="请输入报名须知" v-model="queryParam.notice"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="8">
              <a-form-item label="保险类型">
                <j-dict-select-tag placeholder="请选择保险类型" v-model="queryParam.insuranceType" dictCode="insurance_type"/>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="16">
              <a-form-item label="每队人数上限">
                <a-input placeholder="请输入最小值" class="query-group-cust" v-model="queryParam.everyTeamMax_begin"></a-input>
                <span class="query-group-split-cust"></span>
                <a-input placeholder="请输入最大值" class="query-group-cust" v-model="queryParam.everyTeamMax_end"></a-input>
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="16">
              <a-form-item label="每队人数下限">
                <a-input placeholder="请输入最小值" class="query-group-cust" v-model="queryParam.everyTeamMin_begin"></a-input>
                <span class="query-group-split-cust"></span>
                <a-input placeholder="请输入最大值" class="query-group-cust" v-model="queryParam.everyTeamMin_end"></a-input>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="6" :sm="8">
            <span style="float: left;overflow: hidden;" class="table-page-search-submitButtons">
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">重置</a-button>
              <a @click="handleToggleSearch" style="margin-left: 8px">
                {{ toggleSearchStatus ? '收起' : '展开' }}
                <a-icon :type="toggleSearchStatus ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>

        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->
    
    <!-- 操作按钮区域 -->
    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('活动')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
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
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
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

    <wxActive-modal ref="modalForm" @ok="modalFormOk"></wxActive-modal>
  </a-card>
</template>

<script>

  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import WxActiveModal from './modules/WxActiveModal'
  import JDictSelectTag from '@/components/dict/JDictSelectTag.vue'
  import JDate from '@/components/jeecg/JDate.vue'
  import {initDictOptions, filterMultiDictText} from '@/components/dict/JDictSelectUtil'

  export default {
    name: "WxActiveList",
    mixins:[JeecgListMixin],
    components: {
      JDictSelectTag,
      JDate,
      WxActiveModal
    },
    data () {
      return {
        description: '活动管理页面',
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
          {
            title:'活动名称',
            align:"center",
            dataIndex: 'name'
          },
          {
            title:'活动开始时间',
            align:"center",
            dataIndex: 'startTime'
          },
          {
            title:'活动结束时间',
            align:"center",
            dataIndex: 'endTime'
          },
          {
            title:'报名截止时间',
            align:"center",
            dataIndex: 'endEnrol'
          },
          {
            title:'封面图',
            align:"center",
            dataIndex: 'poster',
            scopedSlots: {customRender: 'imgSlot'}
          },
          {
            title:'创建人',
            align:"center",
            dataIndex: 'createBy',
            
          },
          {
            title:'点击数',
            align:"center",
            dataIndex: 'hit'
          },
          {
            title:'发布状态',
            align:"center",
            dataIndex: 'displayType',
            customRender:(text)=>{
              if(!text){
                return ''
              }else{
                return filterMultiDictText(this.dictOptions['displayType'], text+"")
              }
            }
          },
          {
            title:'队伍数量',
            align:"center",
            dataIndex: 'teamSize'
          },
          {
            title:'活动地点',
            align:"center",
            dataIndex: 'address'
          },
          {
            title:'报名方式',
            align:"center",
            dataIndex: 'enrolWay',
            customRender:(text)=>{
              if(!text){
                return ''
              }else{
                return filterMultiDictText(this.dictOptions['enrolWay'], text+"")
              }
            }
          },
          {
            title:'需要审核报名',
            align:"center",
            dataIndex: 'needExamineEnrol',
            customRender:(text)=>{
              if(!text){
                return ''
              }else{
                return filterMultiDictText(this.dictOptions['needExamineEnrol'], text+"")
              }
            }
          },
          {
            title:'允许代替报名',
            align:"center",
            dataIndex: 'allowEnrolAgent',
            customRender:(text)=>{
              if(!text){
                return ''
              }else{
                return filterMultiDictText(this.dictOptions['allowEnrolAgent'], text+"")
              }
            }
          },
          {
            title:'报名须知',
            align:"center",
            dataIndex: 'notice'
          },
          {
            title:'保险类型',
            align:"center",
            dataIndex: 'insuranceType',
            customRender:(text)=>{
              if(!text){
                return ''
              }else{
                return filterMultiDictText(this.dictOptions['insuranceType'], text+"")
              }
            }
          },
          {
            title:'每队人数上限',
            align:"center",
            dataIndex: 'everyTeamMax'
          },
          {
            title:'每队人数下限',
            align:"center",
            dataIndex: 'everyTeamMin'
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            scopedSlots: { customRender: 'action' },
          }
        ],
        url: {
          list: "/wx/wxActive/listVO",
          delete: "/wx/wxActive/delete",
          deleteBatch: "/wx/wxActive/deleteBatch",
          exportXlsUrl: "/wx/wxActive/exportXls",
          importExcelUrl: "wx/wxActive/importExcel",
        },
        dictOptions:{
         displayType:[],
         enrolWay:[],
         needExamineEnrol:[],
         allowEnrolAgent:[],
         insuranceType:[],
        },

      }
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      }
    },
    methods: {
      initDictConfig(){
        initDictOptions('display_type').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'displayType', res.result)
          }
        })
        initDictOptions('enrol_way').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'enrolWay', res.result)
          }
        })
        initDictOptions('need_examine').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'needExamineEnrol', res.result)
          }
        })
        initDictOptions('allow_enrol').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'allowEnrolAgent', res.result)
          }
        })
        initDictOptions('insurance_type').then((res) => {
          if (res.success) {
            this.$set(this.dictOptions, 'insuranceType', res.result)
          }
        })
      }
       
    }
  }
</script>
<style scoped>
  @import '~@assets/less/common.less'
</style>