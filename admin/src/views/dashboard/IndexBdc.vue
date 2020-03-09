<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24">
      <a-col  :sm="12" :md="6" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card 
          :loading="loading" title="用户总量：" :total="userTotal">
         
          <template slot="footer">昨日新增：<span style="color:blue">{{ userYestDay}}</span></template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="景区总访问量" :total="scenicTotal">
             <template slot="footer">昨日访问：<span style="color:blue">{{ scenicYestDay }}</span></template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="活动总访问量" :total="activeTotal">
         
          <template slot="footer">昨日访问：<span style="color:blue">{{ activeYestDay }}</span></template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="快讯总问量" :total="newsTotal">
          
          <template slot="footer">昨日访问：<span style="color:blue">{{ newsYestDay }}</span></template>
        </chart-card>
      </a-col>
    </a-row>
<!-- 
    <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>今日</a>
              <a>本周</a>
              <a>本月</a>
              <a>本年</a>
            </div>
            <a-range-picker :style="{width: '256px'}" />
          </div>

          <a-tab-pane loading="true" tab="受理监管" key="1">
            <a-row>
              <a-col :xl="24" :lg="24" :md="12" :sm="24" :xs="24">
                <index-bar title="受理量统计" />
              </a-col>
             
            </a-row>
          </a-tab-pane>

          <a-tab-pane tab="交互监管" key="2">
            <a-row>
              <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <bar-multid :sourceData="jhjgData" :fields="jhjgFields" title="平台与部门交互量统计"></bar-multid>
              </a-col>
              
            </a-row>
          </a-tab-pane>

        
        </a-tabs>

      </div>
    </a-card> -->

  </div>
</template>

<script>
import ACol from 'ant-design-vue/es/grid/Col'
import ATooltip from 'ant-design-vue/es/tooltip/Tooltip'
import ChartCard from '@/components/ChartCard'
import MiniBar from '@/components/chart/MiniBar'
import MiniArea from '@/components/chart/MiniArea'
import IndexBar from '@/components/chart/IndexBar'
import BarMultid from '@/components/chart/BarMultid'
import DashChartDemo from '@/components/chart/DashChartDemo'

import { getAction } from '@/api/manage'
export default {
  name: 'IndexBdc',
  components: {
    ATooltip,
    ACol,
    ChartCard,
    MiniArea,
    MiniBar,
    DashChartDemo,
    BarMultid,
    IndexBar
  },
  data() {
    return {
      loading: true,

      activeTotal: '0',
      activeYestDay: 0,
      newsTotal: '0',
      newsYestDay: 0,
      scenicTotal: '0',
      scenicYestDay: 0,
      userTotal: '0',
      userYestDay: 0,

      url: {
        countIndex: '/wx/count/index'
      }
    }
  },
  methods: {
    initUserChartData() {
      this.loading = true
      getAction(this.url.countIndex).then(res => {
        this.activeTotal = this.toThousands(res.result.activeTotal) 
          this.activeYestDay = res.result.activeYestDay
          this.newsTotal = this.toThousands(res.result.newsTotal) 
          this.newsYestDay = res.result.newsYestDay
          this.scenicTotal = this.toThousands(res.result.scenicTotal)
          this.scenicYestDay = res.result.scenicYestDay
          this.userTotal = this.toThousands( res.result.userTotal)
          this.userYestDay = res.result.userYestDay
          this.loading = false
      })
    },
    toThousands(number) {
      let num = (number || 0).toString()
      let result = ''
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result
        num = num.slice(0, num.length - 3)
      }
      if (num) {
        result = num + result
      }
      return result
    },
    changeRegisterType(e) {
      this.indexRegisterType = e.target.value
      if (this.indexBottomTab == '1') {
        this.loadDataSource1()
      } else {
        this.loadDataSource2()
      }
    },
    tableChange1(pagination) {
      this.ipagination1.current = pagination.current
      this.ipagination1.pageSize = pagination.pageSize
      this.queryTimeoutInfo()
    },
    tableChange2(pagination) {
      this.ipagination2.current = pagination.current
      this.ipagination2.pageSize = pagination.pageSize
      this.queryNodeTimeoutInfo()
    },
    getFlowRateNumber(value) {
      return Number(value)
    },
    getPercentFormat(value) {
      if (value == 100) {
        return '超时'
      } else {
        return value + '%'
      }
    },
    getPercentColor(value) {
      let p = Number(value)
      if (p >= 90 && p < 100) {
        return 'rgb(244, 240, 89)'
      } else if (p >= 100) {
        return 'red'
      } else {
        return 'rgb(16, 142, 233)'
      }
    },

    loadDataSource1() {
      this.dataSource1 = dataSource1.filter(item => {
        if (!this.indexRegisterType) {
          return true
        }
        return item.type == this.indexRegisterType
      })
    },
    loadDataSource2() {
      this.dataSource2 = dataSource2.filter(item => {
        if (!this.indexRegisterType) {
          return true
        }
        return item.type == this.indexRegisterType
      })
    }
  },
  mounted() {
    this.initUserChartData()
  },
  created() {}
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/color.css';
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;
  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

.item-group {
  .more-btn {
    margin-bottom: 13px;
    text-align: center;
  }
}

.list-content-item {
  color: rgba(0, 0, 0, 0.45);
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 40px;
}

@media only screen and (min-width: 1600px) {
  .list-content-item {
    margin-left: 60px;
  }
}

@media only screen and (max-width: 1300px) {
  .list-content-item {
    margin-left: 20px;
  }
  .width-hidden4 {
    display: none;
  }
}
.list-content-item {
  span {
    line-height: 20px;
  }
}
.list-content-item {
  p {
    margin-top: 4px;
    margin-bottom: 0;
    line-height: 22px;
  }
}
.anty-list-cust {
  .ant-list-item-meta {
    flex: 0.3 !important;
  }
}
.anty-list-cust {
  .ant-list-item-content {
    flex: 1 !important;
    justify-content: flex-start !important;
    margin-left: 20px;
  }
}
.row-card .chart-card-content {
  height: 0;
}
</style>