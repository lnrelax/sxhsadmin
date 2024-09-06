<template>
    <div class="app-container">
      <template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已支付订单" name="first">
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
            unlink-panels
            range-separator="至"
            @change="handleDateChange"
            :start-placeholder="Params.queryStartDate"
            :end-placeholder="Params.queryEndDate"
          ></el-date-picker>
        </el-form-item>

       

        <el-form-item label="推广团队" prop="status">
          <el-select
            v-model="tdListStr"
            placeholder="推广团队"
            clearable
            @change="handleTdListChange"
            style="width: 240px"
          >
          <el-option
            v-for="dict in tdList"
            :key="dict.extendId"
            :label="dict.extendName"
            :value="dict.extendId"
          />

          </el-select>
        </el-form-item>

        <el-form-item label="城市" prop="status">
          <el-select
            v-model="cityStr"
            placeholder="城市"
            clearable
            @change="handleCityChange"
            style="width: 240px"
          >
          <el-option
            v-for="dict in cityLists"
            :key="dict.cityName"
            :label="dict.cityName"
            :value="dict.cityName"
          />

          </el-select>
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
        <el-table-column label="推广名称" prop="extendName" :show-overflow-tooltip="true" width="100" align="center"/>
        <el-table-column label="订单城市" prop="cityName" width="100" align="center"/>
        <el-table-column label="下单次数" prop="orderIndex" width="80" align="center"/>
        <el-table-column label="项目名称" prop="serviceName" :show-overflow-tooltip="true" width="120" align="center"/>
        <el-table-column label="项目金额" prop="serviceMoney" width="100" align="center"/>
        <el-table-column label="用户手机号" prop="userPhone" width="120" align="center"/>
        <el-table-column label="下单地址" prop="address" width="150" align="center"/>
        <el-table-column label="客户订单状态" prop="orderStatus" width="120" align="center"/>
        <el-table-column label="下单技师姓名" prop="artificerName" width="120" align="center"/>
        <!-- <el-table-column label="转单技师姓名" prop="transferName" width="120" align="center"/> -->
        <el-table-column label="技师订单状态" prop="artificerStatus" width="120" align="center"/>
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

    </el-tab-pane>

    <el-tab-pane label="待支付订单" name="second">

      <el-form :model="Params" ref="queryForm" size="small" :inline="true">
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

        <!-- <el-form-item label="订单号">
          <el-input v-model="orderCode" placeholder="请输入订单号"></el-input>
        </el-form-item>

        <el-form-item label="推广团队" prop="status">
          <el-select
            v-model="tdListStr"
            placeholder="推广团队"
            clearable
            @change="handleTdListChange"
            style="width: 240px"
          >
          <el-option
            v-for="dict in tdList"
            :key="dict.extendId"
            :label="dict.extendName"
            :value="dict.extendId"
          />

          </el-select>
        </el-form-item>

        <el-form-item label="城市" prop="status">
          <el-select
            v-model="cityStr"
            placeholder="城市"
            clearable
            @change="handleCityChange"
            style="width: 240px"
          >
          <el-option
            v-for="dict in cityLists"
            :key="dict.cityName"
            :label="dict.cityName"
            :value="dict.cityName"
          />

          </el-select>
        </el-form-item>

        <el-form-item >
          <el-button type="primary" size="mini" @click="orderCodeGet()">搜索</el-button>
        </el-form-item> -->

      </el-form>
  
      <el-table v-loading="loading" :data="orderList" height="580">
        <el-table-column label="订单编号" prop="orderNumber" width="180" align="center"/>
        <el-table-column label="推广名称" prop="extendName" :show-overflow-tooltip="true" width="120" align="center"/>
        <el-table-column label="订单城市" prop="cityName" width="180" align="center"/>
        <el-table-column label="项目名称" prop="serviceName" :show-overflow-tooltip="true" width="150" align="center"/>
        <el-table-column label="项目金额" prop="serviceMoney" width="100" align="center"/>
        <el-table-column label="用户手机号" prop="userPhone" width="120" align="center"/>
        <el-table-column label="下单地址" prop="address" width="150" align="center"/>
        <el-table-column label="客户订单状态" prop="orderStatus" width="120" align="center"/>
        <el-table-column label="下单技师姓名" prop="artificerName" width="120" align="center"/>
        <!-- <el-table-column label="转单技师姓名" prop="transferName" width="120" align="center"/> -->
        <el-table-column label="技师订单状态" prop="artificerStatus" width="120" align="center"/>
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



    </el-tab-pane>
    </el-tabs>

  </template>

    </div>
  </template>
  
  <script>
  import { getOrderList , queryOrderByOrderId , OrderExtendList , cityList } from '@/api/order'
  
  export default {
    data() {
      return {
        tdListStr:"",
        tdList:[],
        cityStr:"",
        cityLists:[],
        // 遮罩层
        loading: true,
        // 总条数
        total: 0,
        // 查询参数
        Params: {
          orderStatus: 0,
          extendId:"",
          cityName:"",
          pageNum: 1,
          pageSize: 10,
          queryStartDate: "",
          queryEndDate: "",
        },
        activeName: 'first',
        status:0,
        statusStr:"全部",
        // 日期范围
        dateRange: [],
        orderList:[],
        options: [{
          value: '0',
          label: '全部'
        },
        // {
        //   value: '1',
        //   label: '待支付'
        // },
         {
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
        var now = new Date();
        var start = new Date()
        // 格式化日期
        var year = now.getFullYear();
        var month = (now.getMonth() + 1 < 10 ? '0' : '') + (now.getMonth() + 1);
        var day = (now.getDate() < 10 ? '0' : '') + now.getDate();
        var formattedDate = year + '-' + month + '-' + day;
        //start.setDate(now.getDate() - 7);
        var startyear = start.getFullYear();
        var startmonth = (start.getMonth() + 1 < 10 ? '0' : '') + (start.getMonth() + 1);
        var startday = (start.getDate() < 10 ? '0' : '') + start.getDate();
        var startformattedDate = startyear + '-' + startmonth + '-' + startday;

        this.Params.queryEndDate = formattedDate;
        this.Params.queryStartDate = startformattedDate;
      },
      formatTime(date) {
        return date.toISOString().split('T')[0];
      },
      handleClick(tab, event) {
        console.log(tab, event);
        if (this.activeName == "first") {
          this.Params.orderStatus = 0
          this.statusStr = "全部"
          this.Params.pageNum = 1
          this.Params.pageSize = 10
        } else if (this.activeName == "second") {
          this.Params.orderStatus = 1
          this.Params.extendId = ""
          this.Params.cityName = ""
          this.Params.pageNum = 1
          this.Params.pageSize = 10

        }
        this.getList()
      },
      getList() {
        this.loading = true;
        getOrderList(this.Params).then(response => {
          this.loading = false
          console.log(response)
          this.orderList = response.data.list
          this.total = response.data.total
        })
        OrderExtendList().then(response => {
          console.log(response)
          this.tdList = response.data
        })
        cityList().then(response => {
          console.log(response)
          this.cityLists = response.data

        })
      },

      handleSelectChange(value) {
        console.log('选中的值：', value);
        // 在这里执行你需要的方法
        this.Params.orderStatus = value
        this.getList();
      },
      handleTdListChange(value) {
        console.log('选中的值：', value);
        // 在这里执行你需要的方法
        this.Params.extendId = value
        this.getList();
      },
      handleCityChange(value){
        console.log('选中的值：', value);
        // 在这里执行你需要的方法
        this.Params.cityName = value
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