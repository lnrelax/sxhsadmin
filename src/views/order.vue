<template>
    <div class="app-container">
      <el-form :model="Params" ref="queryForm" size="small" :inline="true">
        <el-form-item label="订单状态" prop="status">
          <el-select
            v-model="statusStr"
            placeholder="订单状态"
            clearable
            @change="handleSelectChange"
            style="width: 240px"
          >
          <el-option
            v-for="dict in options"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />

          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="dateRange"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            @change="handleDateChange"
            :start-placeholder="Params.queryStartDate"
            :end-placeholder="Params.queryEndDate"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="订单号">
          <el-input v-model="orderCode" placeholder="请输入订单号"></el-input>
        </el-form-item>

        <el-form-item >
          <el-button type="primary" size="mini" @click="orderCodeGet()">搜索</el-button>
        </el-form-item>

      </el-form>
  
      <el-table v-loading="loading" :data="orderList" height="580">
        <el-table-column label="订单编号" prop="orderNumber" width="180" align="center"/>
        <el-table-column label="推广名称" prop="extendName" :show-overflow-tooltip="true" width="120" align="center"/>
        <el-table-column label="项目名称" prop="serviceName" :show-overflow-tooltip="true" width="150" align="center"/>
        <el-table-column label="项目金额" prop="serviceMoney" width="100" align="center"/>
        <el-table-column label="用户手机号" prop="userPhone" width="120" align="center"/>
        <el-table-column label="下单地址" prop="address" width="150" align="center"/>
        <el-table-column label="客户订单状态" prop="orderStatus" width="120" align="center"/>
        <el-table-column label="理疗师姓名" prop="artificerName" width="120" align="center"/>
        <el-table-column label="理疗师订单状态" prop="artificerStatus" width="120" align="center"/>
        <el-table-column label="客户预约时间" prop="appointTime" width="160" align="center"/>
        <el-table-column label="订单时间" prop="orderTime" width="160" align="center"/>
        <el-table-column label="订单总金额" prop="orderMoney" width="120" align="center"/>
        <el-table-column label="打赏金额" prop="rewardMoney" width="80" align="center"/>
        <el-table-column label="打车费" prop="taxiMoney" width="80" align="center"/>
        <el-table-column label="优惠券" prop="couponMoney" width="80" align="center"/>
        <el-table-column label="理疗师利润" prop="artificerMoney" width="120" align="center"/>
        <el-table-column label="理疗师邀请利润" prop="inviteMoney" width="120" align="center"/>
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
        
        
        <!-- <el-table-column label="订单是否可修改" width="120" align="center">
          <template slot-scope="scope">
            {{scope.row.canEdit== true?"是":"否"}}
          </template>
          
        </el-table-column> -->

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
  import { getOrderList , queryOrderByOrderId } from '@/api/order'
  
  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 总条数
        total: 0,
        // 查询参数
        Params: {
          orderStatus: 0,
          pageNum: 1,
          pageSize: 10,
          queryStartDate: "",
          queryEndDate: "",
        },
        status:0,
        statusStr:"全部",
        // 日期范围
        dateRange: [],
        orderList:[],
        options: [{
          value: '0',
          label: '全部'
        },{
          value: '1',
          label: '待支付'
        }, {
          value: '2',
          label: '待服务'
        }, {
          value: '3',
          label: '服务中'
        }, {
          value: '4',
          label: '已完成'
        }, {
          value: '5',
          label: '退款售后'
        }],
        orderCode:"",

      };
    },
    created() {
      this.setTimes();
      this.getList()
    },
    methods: {
      setTimes() {
        const now = new Date();
        this.Params.queryEndDate = this.formatTime(now);
        const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));
        this.Params.queryStartDate = this.formatTime(sevenDaysAgo);
      },
      formatTime(date) {
        return date.toISOString().split('T')[0];
      },
      getList() {
        this.loading = true;
        getOrderList(this.Params).then(response => {
          this.loading = false
          console.log(response)
          this.orderList = response.data.list
          this.total = response.data.total
        })
      },

      handleSelectChange(value) {
        console.log('选中的值：', value);
        // 在这里执行你需要的方法
        this.Params.orderStatus = value
        this.getList();
      },
      handleDateChange(value) {
        console.log('日期时间改变了，新值为：', value);
        console.log("开始时间",value[0])
        this.Params.queryStartDate = value[0]
        this.Params.queryEndDate = value[1]
        this.getList()
      },
      orderCodeGet(){
        this.loading = true
        queryOrderByOrderId({orderId:this.orderCode}).then(response => {
          this.loading = false
          this.orderList = []
          this.orderList.push(response.data)
        })
      },
    }
  };
  </script>