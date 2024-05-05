<template>
    <div class="app-container">
      
      <el-table v-loading="loading" :data="orderList" height="480">
        <el-table-column label="用户ID" prop="orderNumber"  align="center"/>
        <el-table-column label="用户昵称" prop="serviceId" :show-overflow-tooltip="true"  align="center"/>
        <el-table-column label="注册时间" prop="serviceName" :show-overflow-tooltip="true"  align="center"/>
        <el-table-column label="最近登录" prop="serviceMoney"  align="center"/>
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