<template>
  <div class="app-container">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>平台总分析</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="zSpan">
          <div>
            <el-statistic
              group-separator=","
              :value="zData.userNum"
              title="用户数"
            >
            <template slot="prefix">
              <i class="el-icon-user-solid" style="color: red"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan">
          <div>
            <el-statistic title="技师数"
            :value="zData.massageNum">
            <template slot="prefix">
              <i class="el-icon-user-solid" style="color: blue"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan">
          <div>
            <el-statistic
              group-separator=","
              :value="zData.extendNum"
              title="推广团队数"
            >
            <template slot="prefix">
              <i class="el-icon-star-on" style="color: aqua"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan">
          <div>
            <el-statistic
              group-separator=","
              :value="zData.orderNum"
              title="订单总数"
            >
            <template slot="prefix">
              <i class="el-icon-s-order" style="color: coral"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" class="mt30">
          <div>
            <el-statistic
              group-separator=","
              :value="zData.completeNum"
              title="完成单数"
            >
            <template slot="prefix">
              <i class="el-icon-s-claim" style="color: coral"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" class="mt30">
          <div>
            <el-statistic
              group-separator=","
              :value="zData.refundNum"
              title="退款总数"
            >
            <template slot="prefix">
              <i class="el-icon-message-solid" style="color: red"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" class="mt30">
          <div>
            <el-statistic
              group-separator=","
              :value="zData.waterMoney"
              title="总流水"
            >
            <template slot="prefix">
              <i class="el-icon-s-data" style="color: aquamarine"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" class="mt30">
          <div>
            <el-statistic
              group-separator=","
              :value="zData.profitMoney"
              title="总利润"
            >
            <template slot="prefix">
              <i class="el-icon-s-marketing" style="color: blueviolet"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="box-card" style="margin-top:20px;">
      <div slot="header" class="clearfix">
        <span>
          <span>开始时间</span>
          <el-date-picker
            style="margin-left: 5px;"
            v-model="Params.startDate"
            type="date"
            @change="handleDateChange"
            placeholder="开始时间">
          </el-date-picker>
          <span style="margin-left: 10px;">结束时间</span>
          <el-date-picker
          style="margin-left: 5px;"
            v-model="Params.endDate"
            type="date"
            @change="handleEndDateChange"
            placeholder="结束时间">
          </el-date-picker>

          <el-button style="margin-left: 10px;" size="small" :type="zType" @click="dataTime(1)">昨天</el-button>
          <el-button size="small" :type="qType" @click="dataTime(2)">近7天</el-button>
          <el-button size="small" :type="yType" @click="dataTime(3)">近30天</el-button>

        </span>
      </div>

      <div class="clearfix" style="padding-bottom: 10px;">
        <span>数量统计</span>
      </div>

      <el-row :gutter="20">
        <el-col :span="zSpan">
          <div>
            <el-statistic
              group-separator=","
              :value="jData.totalOrderNum"
              title="总订单数量"
            >
            <template slot="prefix">
              <i class="el-icon-s-order" style="color: red"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" >
          <div>
            <el-statistic title="成交订单数量"
            :value="jData.completeOrderNum">
            <template slot="prefix">
              <i class="el-icon-s-claim" style="color: coral"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan">
          <div>
            <el-statistic title="进行中订单数量"
            :value="jData.runingOrderNum">
            <template slot="prefix">
              <i class="el-icon-s-data" style="color: aqua"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" >
          <div>
            <el-statistic title="退款订单数量"
            :value="jData.refundOrderNum">
            <template slot="prefix">
              <i class="el-icon-s-data" style="color: aquamarine"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        
      </el-row>
      <div class="clearfix" style="padding-top: 10px; padding-bottom: 10px;">
        <span>流水统计</span>
      </div>

      <el-row :gutter="20">
        <el-col :span="zSpan">
          <div>
            <el-statistic
              group-separator=","
              :value="jData.totalWaterMoney"
              title="总流水"
            >
            <template slot="prefix">
              <i class="el-icon-s-order" style="color: red"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" >
          <div>
            <el-statistic title="成单流水"
            :value="jData.completeWaterMoney">
            <template slot="prefix">
              <i class="el-icon-s-claim" style="color: coral"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan">
          <div>
            <el-statistic title="打赏金额"
            :value="jData.rewardWaterMoney">
            <template slot="prefix">
              <i class="el-icon-s-data" style="color: aqua"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" >
          <div>
            <el-statistic title="退款流水"
            :value="jData.refundWaterMoney">
            <template slot="prefix">
              <i class="el-icon-s-data" style="color: aquamarine"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        
      </el-row>
      <div class="clearfix" style="padding-bottom: 10px;">
        <span>利润统计</span>
      </div>

      <el-row :gutter="20">
        <el-col :span="zSpan">
          <div>
            <el-statistic
              group-separator=","
              :value="jData.totalProfit"
              title="总利润"
            >
            <template slot="prefix">
              <i class="el-icon-s-order" style="color: red"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" >
          <div>
            <el-statistic title="成单利润"
            :value="jData.completeProfit">
            <template slot="prefix">
              <i class="el-icon-s-claim" style="color: coral"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan">
          <div>
            <el-statistic title="打赏利润"
            :value="jData.rewardProfit">
            <template slot="prefix">
              <i class="el-icon-s-data" style="color: aqua"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" >
          <div>
            <el-statistic title="退款留存金额"
            :value="jData.refundProfit">
            <template slot="prefix">
              <i class="el-icon-s-data" style="color: aquamarine"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        
      </el-row>
      <div class="clearfix" style="padding-bottom: 10px;">
        <span>转化分析</span>
      </div>

      <el-row :gutter="20">
        <el-col :span="zSpan">
          <div>
            <el-statistic
              group-separator=","
              :value="jData.userNumBrowse"
              title="访问人数"
            >
            <template slot="prefix">
              <i class="el-icon-user-solid" style="color: red"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" >
          <div>
            <el-statistic title="注册人数"
            :value="jData.userNumSignIn">
            <template slot="prefix">
              <i class="el-icon-user-solid" style="color: coral"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan">
          <div>
            <el-statistic title="访问转换率"
            :value="jData.browseTransform">
            <template slot="prefix">
              <i class="el-icon-s-data" style="color: aqua"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col :span="zSpan" >
          <div>
            <el-statistic title="注册转换率"
            :value="jData.signInTransform">
            <template slot="prefix">
              <i class="el-icon-s-data" style="color: aquamarine"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        
      </el-row>
    </el-card>

    <!--  底部  -->
    <div class="el-login-footer">
      <a href="https://beian.miit.gov.cn/" target="_blank">晋ICP备2024039370号-1</a>
    </div>

  </div>
