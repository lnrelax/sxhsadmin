<template>
    <div class="app-container">

      <el-tabs v-model="activeName" @tab-click="handleClick">

        <el-tab-pane label="注册优惠券" name="first">
          <template>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="favorableAdd()">新增</el-button>
          </template>

          <el-table v-loading="loading" :data="orderList" height="580">
            <el-table-column label="优惠券金额" width="280" prop="couponMoney"  align="center" />
            <el-table-column label="满减" prop="useStandard" width="280" align="center" />
            <el-table-column label="优惠券类型" prop="couponType" width="280" :formatter="couponTypeFormat"  align="center" />
            <el-table-column label="创建时间" prop="insertTime" width="280" align="center"/>

            <el-table-column label="操作" width="100" align="center" fixed="right">
                <template slot-scope="scope" >
                    <!-- <el-button type="primary" size="mini" @click="favorableEdit(scope.row)">修改</el-button> -->
                    <el-button type="danger" size="mini" @click="favorableDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="分享优惠券" name="second">
          <template>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="favorableAdd()">新增</el-button>
          </template>

          <el-table v-loading="loading" :data="orderListFx" height="580">
            <el-table-column label="优惠券金额" width="280" prop="couponMoney"  align="center" />
            <el-table-column label="满减" prop="useStandard" width="280" align="center" />
            <el-table-column label="优惠券类型" prop="couponType" width="280" :formatter="couponTypeFormat"  align="center" />
            <el-table-column label="创建时间" prop="insertTime" width="280" align="center"/>

            <el-table-column label="操作" width="100" align="center" fixed="right">
                <template slot-scope="scope" >
                    <!-- <el-button type="primary" size="mini" @click="favorableEdit(scope.row)">修改</el-button> -->
                    <el-button type="danger" size="mini" @click="favorableDel(scope.row)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      
      </el-tabs>

      
  
      <!-- <pagination
        v-show="total>0"
        :total="total"
        :page.sync="Params.pageNum"
        :limit.sync="Params.pageSize"
        @pagination="getList"
      /> -->

      <el-dialog title="新增优惠券" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
          <el-form-item label="优惠卷金额" :label-width="formLabelWidth" prop="couponMoney" :rules="[{ required: true, message: '优惠卷金额不能为空'},]">
            <el-input v-model="form.couponMoney" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="满减" :label-width="formLabelWidth" prop="useStandard" :rules="[{ required: true, message: '满减不能为空'},]">
            <el-input v-model="form.useStandard" autocomplete="off" >
            </el-input>
          </el-form-item>
          <!-- <el-form-item label="优惠卷类型" :label-width="formLabelWidth" prop="couponType" :rules="[{ required: true, message: '优惠卷类型不能为空'},]">
            <el-select
              v-model="statusStr"
              placeholder="优惠券类型"
              clearable
              @change="handleSelectChange"
              style="width: 100%"
            >
            <el-option
              v-for="dict in options"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
            </el-select>

          </el-form-item> -->

         
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="favorableAddCommit()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="编辑优惠券" :visible.sync="dialogFormVisibleEdit">
        <el-form :model="form">
          <el-form-item label="优惠卷金额" :label-width="formLabelWidth" prop="couponMoney" :rules="[{ required: true, message: '优惠卷金额不能为空'},]">
            <el-input v-model="form.couponMoney" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="满减" :label-width="formLabelWidth" prop="useStandard" :rules="[{ required: true, message: '满减不能为空'},]">
            <el-input v-model="form.useStandard" autocomplete="off" >
            </el-input>
          </el-form-item>
          
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="favorableEditCommit()">确 定</el-button>
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
  import { favorableList , favorableServiceEdit } from '@/api/order'
  
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
        orderListFx:[],
        dialogFormVisibleAdd:false,
        dialogFormVisibleEdit:false,
        dialogVisibleDel:false,
        form:{
          type:"",
          couponMoney:"",
          useStandard:"",
          couponType:""
        },
        statusStr:"",
        formLabelWidth: '120px',
        options: [ {
          value: '1',
          label: '注册优惠券'
        }, {
          value: '2',
          label: '分享优惠券'
        }],
        activeName: 'first',

      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        favorableList().then(response => {
          this.loading = false
          console.log(response)
          this.orderList = response.data.signInCoupon
          this.orderListFx = response.data.shareCoupon
          // this.total = response.data.total
        })
      },
      couponTypeFormat(row, column) {
        if(row.couponType === 1) {
          return '注册优惠券'
        } else if(row.couponType === 2) {
          return '分享优惠券'
        }
      },
      favorableAdd(){
        this.dialogFormVisibleAdd = true
        this.form.type = 1
        this.form.couponId = ""
        if(this.activeName == "first"){
          this.form.couponType = 1
        }else if(this.activeName == "second"){
          this.form.couponType = 2
        }
      },
      handleSelectChange(value) {
        console.log('选中的值：', value);
        // 在这里执行你需要的方法
        this.form.couponType = value
      },
      favorableAddCommit(){
        favorableServiceEdit(this.form).then(response => {
          this.loading = false
          this.dialogFormVisibleAdd = false
          this.form ={}
          this.statusStr = ""
          this.getList()
        })
      },
      favorableEdit(row){
        this.dialogFormVisibleEdit = true
        this.form ={
          couponMoney: row.couponMoney,
          useStandard: row.useStandard,
          couponId: row.couponId
        }
      },
      favorableEditCommit(){
        favorableServiceEdit(this.form).then(response => {
          this.loading = false
          this.dialogFormVisibleEdit = false
          this.form ={}
          this.getList()
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      favorableDel(row){
        this.dialogVisibleDel = true
        this.form = {
          type:2,
          couponId:row.couponId
        }
      },
      examineDel(){
        favorableServiceEdit(this.form).then(response => {
          this.loading = false
          this.dialogVisibleDel = false
          this.form ={}
          this.statusStr = ""
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