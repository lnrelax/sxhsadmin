<template>
    <div class="app-container">
      <el-row v-if="userType == 2" :gutter="20">
        <el-col :span="6">
          <div>
            <el-statistic
              group-separator=","
              :value="userNum"
              title="总用户数"
            >
            <template slot="prefix">
              <i class="el-icon-user-solid" style="color: red"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-statistic title="今日新增"
            :value="newUserNum">
            <template slot="prefix">
              <i class="el-icon-user-solid" style="color: blue"></i>
            </template>
            </el-statistic>
          </div>
        </el-col>
      </el-row>
      <el-table v-loading="loading" :data="orderList" height="580" :style="userType == 2?'margin-top: 10px;':''">
        <el-table-column label="用户手机号" prop="phone" :formatter="phoneFormat" align="center"/>
        <el-table-column label="登录城市" prop="area"  align="center"/>
        <el-table-column label="注册时间" prop="registerTime"  align="center"/>
        <el-table-column label="最近登录" prop="lastLoginTime"  align="center"/>
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
  import { getUserNum , getUserList } from '@/api/order'
  import Cookies from "js-cookie";
  import { getUserType } from '@/utils/auth'
  
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
        UserNumParams:{
          userAccount:Cookies.get("username"),
          password:Cookies.get("password")
        },
        userType:getUserType(),
        status:0,
        // 日期范围
        dateRange: [],
        orderList:[],
        like: true,
        userNum: 0,
        newUserNum: 0,
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        getUserNum(this.UserNumParams).then(response => {
          console.log(response)
          this.userNum = response.data.totalUserNum
          this.newUserNum = response.data.todayUserNum
        })
        getUserList(this.Params).then(response => {
          this.loading = false
          console.log(response)
          this.orderList = response.data.list
          this.total = response.data.total
        })
      },
      phoneFormat(row, column) {
        if(row.divideNum == null){
          return "暂无"
        }
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