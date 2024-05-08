<template>
    <div class="app-container">
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户协议" name="first">
                    <editor v-model="userAgreement" :min-height="480"/>
                    <el-button type="primary" size="mini" class="button" @click="commit(1)">提交</el-button>
                </el-tab-pane>

                <el-tab-pane label="下单须知" name="second">
                    <editor v-model="orderInstructions" :min-height="480"/>
                    <el-button type="primary" size="mini" class="button" @click="commit(2)">提交</el-button>
                </el-tab-pane>

                <el-tab-pane label="系统设置" name="third">

                    <el-form label-position="left" label-width="180px" size="mini">
                    <el-form-item label="客服电话">
                        <el-input v-model="phone" class="input"></el-input>
                        <el-button type="primary" size="mini" class="button" @click="commit(3)">提交</el-button>
                    </el-form-item>
                    <el-form-item label="客服微信">
                        <el-input v-model="wechat" class="input"></el-input>
                        <el-button type="primary" size="mini" class="button" @click="commit(4)">提交</el-button>
                    </el-form-item>
                    <el-form-item label="店铺首单分成比例">
                        <el-input v-model="orderOne" class="input"></el-input>
                        <el-button type="primary" size="mini" class="button" @click="commit(5)">提交</el-button>
                    </el-form-item>

                    <el-form-item label="店铺加钟打赏分成比例">
                        <el-input v-model="orderAdd" class="input"></el-input>
                        <el-button type="primary" size="mini" class="button" @click="commit(6)">提交</el-button>
                    </el-form-item>

                    <el-form-item label="推广分成比例">
                        <el-input v-model="extend" class="input"></el-input>
                        <el-button type="primary" size="mini" class="button" @click="commit(7)">提交</el-button>
                    </el-form-item>
                    </el-form>
                    
                </el-tab-pane>
            </el-tabs>
        </template>
  
      
    </div>
  </template>
  
  <script>
  import { textInfo , textEdit } from '@/api/order'
  
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
          type: 0,
        },
        status:0,
        // 日期范围
        dateRange: [],
        orderList:[],
        type: 0,
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        if(this.activeName == "first"){
          textInfo({type:1}).then(response => {
            this.loading = false
            this.userAgreement = response.data.context
          })
        }else if(this.activeName == "second"){
          textInfo({type:2}).then(response => {
            this.loading = false
            this.orderInstructions = response.data.context
          })
        }else if(this.activeName == "third"){
          if(this.type!=0){
            if(this.type == 3){
              textInfo({type:3}).then(response => {
                this.loading = false
                this.phone = response.data.context
              })
            }else if(this.type == 4){
              textInfo({type:4}).then(response => {
                this.loading = false
                this.wechat = response.data.context
              })
            }else if(this.type == 5){
              textInfo({type:5}).then(response => {
                this.loading = false
                this.orderOne = response.data.context
              })
            }else if(this.type == 6){
              textInfo({type:6}).then(response => {
                this.loading = false
                this.orderAdd = response.data.context
              })
            }else if(this.type == 7){
              textInfo({type:7}).then(response => {
                this.loading = false
                this.extend = response.data.context
              })
            }
          }else{
            textInfo({type:3}).then(response => {
              this.loading = false
              this.phone = response.data.context
            })
            textInfo({type:4}).then(response => {
              this.loading = false
              this.wechat = response.data.context
            })
            textInfo({type:5}).then(response => {
              this.loading = false
              this.orderOne = response.data.context
            })
            textInfo({type:6}).then(response => {
              this.loading = false
              this.orderAdd = response.data.context
            })
            textInfo({type:7}).then(response => {
              this.loading = false
              this.extend = response.data.context
            })
          }
        }
      },

      handleClick(tab, event) {
        console.log(tab, event);
        this.getList()
      },
      commit(type){
        let textStr = ""
        if(type == 1){
          textStr = this.userAgreement
        }else if(type == 2){
          textStr = this.orderInstructions
        }else if(type == 3){
          textStr = this.phone
        }else if(type == 4){
          textStr = this.wechat
        }else if(type == 5){
          textStr = this.orderOne
        }else if(type == 6){
          textStr = this.orderAdd
        }else if(type == 7){
          textStr = this.extend
        }
        const params = {
          type:type,
          textContent:textStr
        }
        this.type = type
        textEdit(params).then(response => {
          this.loading = false
          this.getList();
        })
      },
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