</template>

<script>

import { paltAnalyze , paltTodayAnalyze } from '@/api/order'

export default {
  data() {
    return {
      zData:{},
      jData:{},
      orderList:[],
      zSpan:6,
      jSpan:6,
      zType:"",
      qType:"",
      yType:"",
      Params:{
        startDate:"",
        endDate:"",
        dateType:"",
      },
    };
  },
  created() {
    this.setTime()
    this.getList()
  },
  methods: {
    setTime(){
      var now = new Date();
      var start = new Date()
      // 格式化日期
      var year = now.getFullYear();
      var month = (now.getMonth() + 1 < 10 ? '0' : '') + (now.getMonth() + 1);
      var day = (now.getDate() < 10 ? '0' : '') + now.getDate();
      var formattedDate = year + '-' + month + '-' + day;
      //start.setDate(now.getDate() - 7);
      var startyear = start.getFullYear();
      var startmonth = (start.getMonth() + 1 < 10 ? '0' : '') + (start.getMonth() + 1);
      var startday = (start.getDate() < 10 ? '0' : '') + start.getDate();
      var startformattedDate = startyear + '-' + startmonth + '-' + startday;

      this.Params.startDate = formattedDate;
      this.Params.endDate = startformattedDate;
    },
    getList() {
      paltAnalyze().then(response => {
        this.zData = response.data
      })
      paltTodayAnalyze(this.Params).then(response => {
        this.jData = response.data
      })
    },
    dataTime(index){
      if (index == 1) {
        this.zType = "primary"
        this.qType = ""
        this.yType = ""
      }else if (index == 2) {
        this.zType = ""
        this.qType = "primary"
        this.yType = ""
      }else if (index == 3) {
        this.zType = ""
        this.qType = ""
        this.yType = "primary"
      }
      this.Params.dateType = index
      this.getList()
    },
    handleDateChange(value) {
      console.log('日期时间改变了，新值为：', value);
      console.log("开始时间",value)
      const dateObj = new Date(value);
      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObj.getDate().toString().padStart(2, '0');
      this.Params.startDate = `${year}-${month}-${day}`;
      // this.getList()
    },
    handleEndDateChange(value) {
      console.log('日期时间改变了，新值为：', value);
      console.log("开始时间",value)
      const dateObj = new Date(value);
      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObj.getDate().toString().padStart(2, '0');
      this.Params.endDate = `${year}-${month}-${day}`;
      this.getList()
    },
  }
};
</script>

<style scoped lang="scss">
.mt30{
  margin-top: 30px;
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 75%;
  text-align: center;
  color: cornflowerblue;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
</style>

