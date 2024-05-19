<template>
    <div class="app-container">
      
      <el-table v-loading="loading" :data="orderList" height="580">
        <el-table-column label="订单号" prop="orderId" align="center"/>
        <el-table-column label="原有余额" prop="oldBalance"  align="center"/>
        <el-table-column label="更新余额" prop="updateBalance"  align="center"/>
        <el-table-column label="更新后余额" prop="nowBalance"  align="center"/>
        <el-table-column label="更新原因" prop="ext1"  align="center"/>
        <el-table-column label="更新时间" prop="insertTime"  align="center"/>
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
  import { balanceDetail } from '@/api/order'
  
  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 总条数
        total: 0,
        // 查询参数
        Params: {
          pageNum: 1,
          pageSize: 10,
        },
        orderList:[],
        like: true,
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        balanceDetail(this.Params).then(response => {
          this.loading = false;
          this.orderList = response.data.list
          this.total = response.data.total
        })
      },
      
    }
  };
  </script>

<style lang="scss">
.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}
</style>