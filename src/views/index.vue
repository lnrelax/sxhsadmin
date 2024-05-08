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
        <span>当日分析</span>
      </div>
      <el-row :gutter="20">
        <el-col style="width: 20%;">
          <div>
            <el-statistic
              group-separator=","
              :value="jData.userNum"
              title="用户数"
            >
            <template slot="prefix">
              <i class="el-icon-user-solid" style="color: red"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col style="width: 20%;">
          <div>
            <el-statistic title="订单总数"
            :value="jData.orderNum">
            <template slot="prefix">
              <i class="el-icon-s-order" style="color: coral"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col style="width: 20%;">
          <div>
            <el-statistic title="退款总数"
            :value="jData.refundNum">
            <template slot="prefix">
              <i class="el-icon-message-solid" style="color: red"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col style="width: 20%;">
          <div>
            <el-statistic title="总流水"
            :value="jData.waterMoney">
            <template slot="prefix">
              <i class="el-icon-s-data" style="color: aquamarine"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
        <el-col style="width: 20%;">
          <div>
            <el-statistic title="总利润"
            :value="jData.profitMoney">
            <template slot="prefix">
              <i class="el-icon-s-marketing" style="color: blueviolet"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
    </el-card>

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
    };
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      paltAnalyze().then(response => {
        this.zData = response.data
      })
      paltTodayAnalyze().then(response => {
        this.jData = response.data
      })
    },
  }
};
</script>

<style scoped lang="scss">
.mt30{
  margin-top: 30px;
}
</style>

