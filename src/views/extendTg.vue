<template>
    <div class="app-container">
      <el-form :model="Params" ref="queryForm" size="small" :inline="true">
        <el-form-item label="审核状态" prop="status">
          <el-select
            v-model="statusStr"
            placeholder="审核状态"
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
  
      <el-table v-loading="loading" :data="orderList" height="580">
        <el-table-column label="推广团队ID" prop="extendId" width="180" align="center" />
        <el-table-column label="团队名称" prop="extendName" width="150" align="center" />
        <el-table-column label="所属平台" prop="typeChn" width="120" align="center" />
        <el-table-column label="分成比例" prop="divideNum" :formatter="divideNumFormat" width="100" align="center"/>
        <el-table-column label="联系人" prop="extendConnName" width="160" align="center"/>
        <el-table-column label="联系人电话" prop="extendPhone" width="160" align="center"/>
        <el-table-column label="推广链接" prop="ext2" width="260" align="center"/>
        <el-table-column label="登录账号" prop="account" width="120" align="center"/>
        <!-- <el-table-column label="密码" prop="password" width="100" align="center"/> -->
        <el-table-column label="审核状态" prop="enable" :formatter="enableFormat" width="120" align="center"/>
        <el-table-column label="申请时间" prop="applyTime" width="180" align="center"/>
        <el-table-column label="审核时间" prop="approveTime" width="180" align="center"/>
        <!-- <el-table-column label="店铺码" prop="shopCode" width="120" align="center"/>
        <el-table-column label="店铺名称" prop="shopName" width="160" align="center"/> -->
        

        <el-table-column label="操作" width="250" align="center" fixed="right">
            <template slot-scope="scope" >
                <el-button type="info" size="mini" @click="dialogInfo(scope.row.extendId)" >推广统计</el-button>
                <el-button :disabled="scope.row.enable == 0?false:true" type="success" size="mini" @click="dialog(scope.row.extendId)" >审核</el-button>
                <el-button :disabled="scope.row.type == 1?false:true" type="primary" size="mini" @click="dialogForm(scope.row)">修改</el-button>
            </template>
      </el-table-column>
        

      </el-table>
  
      <el-dialog title="推广统计" :visible.sync="dialogDkVisible"
        width="85%"
        :before-close="handleCloseDk">
        <span>
          <el-table v-loading="loading" :data="infoList" height="200">
            <el-table-column label="推广总用户" prop="userNum" align="center" />
            <el-table-column label="今日推广用户" prop="todayUserNum" align="center" />
            <el-table-column label="近7天推广用户" prop="sevUserNum" align="center" />
            <el-table-column label="近30天推广用户" prop="thiUserNum" align="center" />
            <el-table-column label="推广总订单" prop="orderNum" align="center" />
            <el-table-column label="今日推广订单" prop="todayOrderNum" align="center" />
            <el-table-column label="近7天推广订单 " prop="sevOrderNum" align="center" />
            <el-table-column label="近30天推广订单" prop="thiOrderNum" align="center" />
          </el-table>

        </span>
        
      </el-dialog>


      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>是否确认提交审核</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="examine(extendId)">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="设置分成比例" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="分成比例" :label-width="formLabelWidth" :input="inputSet">
            <el-input v-model="form.divideNum" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="examineForm(extendId)">确 定</el-button>
        </div>
      </el-dialog>


    </div>
  </template>
  
  <script>
  import { extendExtendList , divideSetConfig , divideSet , approve , extendInfo,extendSonInfo } from '@/api/order'
  
  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 总条数
        total: 0,
        // 查询参数
        Params: {
            status:2
        },
        status:0,
        // 日期范围
        dateRange: [],
        orderList:[],
        infoList:[],
        options: [{
          value: '2',
          label: '全部'
        }, {
          value: '0',
          label: '未审核通过'
        }, {
          value: '1',
          label: '审核通过'
        }],
        divideNum:"",
        statusStr:"全部",
        extendId:0,
        dialogVisible:false,
        dialogDkVisible:false,
        dialogFormVisible:false,
        form: {
          divideNum: '',
        },
        formLabelWidth: '120px',
        userInfo:{},



      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        extendInfo().then(response => {
          this.loading = false
          this.userInfo = response.data
        })
        extendExtendList(this.Params).then(response => {
          this.loading = false
          console.log(response)
          this.orderList = response.data
          // this.total = response.data.total
        })
      },
      handleSelectChange(value) {
        console.log('选中的值：', value);
        // 在这里执行你需要的方法
        this.Params.status = value
        this.getList();
      },
      divideNumFormat(row, column) {
        if(row.divideNum != null){
          return row.divideNum+'%'
        }
        
      },
      dialogInfo(id){
        this.dialogDkVisible = true
        extendSonInfo({extendId:id}).then(response => {
          this.infoList = response.data
        })
      
      },
      enableFormat(row, column) {
        if(row.enable === 0) {
          return '未审核通过'
        } else if(row.enable === 1) {
          return '审核通过'
        } else if(row.enable === 2) {
          return '全部'
        } 
      },

      dialog(id){
        this.dialogVisible = true
        this.extendId = id
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      examine(id){
        approve({extendId:id}).then(response => {
          this.dialogVisible = false
          this.loading = false
          this.getList();
        })
      },
      dialogForm(row){
        this.dialogFormVisible = true
        this.extendId = row.extendId
        divideSetConfig().then(response => {
            this.divideNum = response.data.extendDivide
        })
      },
      examineForm(id){
        if(this.form.divideNum > this.userInfo.divideNum){
          this.$message.error('分成比例不能超过当前分成比例上限，当前上限为：'+this.userInfo.divideNum);
          return
        }
        const params = {
          extendId : id,
          scale:this.form.divideNum
        }
        divideSet(params).then(response => {
          this.dialogFormVisible = false
          this.loading = false
          console.log(response)
          this.getList();
        })
      },

      inputSet(value){
        console.log("value:", value);
        if(value > this.divideNum){
            this.form.divideNum = this.divideNum
        }
      },

    }
  };
  </script>