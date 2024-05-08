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
        <el-table-column label="ID" prop="agentId" width="80" align="center" fixed/>
        <el-table-column label="店铺名称" prop="userName"  width="120" align="center" fixed/>
        <el-table-column label="店铺码" prop="inviteCode" width="150" align="center"/>
        <el-table-column label="电话" prop="phone" width="120" align="center"/>
        <el-table-column label="首单分成比例" prop="firstDivide" :formatter="firstDivideFormat" width="160" align="center"/>
        <el-table-column label="加钟分成比例" prop="addDivide" :formatter="addDivideFormat" width="120" align="center"/>
        <el-table-column label="审核状态" prop="enable" :formatter="enableFormat" width="120" align="center"/>
        <el-table-column label="登录账号" prop="userAccount" width="120" align="center"/>
        <el-table-column label="密码" prop="password" width="100" align="center"/>
        <el-table-column label="申请时间" prop="insertTime" width="180" align="center"/>
        <el-table-column label="营业执照"  width="180" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 180px; height: 50px"
              :src="scope.row.ext1" 
              :preview-src-list="[scope.row.ext1]">
            </el-image>
          </template>
          
        </el-table-column>

        <el-table-column label="操作" width="220" align="center" fixed="right">
            <template slot-scope="scope" >
                <el-button :disabled = "scope.row.enable == 0?false:true" type="success" size="mini" @click="dialog(scope.row.agentId)" >审核</el-button>
                <el-button type="primary" size="mini" @click="dialogForm(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="dialogDel(scope.row)">删除</el-button>
            </template>
      </el-table-column>
        

      </el-table>
  
      <!-- <pagination
        v-show="total>0"
        :total="total"
        :page.sync="Params.pageNum"
        :limit.sync="Params.pageSize"
        @pagination="getList"
      /> -->

      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleDel"
        width="30%"
        :before-close="handleClose">
        <span>是否确认删除</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDel = false">取 消</el-button>
          <el-button type="primary" @click="examineDel(artificerId)">确 定</el-button>
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
          <el-button type="primary" @click="examine(agentId)">确 定</el-button>
        </span>
      </el-dialog>


      <el-dialog title="编辑分成" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="首单分成比例" :label-width="formLabelWidth">
            <el-input v-model="form.firstDivide" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="加钟分成比例" :label-width="formLabelWidth">
            <el-input v-model="form.addDivide" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="examineForm(agentId)">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </template>
  
  <script>
  import { shopList , examineShop , shopSet , agentDeleted } from '@/api/order'
  
  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 总条数
        total: 0,
        // 查询参数
        Params: {
          enable:2
        },
        status:0,
        statusStr:"",
        orderList:[],
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
        dialogVisible:false,
        dialogVisibleDel:false,
        dialogFormVisible:false,
        agentId:0,
        form: {
          firstDivide: '',
          addDivide: '',
        },
        formLabelWidth: '120px'
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        shopList(this.Params).then(response => {
          this.loading = false
          console.log(response)
          this.orderList = response.data
          // this.total = response.data.total
        })
      },
      handleSelectChange(value) {
        console.log('选中的值：', value);
        // 在这里执行你需要的方法
        this.Params.enable = value
        this.getList();
      },
      firstDivideFormat(row, column) {
        if(row.firstDivide != null){
          return row.firstDivide+'%'
        }
      },
      addDivideFormat(row, column) {
        if(row.addDivide != null){
          return row.addDivide+'%'
        }
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
      examine(id){
        examineShop({agentId:id}).then(response => {
          this.dialogVisible = false
          this.loading = false
          console.log(response)
          this.getList();
        })
      },
      dialog(id){
        this.dialogVisible = true
        this.agentId = id
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      dialogForm(row){
        this.dialogFormVisible = true
        this.agentId = row.agentId
        this.form.firstDivide = row.firstDivide
        this.form.addDivide = row.addDivide
      },
      dialogDel(row){
        this.dialogVisibleDel = true
        this.agentId = row.agentId
      },
      examineForm(id){
        const params ={
          firstDivide: this.form.firstDivide, 
          addDivide: this.form.addDivide, 
          shopId: id
        }
        shopSet(params).then(response => {
          this.dialogFormVisible = false
          this.loading = false
          console.log(response)
          this.getList();
        })
      },
      dialogDel(row){
        this.dialogVisibleDel = true
        this.agentId = row.agentId
      },
      examineDel(id){
        this.loading = true
        agentDeleted({agentId:id}).then(response => {
          this.dialogVisibleDel = false
          this.loading = false
          this.getList();
        })
      },
    }
  };
  </script>