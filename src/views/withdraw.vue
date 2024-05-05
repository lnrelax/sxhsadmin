<template>
    <div class="app-container">
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="理疗师提现记录" name="first">
                    <el-form :model="Params" ref="queryForm" size="small" :inline="true">
                        <el-form-item label="打款状态" prop="status">
                        <el-select
                            v-model="status"
                            placeholder="打款状态"
                            clearable
                            style="width: 240px"
                        >
                        </el-select>
                        </el-form-item>
                    </el-form>

                    <el-table v-loading="loading" :data="orderList" height="430">
                        <el-table-column label="姓名" prop="orderNumber"  align="center" />
                        <el-table-column label="提交申请时间" prop="serviceId"  align="center" />
                        <el-table-column label="审核时间" prop="serviceName"  align="center" />
                        <el-table-column label="银行卡号" prop="appointTime"  align="center"/>
                        <el-table-column label="银行名称" prop="appointTime"  align="center"/>
                        <el-table-column label="持卡人姓名" prop="appointTime"  align="center"/>
                        <el-table-column label="开户行地址" prop="appointTime"  align="center"/>
                        <el-table-column label="提现金额(￥)" prop="appointTime"  align="center"/>
                        <el-table-column label="应打款金额(￥)" prop="appointTime"  align="center"/>
                        <el-table-column label="手续费(￥)" prop="appointTime"  align="center"/>

                        <el-table-column label="操作"  align="center" fixed="right">
                            <template slot-scope="scope" >
                                <el-button type="primary" size="mini" >打款</el-button>
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
                </el-tab-pane>

                <el-tab-pane label="店铺提现记录" name="second">
                    <el-form :model="Params" ref="queryForm" size="small" :inline="true">
                        <el-form-item label="打款状态" prop="status">
                        <el-select
                            v-model="status"
                            placeholder="打款状态"
                            clearable
                            style="width: 240px"
                        >
                        </el-select>
                        </el-form-item>
                    </el-form>

                    <el-table v-loading="loading" :data="orderList" height="430">
                        <el-table-column label="姓名" prop="orderNumber"  align="center" />
                        <el-table-column label="提交申请时间" prop="serviceId"  align="center" />
                        <el-table-column label="审核时间" prop="serviceName"  align="center" />
                        <el-table-column label="银行卡号" prop="appointTime"  align="center"/>
                        <el-table-column label="银行名称" prop="appointTime"  align="center"/>
                        <el-table-column label="持卡人姓名" prop="appointTime"  align="center"/>
                        <el-table-column label="开户行地址" prop="appointTime"  align="center"/>
                        <el-table-column label="提现金额(￥)" prop="appointTime"  align="center"/>
                        <el-table-column label="应打款金额(￥)" prop="appointTime"  align="center"/>
                        <el-table-column label="手续费(￥)" prop="appointTime"  align="center"/>

                        <el-table-column label="操作"  align="center" fixed="right">
                            <template slot-scope="scope" >
                                <el-button type="primary" size="mini" >打款</el-button>
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
                </el-tab-pane>

                <el-tab-pane label="推广代理提现记录" name="third">
                    <el-form :model="Params" ref="queryForm" size="small" :inline="true">
                        <el-form-item label="打款状态" prop="status">
                        <el-select
                            v-model="status"
                            placeholder="打款状态"
                            clearable
                            style="width: 240px"
                        >
                        </el-select>
                        </el-form-item>
                    </el-form>

                    <el-table v-loading="loading" :data="orderList" height="430">
                        <el-table-column label="姓名" prop="orderNumber"  align="center" />
                        <el-table-column label="提交申请时间" prop="serviceId"  align="center" />
                        <el-table-column label="审核时间" prop="serviceName"  align="center" />
                        <el-table-column label="银行卡号" prop="appointTime"  align="center"/>
                        <el-table-column label="银行名称" prop="appointTime"  align="center"/>
                        <el-table-column label="持卡人姓名" prop="appointTime"  align="center"/>
                        <el-table-column label="开户行地址" prop="appointTime"  align="center"/>
                        <el-table-column label="提现金额(￥)" prop="appointTime"  align="center"/>
                        <el-table-column label="应打款金额(￥)" prop="appointTime"  align="center"/>
                        <el-table-column label="手续费(￥)" prop="appointTime"  align="center"/>

                        <el-table-column label="操作"  align="center" fixed="right">
                            <template slot-scope="scope" >
                                <el-button type="primary" size="mini" >打款</el-button>
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
                </el-tab-pane>
            </el-tabs>
        </template>
  
      
    </div>
  </template>
  
  <script>
  import { getOrderList } from '@/api/order'
  
  export default {
    data() {
      return {
        activeName: 'first',
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

      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
  </script>