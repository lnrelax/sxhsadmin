<template>
    <div class="app-container">
        <template>
          
            <el-form  label-position="left" label-width="180px" size="mini">
              <el-row :gutter="20">

                <el-col :span="span">
                  <el-form-item label="推广团队ID" >
                        <el-input v-model="userInfo.extendId" readonly></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="团队名称" >
                        <el-input v-model="userInfo.extendName" readonly></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="团队级别" >
                        <el-input v-model="userInfo.typeChn"  readonly></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="联系电话" >
                        <el-input v-model="userInfo.extendPhone" readonly></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="联系地址" >
                        <el-input v-model="userInfo.address" readonly></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="联系人" >
                        <el-input v-model="userInfo.extendConnName"  readonly></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="账号" >
                        <el-input v-model="userInfo.account" readonly></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="密码" >
                        <el-input v-model="userInfo.password"  readonly style="width:79%"></el-input>
                        <el-button type="primary" size="mini" style="margin-left:10px;" @click="editPwd()">修改密码</el-button>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="分成比例" >
                        <el-input v-model="userInfo.divideNum"  readonly ></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="银行卡" >
                        <el-input v-model="userInfo.extendCard"  readonly style="width:84%"></el-input>
                        <el-button type="primary" size="mini"  style="margin-left:10px;" @click="editBankCard()">修改</el-button>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="持卡人姓名" >
                        <el-input v-model="userInfo.extendCardName"  readonly></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="提交申请时间" >
                        <el-input v-model="userInfo.applyTime"  readonly></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="审核时间" >
                        <el-input v-model="userInfo.approveTime"  readonly></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="店铺码" >
                        <el-input v-model="userInfo.shopCode"  readonly></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="span">
                  <el-form-item label="余额">
                    <el-input v-model="form.withdrawMoney"  readonly style="width:79%" ></el-input>
                    <el-button type="primary" size="mini" style="margin-left:10px" @click="withdrawInfo()">余额提现</el-button>
                  </el-form-item>
                </el-col>

              </el-row>
                    
            </el-form>
        </template>

        <el-dialog title="修改密码" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="addForm">
            <el-form-item label="旧密码" :label-width="formLabelWidth" prop="orderPwd" :rules="[{ required: true, message: '旧密码不能为空'},]">
                <el-input v-model="addForm.orderPwd" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPwd" :rules="[{ required: true, message: '新密码不能为空'},]">
                <el-input v-model="addForm.newPwd" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码" :label-width="formLabelWidth" prop="reNewPwd" :rules="[{ required: true, message: '确认密码不能为空'},]">
                <el-input v-model="addForm.reNewPwd" autocomplete="off" show-password></el-input>
            </el-form-item>
            

            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
            <el-button type="primary" @click="pwdCommit()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="银行卡" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="editForm">
            <el-form-item label="银行卡" :label-width="formLabelWidth" prop="extendCard" :rules="[{ required: true, message: '银行卡不能为空'},]">
                <el-input v-model="editForm.extendCard" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="持卡人" :label-width="formLabelWidth" prop="extendCardName" :rules="[{ required: true, message: '持卡人不能为空'},]">
                <el-input v-model="editForm.extendCardName" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="银行" :label-width="formLabelWidth" prop="bankName" :rules="[{ required: true, message: '银行不能为空'},]">
                <el-input v-model="editForm.bankName" autocomplete="off" ></el-input>
            </el-form-item>

            <el-form-item label="银行地址" :label-width="formLabelWidth" prop="bankAddress" :rules="[{ required: true, message: '银行地址不能为空'},]">
                <el-input v-model="editForm.bankAddress" autocomplete="off" ></el-input>
            </el-form-item>
            

            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="backCommit()">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="提现" :visible.sync="dialogFormVisibleTx">
            <el-form :model="form">
            <el-form-item label="提现金额" :label-width="formLabelWidth" prop="withdrawMoney" :rules="[{ required: true, message: '提现金额不能为空'},]">
                <el-input v-model="form.withdrawMoney" autocomplete="off" type="number">
                <template slot="prepend">￥</template>
                <template slot="append">RMB</template>
                </el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisibleTx = false">取 消</el-button>
            <el-button type="primary" @click="commit()">确 定</el-button>
            </div>
        </el-dialog>
    
      
    </div>
  </template>
  
  <script>
  import { extendInfo , pwdUpdate , bankCardEdit , profitInfo , profitTx  } from '@/api/order'
  
  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 查询参数
        Params: {
          type: 0,
        },
        userInfo:{
          extendId:"",
          extendName:"",
          typeChn:"",
          extendPhone:"",
          address:"",
          extendConnName:"",
          account:"",
          password:"",
          divideNum:"",
          extendCard:"",
          extendCardName:"",
          applyTime:"",
          approveTime:"",
          shopCode:"",
        },
        dialogFormVisibleAdd:false,
        dialogFormVisibleEdit:false,
        dialogFormVisibleTx:false,
        formLabelWidth: '120px',
        addForm:{
            orderPwd:"",
            newPwd:"",
            reNewPwd:"",
        },
        editForm:{
            extendCard:"",
            extendCardName:"",
            bankName:"",
            bankAddress:"",

        },
        form:{
          withdrawMoney:"",
        },
        InfoParams:{
            queryStartDate: "",
            queryEndDate: ""
        },
        span:12,

      };
    },
    created() {
      this.setTimes()
      this.getList()
    },
    methods: {
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
        extendInfo().then(response => {
          this.loading = false
          this.userInfo = response.data
          this.editForm.extendCard = response.data.extendCard
          this.editForm.extendCardName = response.data.extendCardName
          this.editForm.bankName = response.data.bankName
          this.editForm.bankAddress = response.data.bankAddress
        })
        profitInfo(this.InfoParams).then(response => {
          this.form.withdrawMoney = response.data.balance
        })
      },
      editPwd(){
        this.dialogFormVisibleAdd = true
      },
      pwdCommit(){
        pwdUpdate(this.addForm).then(response => {
            this.dialogFormVisibleAdd = false
            this.getList();
        })
      },
      editBankCard(){
        this.dialogFormVisibleEdit = true
      },
      backCommit(){
        bankCardEdit(this.editForm).then(response => {
            this.dialogFormVisibleEdit = false
            this.getList()
        })
      },
      withdrawInfo(){
        this.dialogFormVisibleTx = true
      },

      commit(){
        profitTx(this.form).then(response => {
          this.loading = false
          this.dialogFormVisibleTx = false
        })
      },

    }
  };
  </script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

  .inputStr{
    width:30%;
  }
</style>