<template>
    <div class="app-container">

      <el-form :model="InfoParams" ref="queryForm" size="small" :inline="true">
        
        <el-form-item label="订单时间">
          <el-date-picker
            v-model="dateRange"
            style="width: 240px"
            value-format="yyyy-MM-dd"
            type="daterange"
            range-separator="-"
            @change="handleDateChange"
            :start-placeholder="InfoParams.queryStartDate"
            :end-placeholder="InfoParams.queryEndDate"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="订单状态">
            <!-- <el-button type="primary" size="mini" @click="profitT()">提现</el-button> -->
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
      </el-form>

      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-statistic
              group-separator=","
              :value="userNum"
              title="订单总数"
            >
            <template slot="prefix">
              <i class="el-icon-s-order" style="color: red"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div>
            <el-statistic
            group-separator=","
            :precision="2"
            :value="money"
            title="退款单数"
          >
            <template slot="prefix">
              <i class="el-icon-delete-solid" style="color: green"></i>
            </template>
          </el-statistic>
          </div>
        </el-col> -->

        <el-col :span="6">
          <div>
            <el-statistic
              group-separator=","
              :value="orderNum"
              title="利润"
            >
            <template slot="prefix">
              <i class="el-icon-s-marketing" style="color: blue"></i>
            </template>
          </el-statistic>
          </div>
        </el-col>

      </el-row>

      <el-table v-loading="loading" :data="orderList" height="580" style="margin-top: 10px;">
        <el-table-column label="订单号" prop="orderId" width="180"  align="center"/>
        <el-table-column label="用户手机号" prop="userPhone" width="120" align="center"/>
        <el-table-column label="下单地址" prop="address" width="400" align="center"/>
        <el-table-column label="订单状态" prop="orderStatus"  align="center"/>
        <el-table-column label="预约时间" prop="appointTime" width="180" align="center"/>
        <el-table-column label="服务项目" prop="serviceName"  align="center"/>
        <el-table-column label="项目金额" prop="serviceMoney"  align="center"/>
        <el-table-column label="推广利润" prop="extendProfit"  align="center"/>
        <el-table-column label="打车费" prop="taxiMoney"  align="center"/>
        <el-table-column label="创建时间" prop="createTime" width="180" align="center"/>
        <el-table-column label="服务图片"  width="180" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 180px; height: 50px"
              :src="scope.row.serviceImage" 
              :preview-src-list="[scope.row.serviceImage]">
            </el-image>
          </template>
          
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="InfoParams.pageNum"
        :limit.sync="InfoParams.pageSize"
        @pagination="getList"
      />

      <el-dialog title="提现" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
          <el-form-item label="提现金额" :label-width="formLabelWidth" prop="withdrawMoney" :rules="[{ required: true, message: '提现金额不能为空'},]">
            <el-input v-model="form.withdrawMoney" autocomplete="off" type="number">
              <template slot="prepend">￥</template>
              <template slot="append">RMB</template>
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="commit()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </template>
  
  <script>
  import { profitInfo , profitList , profitTx } from '@/api/order'
  
  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 总条数
        total: 0,
        // 查询参数
        InfoParams:{
          orderStatus:0,
          pageNum:1,
          pageSize:10,
          queryStartDate: "",
          queryEndDate: ""
        },
        form:{
            withdrawMoney:"",
        },
        status:0,
        // 日期范围
        dateRange: [],
        orderList:[],
        like: true,
        userNum: 0,
        money: 0,
        orderNum:0,
        moneyLy:0,
        dialogFormVisibleAdd:false,
        formLabelWidth: '120px',
        statusStr:"全部",
        options: [{
          value: '0',
          label: '全部'
        }, {
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
          value: '6',
          label: '退款完成'
        }],

      };
    },
    created() {
      this.setTimes();
      this.getList()
    },
    methods: {
      handleSelectChange(value) {
        console.log('选中的值：', value);
        // 在这里执行你需要的方法
        this.InfoParams.orderStatus = value
        this.getList();
      },
      setTimes() {
        const now = new Date();
        this.InfoParams.queryEndDate = this.formatTime(now);
        this.InfoParams.queryStartDate = this.formatTime(now);
      },
      formatTime(date) {
        return date.toISOString().split('T')[0];
      },
      getList() {
        this.loading = true;
        profitInfo(this.InfoParams).then(response => {
          this.orderNum = response.data.todayProfit
          this.moneyLy = response.data.todayProfit
          this.userNum = response.data.todayOrderNum
          this.money = response.data.balance
          this.form.withdrawMoney = response.data.balance
        })
        profitList(this.InfoParams).then(response => {
          this.loading = false
          this.orderList = response.data.list
          this.total = response.data.total
        })
      },

      handleDateChange(value) {
        console.log('日期时间改变了，新值为：', value);
        this.InfoParams.queryStartDate = value[0]
        this.InfoParams.queryEndDate = value[1]
        this.getList()
      },
      profitT(){
        this.dialogFormVisibleAdd = true
      },
      commit(){
        profitTx(this.form).then(response => {
          this.loading = false
          this.dialogFormVisibleAdd = false
          this.getList()
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
.padding{
    padding-bottom: 10px;
}
</style>