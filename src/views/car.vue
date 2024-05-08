<template>
    <div class="app-container">
        <template>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="carAdd()">新增</el-button>
        </template>
  
      <el-table v-loading="loading" :data="orderList" height="580">
        <el-table-column label="城市" prop="cityName"  align="center" />
        <el-table-column label="起步价(元)" prop="foundation"  align="center" />
        <el-table-column label="白天每公里(元)" prop="dayUnit"  align="center" />
        <el-table-column label="晚上每公里(元)" prop="nightUnit"  align="center" />
        <el-table-column label="创建时间" prop="editTime"  align="center"/>

        <el-table-column label="操作"  align="center" fixed="right">
            <template slot-scope="scope" >
                <!-- <el-button type="primary" size="mini" >修改</el-button> -->
                <el-button type="danger" size="mini" @click="carDel(scope.row)">删除</el-button>
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


      <el-dialog title="新增车费" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
          <el-form-item label="城市" :label-width="formLabelWidth" prop="cityName" :rules="[{ required: true, message: '城市不能为空'},]">
            <el-input v-model="form.cityName" autocomplete="off" ></el-input>
          </el-form-item>
          <el-form-item label="起步价" :label-width="formLabelWidth" prop="foundation" :rules="[{ required: true, message: '起步价不能为空'},]">
            <el-input v-model="form.foundation" autocomplete="off" type="number">
            </el-input>
          </el-form-item>

          <el-form-item label="白天每公里" :label-width="formLabelWidth" prop="dayUnit" :rules="[{ required: true, message: '白天每公里不能为空'},]">
            <el-input v-model="form.dayUnit" autocomplete="off" type="number">
            </el-input>
          </el-form-item>

          <el-form-item label="晚上每公里" :label-width="formLabelWidth" prop="nightUnit" :rules="[{ required: true, message: '晚上每公里不能为空'},]">
            <el-input v-model="form.nightUnit" autocomplete="off" type="number">
            </el-input>
          </el-form-item>
         
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="carAddCommit()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisibleDel"
        width="30%"
        :before-close="handleClose">
        <span>是否确认删除</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleDel = false">取 消</el-button>
          <el-button type="primary" @click="examineDel()">确 定</el-button>
        </span>
      </el-dialog>


    </div>
  </template>
  
  <script>
  import { carList , carAdd , taxiDelete } from '@/api/order'
  
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
        dialogFormVisibleAdd:false,
        dialogVisibleDel:false,
        form:{
          cityName:"",
          foundation:"",
          dayUnit:"",
          nightUnit:"",
        },
        formLabelWidth: '120px',
        taxiId:"",
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        carList().then(response => {
          this.loading = false
          console.log(response)
          this.orderList = response.data
          // this.total = response.data.total
        })
      },
      carAdd(){
        this.dialogFormVisibleAdd = true
      },
      carAddCommit(){
        carAdd(this.form).then(response => {
          this.loading = false
          this.dialogFormVisibleAdd = false
          this.form = {}
          this.getList()
        })
      },
      carDel(row){
        this.dialogVisibleDel = true
        this.taxiId = row.taxiId
      },
      examineDel(){
        taxiDelete({taxiId:this.taxiId}).then(response => {
          this.loading = false
          this.dialogVisibleDel = false
          this.taxiId = ""
          this.getList()
        })
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    }
  };
  </script>