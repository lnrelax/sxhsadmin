<template>
    <div class="app-container">
        <el-form :model="Params" ref="queryForm" size="small" :inline="true">
            <el-form-item label="处理状态" prop="status">
            <el-select
                v-model="status"
                placeholder="处理状态"
                clearable
                style="width: 240px"
            >
            </el-select>
            </el-form-item>
            
        </el-form>
  
      <el-table v-loading="loading" :data="orderList" height="480">
        <el-table-column label="用户ID" prop="orderNumber"  align="center" />
        <el-table-column label="反馈内容" prop="serviceId"   align="center" />
        <el-table-column label="反馈图片"  width="180" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 180px; height: 50px"
              :src="scope.row.serviceImage" 
              :preview-src-list="[scope.row.serviceImage]">
            </el-image>
          </template>
          
        </el-table-column>
        <el-table-column label="申请时间" prop="serviceName"   align="center" />
        <el-table-column label="处理时间" prop="appointTime"  align="center"/>
        <el-table-column label="是否处理" prop="appointTime"  align="center"/>

        <el-table-column label="操作"  align="center" fixed="right">
            <template slot-scope="scope" >
                <el-button type="primary" size="mini" >处理</el-button>
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