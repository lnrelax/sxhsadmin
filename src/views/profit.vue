<template>
  <div class="app-container">

    <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已支付订单" name="first">

          <el-form :model="InfoParams" ref="queryForm" size="small" :inline="true">

            <!-- <el-form-item label="订单时间">
              <el-date-picker v-model="dateRange" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
                range-separator="-" @change="handleDateChange" :start-placeholder="InfoParams.queryStartDate"
                :end-placeholder="InfoParams.queryEndDate"></el-date-picker>
            </el-form-item> -->

            <el-form-item label="开始时间">
                <el-date-picker
                  style="margin-left: 5px;"
                  v-model="InfoParams.queryStartDate"
                  type="date"
                  @change="handleDateChange"
                  placeholder="开始时间">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="结束时间">
                <el-date-picker
                  style="margin-left: 5px;"
                  v-model="InfoParams.queryEndDate"
                  type="date"
                  @change="handleEndDateChange"
                  placeholder="结束时间">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="订单状态">
              <!-- <el-button type="primary" size="mini" @click="profitT()">提现</el-button> -->
              <el-select v-model="statusStr" placeholder="订单状态" clearable @change="handleSelectChange"
                style="width: 240px">
                <el-option v-for="dict in options" :key="dict.value" :label="dict.label" :value="dict.value" />

              </el-select>
            </el-form-item>
          </el-form>

          <el-row :gutter="20">
            <el-col :span="6">
              <div>
                <el-statistic group-separator="," :value="todayOrderNum" title="总订单数量">
                  <template slot="prefix">
                    <i class="el-icon-s-order" style="color: coral"></i>
                  </template>
                </el-statistic>
              </div>
            </el-col>

            <el-col :span="6">
              <div>
                <el-statistic group-separator="," :value="completeOrderNum" title="成交订单数量">
                  <template slot="prefix">
                    <i class="el-icon-s-marketing" style="color: blueviolet"></i>
                  </template>
                </el-statistic>
              </div>
            </el-col>

            <el-col :span="6">
              <div>
                <el-statistic group-separator="," :value="refundOrderNum" title="退款订单数量">
                  <template slot="prefix">
                    <i class="el-icon-message-solid" style="color: red"></i>
                  </template>
                </el-statistic>
              </div>
            </el-col>

            <el-col :span="6">
              <div>
                <el-statistic group-separator="," :value="servedOrderNum" title="进行中订单数量">
                  <template slot="prefix">
                    <i class="el-icon-s-data" style="color: blue"></i>
                  </template>
                </el-statistic>
              </div>
            </el-col>

            <el-col :span="6">
              <div style="margin-top: 10px;">
                <el-statistic group-separator="," :value="orderTotayMoney" title="总订单金额">
                  <template slot="prefix">
                    <i class="el-icon-s-data" style="color: coral"></i>
                  </template>
                </el-statistic>
              </div>
            </el-col>

            <el-col :span="6">
              <div style="margin-top: 10px;">
                <el-statistic group-separator="," :value="completeMoney" title="成交订单金额">
                  <template slot="prefix">
                    <i class="el-icon-s-data" style="color: blueviolet"></i>
                  </template>
                </el-statistic>
              </div>
            </el-col>

            <el-col :span="6">
              <div style="margin-top: 10px;">
                <el-statistic group-separator="," :value="refundMoney" title="退款订单金额">
                  <template slot="prefix">
                    <i class="el-icon-s-data" style="color: red"></i>
                  </template>
                </el-statistic>
              </div>
            </el-col>

            <el-col :span="6">
              <div style="margin-top: 10px;">
                <el-statistic group-separator="," :value="orderCouponMoney" title="订单优惠券金额">
                  <template slot="prefix">
                    <i class="el-icon-s-data" style="color: blue"></i>
                  </template>
                </el-statistic>
              </div>
            </el-col>

            <el-col :span="6">
              <div style="margin-top: 10px;">
                <el-statistic group-separator="," :value="todayProfit" title="利润">
                  <template slot="prefix">
                    <i class="el-icon-s-data" style="color: red"></i>
                  </template>
                </el-statistic>
              </div>
            </el-col>

          </el-row>

          <el-table v-loading="loading" :data="orderList" height="580" style="margin-top: 10px;">
            <el-table-column label="订单号" prop="orderId" width="180" align="center" />
            <el-table-column label="用户手机号" prop="userPhone" width="120" align="center" />
            <el-table-column label="下单地址" prop="address" width="400" align="center" />
            <el-table-column label="订单状态" prop="orderStatus" align="center" />
            <el-table-column label="下单时间" prop="createTime" width="180" align="center" />
            <el-table-column label="预约时间" prop="appointTime" width="180" align="center" />
            <el-table-column label="服务项目" prop="serviceName" align="center" />
            <el-table-column label="项目金额" prop="serviceMoney" align="center" />
            <el-table-column label="优惠券金额" prop="couponMoney" width="100" align="center" />
            <el-table-column label="推广利润" prop="extendProfit" align="center" />
            <el-table-column label="打车费" prop="taxiMoney" align="center" />

            <el-table-column label="服务图片" width="180" align="center">
              <template slot-scope="scope">
                <el-image style="width: 180px; height: 50px" :src="scope.row.serviceImage"
                  :preview-src-list="[scope.row.serviceImage]">
                </el-image>
              </template>

            </el-table-column>
          </el-table>

          <pagination v-show="total > 0" :total="total" :page.sync="InfoParams.pageNum" :limit.sync="InfoParams.pageSize"
            @pagination="getList" />

        </el-tab-pane>

        <el-tab-pane label="待支付订单" name="second">

          <el-form :model="InfoParams" ref="queryForm" size="small" :inline="true">

            <!-- <el-form-item label="订单时间">
              <el-date-picker v-model="dateRange" style="width: 240px" value-format="yyyy-MM-dd" type="daterange"
                range-separator="-" @change="handleDateChange" :start-placeholder="InfoParams.queryStartDate"
                :end-placeholder="InfoParams.queryEndDate"></el-date-picker>
            </el-form-item> -->

            <el-form-item label="开始时间">
                <el-date-picker
                  style="margin-left: 5px;"
                  v-model="InfoParams.queryStartDate"
                  type="date"
                  @change="handleDateChange"
                  placeholder="开始时间">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="结束时间">
                <el-date-picker
                  style="margin-left: 5px;"
                  v-model="InfoParams.queryEndDate"
                  type="date"
                  @change="handleEndDateChange"
                  placeholder="结束时间">
                </el-date-picker>
            </el-form-item>

          </el-form>

          <el-table v-loading="loading" :data="orderList" height="580" style="margin-top: 10px;">
            <el-table-column label="订单号" prop="orderId" width="180" align="center" />
            <el-table-column label="用户手机号" prop="userPhone" width="120" align="center" />
            <el-table-column label="下单地址" prop="address" width="400" align="center" />
            <el-table-column label="订单状态" prop="orderStatus" align="center" />
            <el-table-column label="下单时间" prop="createTime" width="180" align="center" />
            <el-table-column label="预约时间" prop="appointTime" width="180" align="center" />
            <el-table-column label="服务项目" prop="serviceName" align="center" />
            <el-table-column label="项目金额" prop="serviceMoney" align="center" />
            <el-table-column label="优惠券金额" prop="couponMoney" width="100" align="center" />
            <el-table-column label="推广利润" prop="extendProfit" align="center" />
            <el-table-column label="打车费" prop="taxiMoney" align="center" />
            <el-table-column label="服务图片" width="180" align="center">
              <template slot-scope="scope">
                <el-image style="width: 180px; height: 50px" :src="scope.row.serviceImage"
                  :preview-src-list="[scope.row.serviceImage]">
                </el-image>
              </template>

            </el-table-column>
          </el-table>

          <pagination v-show="total > 0" :total="total" :page.sync="InfoParams.pageNum" :limit.sync="InfoParams.pageSize"
            @pagination="getList" />

        </el-tab-pane>

      </el-tabs>
    </template>



    <el-dialog title="提现" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="提现金额" :label-width="formLabelWidth" prop="withdrawMoney"
          :rules="[{ required: true, message: '提现金额不能为空' },]">
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
import { profitInfo, profitList, profitTx } from '@/api/order'

