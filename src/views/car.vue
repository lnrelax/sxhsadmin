<template>
    <div class="app-container">
        <template>
            <el-button type="primary" icon="el-icon-plus" size="mini" >新增</el-button>
        </template>
  
      <el-table v-loading="loading" :data="orderList" height="480">
        <el-table-column label="城市" prop="orderNumber"  align="center" />
        <el-table-column label="起步价(元)" prop="serviceId"  align="center" />
        <el-table-column label="白天每公里(元)" prop="serviceName"  align="center" />
        <el-table-column label="晚上每公里(元)" prop="serviceName"  align="center" />
        <el-table-column label="创建时间" prop="appointTime"  align="center"/>

        <el-table-column label="操作"  align="center" fixed="right">
            <template slot-scope="scope" >
                <!-- <el-button type="primary" size="mini" >修改</el-button> -->
                <el-button type="danger" size="mini" >删除</el-button>
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