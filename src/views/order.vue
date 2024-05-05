<template>
    <div class="app-container">
      <el-form :model="Params" ref="queryForm" size="small" :inline="true">
        <el-form-item label="订单状态" prop="status">
          <el-select
            v-model="status"
            placeholder="订单状态"
            clearable
            style="width: 240px"
          >
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="dateRange"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
  
      <el-table v-loading="loading" :data="orderList" height="480">
        <el-table-column label="订单编号" prop="orderNumber" width="180" align="center" fixed/>
        <el-table-column label="推广ID" prop="serviceId" :show-overflow-tooltip="true" width="120" align="center"/>
        <el-table-column label="项目名称" prop="serviceName" :show-overflow-tooltip="true" width="150" align="center"/>
        <el-table-column label="项目金额" prop="serviceMoney" width="100" align="center"/>
        <el-table-column label="客户预约时间" prop="appointTime" width="160" align="center"/>
        <el-table-column label="订单时间" prop="orderTime" width="160" align="center"/>
        <el-table-column label="订单总金额" prop="orderMoney" width="120" align="center"/>
        <el-table-column label="打赏金额" prop="rewardMoney" width="80" align="center"/>
        <el-table-column label="打车费" prop="taxiMoney" width="80" align="center"/>
        <el-table-column label="优惠券" prop="couponMoney" width="80" align="center"/>
        <el-table-column label="理疗师利润" prop="artificerMoney" width="120" align="center"/>
        <el-table-column label="店铺利润" prop="agentMoney" width="80" align="center"/>
        <el-table-column label="平台利润" prop="orderProfit" width="80" align="center"/>
        <el-table-column label="推广利润" prop="extendMoney" width="80" align="center"/>
        <el-table-column label="项目图片"  width="180" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 180px; height: 50px"
              :src="scope.row.serviceImage" 
              :preview-src-list="[scope.row.serviceImage]">
            </el-image>
          </template>
          
        </el-table-column>
        <el-table-column label="理疗师姓名" prop="artificerName" width="120" align="center"/>
        <el-table-column label="客户订单状态" prop="orderStatus" width="120" align="center"/>
        <el-table-column label="理疗师订单状态" prop="artificerStatus" width="120" align="center"/>
        <el-table-column label="订单是否可修改" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.canEdit== true?"是":"否"}}
          </template>
          
        </el-table-column>

      </el-table>
  
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="Params.pageNum"
        :limit.sync="Params.pageSize"
        @pagination="getList"
      />
    </div>
  </template>
  
  <script>
  import { getOrderList } from '@/api/order'
  
  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 总条数
        total: 0,
        // 查询参数
        Params: {
          orderStatus: 4,
          pageNum: 1,
          pageSize: 10,
          queryStartDate: "2023-10-01",
          queryEndDate: "2024-05-01",
        },
        status:0,
        // 日期范围
        dateRange: [],
        orderList:[],
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        getOrderList(this.Params).then(response => {
          this.loading = false
          console.log(response)
          this.orderList = response.data.list
          this.total = response.data.total
        })
      },
    }
  };
  </script>