export default {
  data() {
    return {
      activeName: 'first',
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 查询参数
      InfoParams: {
        orderStatus: 0,
        pageNum: 1,
        pageSize: 10,
        queryStartDate: "",
        queryEndDate: ""
      },
      form: {
        withdrawMoney: "",
      },
      status: 0,
      // 日期范围
      dateRange: [],
      orderList: [],
      like: true,
      userNum: 0,
      money: 0,
      orderNum: 0,
      moneyLy: 0,
      todayOrderNum: 0,
      completeOrderNum: 0,
      refundOrderNum: 0,
      orderTotayMoney: 0,
      completeMoney: 0,
      orderCouponMoney: 0,
      refundMoney: 0,
      todayProfit:0,
      servedOrderNum: 0,
      dialogFormVisibleAdd: false,
      formLabelWidth: '120px',
      statusStr: "全部",
      options: [{
        value: '0',
        label: '全部'
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
    handlePickerBlur() {
      // 处理失焦事件，手动隐藏日期选择器
      this.$nextTick(() => {
        this.$refs.datePicker.pickerVisible = false;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      if (this.activeName == "first") {
        this.InfoParams.orderStatus = 0
        this.statusStr = "全部"
      } else if (this.activeName == "second") {
        this.InfoParams.orderStatus = 1
      }
      this.getList()
    },
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
        this.todayOrderNum = response.data.todayOrderNum
        this.completeOrderNum = response.data.completeOrderNum
        this.refundOrderNum = response.data.refundOrderNum
        this.orderTotayMoney = response.data.orderTotayMoney
        this.completeMoney = response.data.completeMoney
        this.orderCouponMoney = response.data.orderCouponMoney
        this.todayProfit = response.data.todayProfit
        this.refundMoney = response.data.refundMoney
        this.servedOrderNum = response.data.servedOrderNum
      })
      profitList(this.InfoParams).then(response => {
        this.loading = false
        this.orderList = response.data.list
        this.total = response.data.total
      })
    },
    handleDateChange(value) {
      console.log('日期时间改变了，新值为：', value);
      console.log("开始时间",value)
      const dateObj = new Date(value);
      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObj.getDate().toString().padStart(2, '0');
      this.InfoParams.queryStartDate = `${year}-${month}-${day}`;
      // this.getList()
    },
    handleEndDateChange(value) {
      console.log('日期时间改变了，新值为：', value);
      console.log("开始时间",value)
      const dateObj = new Date(value);
      const year = dateObj.getFullYear();
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const day = dateObj.getDate().toString().padStart(2, '0');
      this.InfoParams.queryEndDate = `${year}-${month}-${day}`;
      this.getList()
    },
    // handleDateChange(value) {
    //   console.log('日期时间改变了，新值为：', value);
    //   this.InfoParams.queryStartDate = value[0]
    //   this.InfoParams.queryEndDate = value[1]
    //   this.getList()
    // },
    profitT() {
      this.dialogFormVisibleAdd = true
    },
    commit() {
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

.padding {
  padding-bottom: 10px;
}
</style>