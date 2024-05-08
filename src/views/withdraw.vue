<template>
    <div class="app-container">
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="理疗师提现记录" name="first">
                    <el-form :model="Params" ref="queryForm" size="small" :inline="true">
                        <el-form-item label="打款状态" prop="statusStr">
                        <el-select
                            v-model="statusStr"
                            placeholder="打款状态"
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

                    <el-table v-loading="loading" :data="artificerCasheRecordList" height="580">
                        <el-table-column label="姓名" prop="userName"  align="center" />
                        <el-table-column label="提交申请时间" prop="applyTime" width="180"  align="center" />
                        <el-table-column label="审核时间" prop="approveTime" width="180" align="center" />
                        <el-table-column label="银行卡号" prop="cardNum" width="180" align="center"/>
                        <el-table-column label="银行名称" prop="bankName"  align="center"/>
                        <el-table-column label="持卡人姓名" prop="cardUserName" width="120" align="center"/>
                        <el-table-column label="开户行地址" prop="bankAddress" width="180" align="center"/>
                        <el-table-column label="提现金额(￥)" prop="casheMoney" width="140" align="center"/>
                        <el-table-column label="应打款金额(￥)" prop="availableMoney" width="160" align="center"/>
                        <el-table-column label="手续费(￥)" prop="casheCharge" width="140" align="center"/>

                        <el-table-column label="操作" width="80" align="center" fixed="right">
                            <template slot-scope="scope" >
                                <el-button v-if="Params.status == 0" type="primary" size="mini" @click="examineClick(scope.row.casheId)">打款</el-button>
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
                </el-tab-pane>

                <el-tab-pane label="店铺提现记录" name="second">
                    <el-form :model="Params" ref="queryForm" size="small" :inline="true">
                        <el-form-item label="打款状态" prop="statusStr">
                        <el-select
                            v-model="statusStr"
                            placeholder="打款状态"
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

                    <el-table v-loading="loading" :data="agentCasheRecordList" height="580">
                        <el-table-column label="姓名" prop="userName"  align="center" />
                        <el-table-column label="提交申请时间" prop="applyTime" width="180"  align="center" />
                        <el-table-column label="审核时间" prop="approveTime" width="180" align="center" />
                        <el-table-column label="银行卡号" prop="cardNum" width="180" align="center"/>
                        <el-table-column label="银行名称" prop="bankName"  align="center"/>
                        <el-table-column label="持卡人姓名" prop="cardUserName" width="120" align="center"/>
                        <el-table-column label="开户行地址" prop="bankAddress" width="180" align="center"/>
                        <el-table-column label="提现金额(￥)" prop="casheMoney" width="140" align="center"/>
                        <el-table-column label="应打款金额(￥)" prop="availableMoney" width="160" align="center"/>
                        <el-table-column label="手续费(￥)" prop="casheCharge" width="140" align="center"/>

                        <el-table-column label="操作" width="80" align="center" fixed="right">
                            <template slot-scope="scope" >
                                <el-button v-if="Params.status == 0" type="primary" size="mini" @click="examineAgentClick(scope.row.casheId)">打款</el-button>
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

                </el-tab-pane>

                <el-tab-pane label="推广代理提现记录" name="third">
                    <el-form :model="Params" ref="queryForm" size="small" :inline="true">
                        <el-form-item label="打款状态" prop="statusStr">
                        <el-select
                            v-model="statusStr"
                            placeholder="打款状态"
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

                    <el-table v-loading="loading" :data="extendCasheRecordList" height="580">
                        <el-table-column label="姓名" prop="userName"  align="center" />
                        <el-table-column label="提交申请时间" prop="applyTime" width="180"  align="center" />
                        <el-table-column label="审核时间" prop="approveTime" width="180" align="center" />
                        <el-table-column label="银行卡号" prop="cardNum" width="180" align="center"/>
                        <el-table-column label="银行名称" prop="bankName"  align="center"/>
                        <el-table-column label="持卡人姓名" prop="cardUserName" width="120" align="center"/>
                        <el-table-column label="开户行地址" prop="bankAddress" width="180" align="center"/>
                        <el-table-column label="提现金额(￥)" prop="casheMoney" width="140" align="center"/>
                        <el-table-column label="应打款金额(￥)" prop="availableMoney" width="160" align="center"/>
                        <el-table-column label="手续费(￥)" prop="casheCharge" width="140" align="center"/>

                        <el-table-column label="操作" width="80" align="center" fixed="right">
                            <template slot-scope="scope" >
                                <el-button v-if="Params.status == 0" type="primary" size="mini" @click="examineExtendClick(scope.row.casheId)" >打款</el-button>
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
                </el-tab-pane>
            </el-tabs>
        </template>
  
      
    </div>
  </template>
  
  <script>
  import { artificerCasheRecord , examine , agentCasheRecord , examineAgent , extendCasheRecord , examineExtendS } from '@/api/order'
  
  export default {
    data() {
      return {
        activeName: 'first',
        // 遮罩层
        loading: true,
        // 总条数
        total: 0,
        // 查询参数
        Params: {
          pageNum:1,
          pageSize:10,
          status:0,
        },
        
        statusStr:"未打款",
        options: [{
          value: '0',
          label: '未打款'
        }, {
          value: '1',
          label: '已打款'
        }],
        // 日期范围
        dateRange: [],
        artificerCasheRecordList:[],
        agentCasheRecordList:[],
        extendCasheRecordList:[],
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        if(this.activeName == "first"){
          artificerCasheRecord(this.Params).then(response => {
            this.loading = false
            this.artificerCasheRecordList = response.data.list
            this.total = response.data.total
          })
        }else if(this.activeName == "second"){
          agentCasheRecord(this.Params).then(response => {
            this.loading = false
            this.agentCasheRecordList = response.data.list
            this.total = response.data.total
          })
        }else if(this.activeName == "third"){
          extendCasheRecord(this.Params).then(response => {
            this.loading = false
            this.extendCasheRecordList = response.data.list
            this.total = response.data.total
          })
        }
        
      },

      handleClick(tab, event) {
        console.log(tab, event);
        this.Params.status = 0
        this.statusStr = "未打款"
        this.getList()
      },
      handleSelectChange(value) {
        console.log('选中的值：', value);
        // 在这里执行你需要的方法
        this.Params.status = value
        this.getList();
      },
      examineClick(id){
        examine({id:id}).then(response => {
          this.loading = false
          this.getList()
        })
      },
      examineAgentClick(id){
        examineAgent({id:id}).then(response => {
          this.loading = false
          this.getList()
        })
      },

      examineExtendClick(id){
        examineExtendS({id:id}).then(response => {
          this.loading = false
          this.getList()
        })
      },
    }
  };
  </script>