<template>
  <div class="app-container">
    <div class="filter-container">
		<el-select
		  v-model="listQuery.category"
		  size="small"
		  placeholder="订单状态"
		  clearable
		  class="filter-item"
		>
		  <el-option label="新闻" :value="'新闻'" />
		  <el-option label="公告" :value="'公告'" />
		  <el-option label="动态" :value="'动态'" />
		</el-select>
      <el-date-picker
        v-model="listQuery.created_at"
        size="small"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        class="filter-item"
        :editable="false"
      />
      
    </div>
	
	<el-row :gutter="40" class="panel-group">
	  <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	    <div class="card-panel">
	      <div class="card-panel-icon-wrapper icon-people">
	        <i class="el-icon-user-solid" />
	      </div>
	      <div class="card-panel-description">
	        <div class="card-panel-text">
	          订单总数
	        </div>
	        <span class="card-panel-num">102400</span>
	      </div>
	    </div>
	  </el-col>
	  <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	    <div class="card-panel">
	      <div class="card-panel-icon-wrapper icon-message">
	        <i class="el-icon-document" />
	      </div>
	      <div class="card-panel-description">
	        <div class="card-panel-text">
	          退款订单数
	        </div>
	        <span class="card-panel-num">81212</span>
	      </div>
	    </div>
	  </el-col>
	  <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	    <div class="card-panel">
	      <div class="card-panel-icon-wrapper icon-money">
	        <i class="el-icon-chat-dot-square" />
	      </div>
	      <div class="card-panel-description">
	        <div class="card-panel-text">
	          订单总金额
	        </div>
	        <span class="card-panel-num">9280</span>
	      </div>
	    </div>
	  </el-col>
	  <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
	    <div class="card-panel">
	      <div class="card-panel-icon-wrapper icon-shopping">
	        <i class="el-icon-view" />
	      </div>
	      <div class="card-panel-description">
	        <div class="card-panel-text">
	          平台纯利润
	        </div>
	        <span class="card-panel-num">13600</span>
	      </div>
	    </div>
	  </el-col>
	</el-row>

    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      height="100%"
      class="table-container"
      highlight-current-row
    >
      <el-table-column
        fixed
        label="订单编号"
		width="300"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
	  <el-table-column
	    label="推广ID"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.id }}
	    </template>
	  </el-table-column>
      <!-- <el-table-column
        align="center"
        width="150"
        label="轮播图"
      >
        <template slot-scope="scope">
          <img :src="scope.row.icon" height="50">
        </template>
      </el-table-column> -->
      <el-table-column
        label="项目名称"
        align="center"
		width="300"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
	  
	  <el-table-column
	    label="项目金额"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="客户预约时间"
	    align="center"
		width="200"
		>
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="订单时间"
	    align="center"
		width="200"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="订单总金额"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="打赏金额"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="打车费"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="优惠券"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="理疗师利润"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="店铺利润"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="平台利润"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="推广利润"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="项目图片"
	    align="center"
		width="200"
	  >
        <template slot-scope="scope">
          <img :src="scope.row.icon" height="80">
        </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="理疗师姓名"
	    align="center"
		width="120"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="客户订单状态"
	    align="center"
		width="120"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="理疗师订单状态"
	    align="center"
		width="120"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="订单是否可修改"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
      
      <!-- <el-table-column
        label="状态"
        width="80"
        align="center"
      >
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status"
            :active-value="1"
            :inactive-value="0"
            @change="changeStatus($event, scope)"
          />
        </template>
      </el-table-column> -->
      
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getList } from '@/api/banner'
import { deepClone } from '@/utils'

const _temp = {
  id: '',
  title: '',
  icon: '',
  link: '',
  status: 1
}

export default {
  components: {
    Pagination
  },
  data() {
    return {
      total: 0,
      list: [],
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
      },
      temp: Object.assign({}, _temp),
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  .el-icon-plus.avatar-uploader-icon {
    border: 1px dashed #d9d9d9 !important;
    border-radius: 6px;
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
}
.avatar-uploader {
  height: 128px;

  img {
    width: 128px;
    height: 128px;
  }
}

.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      font-size: 48px;
      color: #40c9c6;
    }

    .icon-message {
      font-size: 48px;
      color: #36a3f7;
    }

    .icon-money {
      font-size: 48px;
      color: #f4516c;
    }

    .icon-shopping {
      font-size: 48px;
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0)
  }
  20%,
  60% {
    transform: rotate(-25deg)
  }
  40%,
  80% {
    transform: rotate(10deg)
  }
}

@media (max-width:500px) {
  .github-corner:hover .octo-arm {
    animation: none
  }
  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
