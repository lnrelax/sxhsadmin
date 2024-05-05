<template>
    <div class="app-container">
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户协议" name="first">
                    <editor v-model="userAgreement" :min-height="480"/>
                </el-tab-pane>

                <el-tab-pane label="下单须知" name="second">
                    <editor v-model="orderInstructions" :min-height="480"/>
                </el-tab-pane>

                <el-tab-pane label="系统设置" name="third">

                    <el-form label-position="left" label-width="180px" size="mini">
                    <el-form-item label="客服电话">
                        <el-input v-model="phone" class="input"></el-input>
                        <el-button type="primary" size="mini" class="button" >提交</el-button>
                    </el-form-item>
                    <el-form-item label="客服微信">
                        <el-input v-model="wechat" class="input"></el-input>
                        <el-button type="primary" size="mini" class="button" >提交</el-button>
                    </el-form-item>
                    <el-form-item label="店铺首单分成比例">
                        <el-input v-model="orderOne" class="input"></el-input>
                        <el-button type="primary" size="mini" class="button" >提交</el-button>
                    </el-form-item>

                    <el-form-item label="店铺加钟打赏分成比例">
                        <el-input v-model="orderAdd" class="input"></el-input>
                        <el-button type="primary" size="mini" class="button" >提交</el-button>
                    </el-form-item>

                    <el-form-item label="推广分成比例">
                        <el-input v-model="extend" class="input"></el-input>
                        <el-button type="primary" size="mini" class="button" >提交</el-button>
                    </el-form-item>
                    </el-form>
                    
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
        phone:"",
        wechat:"",
        orderOne:"",
        orderAdd:"",
        extend:"",
        userAgreement:"",
        orderInstructions:"",
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

<style lang="scss" scoped>
.input{
  width: 90%;
}
.button{
  margin-left: 10px;
}
</style>