<template>
    <div class="app-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户意见反馈" name="first">
          <el-form :model="Params" ref="queryForm" size="small" :inline="true">
            <el-form-item label="处理状态" prop="statusStr">
            <el-select
                v-model="statusStr"
                placeholder="处理状态"
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
        <el-table-column label="用户ID" prop="userId"  align="center" />
        <el-table-column label="反馈内容" prop="problemContent"   align="center" />
        <el-table-column label="反馈图片"  width="180" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 180px; height: 50px"
              :src="scope.row.imageDetail" 
              :preview-src-list="[scope.row.imageDetail]">
            </el-image>
          </template>
          
        </el-table-column>
        <el-table-column label="申请时间" prop="insertTime"   align="center" />
        <el-table-column label="处理时间" prop="approveTime"  align="center"/>
        <el-table-column label="是否处理" prop="workOut" :formatter="workOutFormat" align="center"/>

        <el-table-column label="操作"  align="center" fixed="right">
            <template slot-scope="scope" >
                <el-button v-if="Params.status == 0" type="primary" size="mini" @click="commit(scope.row.id)">处理</el-button>
            </template>
      </el-table-column>
        

      </el-table>
        </el-tab-pane>
        <el-tab-pane label="理疗师意见反馈" name="second">
          <el-form :model="Params" ref="queryForm" size="small" :inline="true">
            <el-form-item label="处理状态" prop="statusStr">
            <el-select
                v-model="statusStr"
                placeholder="处理状态"
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
        <el-table-column label="用户ID" prop="userId"  align="center" />
        <el-table-column label="反馈内容" prop="problemContent"   align="center" />
        <el-table-column label="反馈图片"  width="180" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 180px; height: 50px"
              :src="scope.row.imageDetail" 
              :preview-src-list="[scope.row.imageDetail]">
            </el-image>
          </template>
          
        </el-table-column>
        <el-table-column label="申请时间" prop="insertTime"   align="center" />
        <el-table-column label="处理时间" prop="approveTime"  align="center"/>
        <el-table-column label="是否处理" prop="workOut" :formatter="workOutFormat" align="center"/>

        <el-table-column label="操作"  align="center" fixed="right">
            <template slot-scope="scope" >
                <el-button v-if="Params.status == 0" type="primary" size="mini" @click="commit(scope.row.id)">处理</el-button>
            </template>
      </el-table-column>
        

      </el-table>
          
        </el-tab-pane>
        <el-tab-pane label="店铺意见反馈" name="third">
          <el-form :model="Params" ref="queryForm" size="small" :inline="true">
            <el-form-item label="处理状态" prop="statusStr">
            <el-select
                v-model="statusStr"
                placeholder="处理状态"
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
        <el-table-column label="用户ID" prop="userId"  align="center" />
        <el-table-column label="反馈内容" prop="problemContent"   align="center" />
        <el-table-column label="反馈图片"  width="180" align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 180px; height: 50px"
              :src="scope.row.imageDetail" 
              :preview-src-list="[scope.row.imageDetail]">
            </el-image>
          </template>
          
        </el-table-column>
        <el-table-column label="申请时间" prop="insertTime"   align="center" />
        <el-table-column label="处理时间" prop="approveTime"  align="center"/>
        <el-table-column label="是否处理" prop="workOut" :formatter="workOutFormat" align="center"/>

        <el-table-column label="操作"  align="center" fixed="right">
            <template slot-scope="scope" >
                <el-button v-if="Params.status == 0" type="primary" size="mini" @click="commit(scope.row.id)">处理</el-button>
            </template>
      </el-table-column>
        

      </el-table>
          
        </el-tab-pane>
      </el-tabs>
        
  
    </div>
  </template>
  
  <script>
  import { artFeedBackList , artFeedBackApprove } from '@/api/order'
  
  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 总条数
        total: 0,
        // 查询参数
        Params: {
          status:0,
          source:1,//1: 用户  2:理疗师  3:店铺
        },
        status:0,
        // 日期范围
        dateRange: [],
        orderList:[],
        statusStr:"未处理",
        options: [{
          value: '0',
          label: '未处理'
        }, {
          value: '1',
          label: '已处理'
        }],
        activeName: 'first',
      };
    },
    created() {
      this.getList()
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        this.getList()
      },
      getList() {
        this.loading = true;
        if(this.activeName == "first"){
          this.Params.source = 1
        }else if(this.activeName == "second"){
          this.Params.source = 2
        }else if(this.activeName == "third"){
          this.Params.source = 3
        }
        artFeedBackList(this.Params).then(response => {
          this.loading = false
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
      workOutFormat(row, column) {
        if(row.workOut === 0) {
          return '未处理'
        } else if(row.workOut === 1) {
          return '已处理'
        }
      },
      commit(id){
        artFeedBackApprove({id:id}).then(response => {
          this.loading = false
          this.getList()
        })
      }
    }
  };
  </script>