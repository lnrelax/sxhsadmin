<template>
    <div class="app-container">
      <el-form :model="Params" ref="queryForm" size="small" :inline="true">
        <el-form-item label="审核状态" prop="status">
          <el-select
            v-model="status"
            placeholder="审核状态"
            clearable
            style="width: 240px"
          >
          </el-select>
        </el-form-item>
      </el-form>
  
      <el-table v-loading="loading" :data="orderList" height="480">
        <el-table-column label="推广团队ID" prop="orderNumber" width="180" align="center" fixed/>
        <el-table-column label="所属平台" prop="serviceId" :show-overflow-tooltip="true" width="120" align="center" />
        <el-table-column label="团队名称" prop="serviceName" :show-overflow-tooltip="true" width="150" align="center" fixed/>
        <el-table-column label="分成比例" prop="serviceMoney" width="100" align="center"/>
        <el-table-column label="联系人" prop="appointTime" width="160" align="center"/>
        <el-table-column label="联系人电话" prop="orderTime" width="160" align="center"/>
        <el-table-column label="二维码/小程序码"  width="180" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 180px; height: 50px"
              :src="scope.row.serviceImage" 
              :preview-src-list="[scope.row.serviceImage]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="登录账号" prop="taxiMoney" width="80" align="center"/>
        <el-table-column label="密码" prop="couponMoney" width="80" align="center"/>
        <el-table-column label="审核状态" prop="rewardMoney" width="80" align="center"/>
        <el-table-column label="申请时间" prop="agentMoney" width="80" align="center"/>
        <el-table-column label="审核时间" prop="agentMoney" width="80" align="center"/>
        <el-table-column label="店铺码" prop="agentMoney" width="80" align="center"/>
        <el-table-column label="店铺名称" prop="agentMoney" width="80" align="center"/>
        <el-table-column label="营业执照"  width="180" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 180px; height: 50px"
              :src="scope.row.serviceImage" 
              :preview-src-list="[scope.row.serviceImage]">
            </el-image>
          </template>
          
        </el-table-column>

        <el-table-column label="操作" width="150" align="center" fixed="right">
            <template slot-scope="scope" >
                <el-button type="success" size="mini" >审核</el-button>
                <el-button type="primary" size="mini" >修改</el-button>
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