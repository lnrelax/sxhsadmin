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
        <el-table-column label="姓名" prop="userName" width="180" align="center" />
        <el-table-column label="昵称" prop="nickName"  width="120" align="center"/>
        <el-table-column label="性别" prop="userSex" :formatter="userSexFormat" width="150" align="center"/>
        <el-table-column label="年龄" prop="userAge" width="100" align="center"/>
        <el-table-column label="电话" prop="userPhone" width="160" align="center"/>
        <el-table-column label="技师状态" prop="status" :formatter="statusFormat" width="160" align="center"/>
        <el-table-column label="审核状态" prop="enable" :formatter="enableFormat" width="120" align="center"/>
        <el-table-column label="接单量" prop="totalOrder" width="80" align="center"/>
        <el-table-column label="登录账号" prop="userAccount" width="160" align="center"/>
        <el-table-column label="密码" prop="password" width="80" align="center"/>
        <el-table-column label="从业(年)" prop="workYear" width="120" align="center"/>
        <el-table-column label="申请时间" prop="applyTime" width="180" align="center"/>
        <el-table-column label="店铺ID" prop="agentId" width="80" align="center"/>
        <el-table-column label="身份证"  width="180" align="center">
          <template slot-scope="scope">
            <el-image v-if="scope.row.userIdCard!=''"
              style="width: 180px; height: 50px"
              :src="scope.row.userIdCard" 
              :preview-src-list="[scope.row.userIdCard]">
            </el-image>
          </template>
          
        </el-table-column>

        <el-table-column label="健康证"  width="180" align="center">
          <template slot-scope="scope">
            <el-image  v-if="scope.row.healthCertificate!=''"
              style="width: 180px; height: 50px"
              :src="scope.row.healthCertificate" 
              :preview-src-list="[scope.row.healthCertificate]">
            </el-image>
          </template>
          
        </el-table-column>

        <el-table-column label="按摩证"  width="180" align="center">
          <template slot-scope="scope">
            <el-image v-if="scope.row.massageCertificate!=''"
              style="width: 180px; height: 50px"
              :src="scope.row.massageCertificate" 
              :preview-src-list="[scope.row.massageCertificate]">
            </el-image>
          </template>
          
        </el-table-column>

        <el-table-column label="操作" width="180" align="center" fixed="right">
            <template slot-scope="scope" >
                <el-button v-if="scope.row.enable == 0" type="success" size="mini" @click="dialog(scope.row.artificerId)" >审核</el-button>
                <el-button type="danger" size="mini" @click="dialogDel(scope.row.artificerId)" >删除</el-button>
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


      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>是否确认提交技师审核</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="examine(artificerId)">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleDel"
        width="30%"
        :before-close="handleClose">
        <span>是否确认删除技师</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDel = false">取 消</el-button>
          <el-button type="primary" @click="examineDel(artificerId)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { getPhysiotherapList , examinePhysiotherap , massageDelete } from '@/api/order'
  
  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 总条数
        total: 0,
        // 查询参数
        Params: {
          pageNum:1,
          pageSize:10,
          status: 1 //0：未审核通过  1：审核通过  2:全部
        },
        statusStr:"审核通过",
        // 日期范围
        dateRange: [],
        orderList:[],

        options: [{
          value: '0',
          label: '未审核通过'
        }, {
          value: '1',
          label: '审核通过'
        }],
        dialogVisible:false,
        dialogVisibleDel:false,
        artificerId:0,
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        getPhysiotherapList(this.Params).then(response => {
          this.loading = false
          console.log(response)
          this.orderList = response.data.list
          this.total = response.data.total
        })
      },
      userSexFormat(row, column) {
        if(row.userSex === 1) {
          return '男'
        } else if(row.userSex === 2) {
          return '女'
        } 
      },
      statusFormat(row, column) {
        if(row.status === 0) {
          return '可预约'
        } else if(row.status === 1) {
          return '忙碌中'
        } else if(row.status === 2) {
          return '休息中'
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
        examinePhysiotherap({artificerId:id}).then(response => {
          this.loading = false
          this.dialogVisible = false
          console.log(response)
          this.getList();
        })
      },

      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleSelectChange(value) {
        console.log('选中的值：', value);
        // 在这里执行你需要的方法
        this.Params.status = value
        this.getList();
      },
      dialog(id){
        this.dialogVisible = true
        this.artificerId = id
      },
      dialogDel(id){
        this.dialogVisibleDel = true
        this.artificerId = id
      },
      examineDel(id){
        this.loading = true
        massageDelete(id).then(response => {
          this.loading = false
          this.dialogVisibleDel = false
          this.getList();
        })
      },

    }
  };
  </script>