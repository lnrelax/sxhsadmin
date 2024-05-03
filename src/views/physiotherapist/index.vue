<template>
  <div class="app-container">
    <div class="filter-container">
		<el-select
		  v-model="listQuery.category"
		  size="small"
		  placeholder="审核状态"
		  clearable
		  class="filter-item"
		>
		  <el-option label="新闻" :value="'新闻'" />
		  <el-option label="公告" :value="'公告'" />
		  <el-option label="动态" :value="'动态'" />
		</el-select>
		
		<el-button-group class="filter-item">
		  <el-button
		    size="small"
		    type="primary"
		    icon="el-icon-search"
		    @click="search"
		  >
		    搜索
		  </el-button>
		  <el-button
		    size="small"
		    type="primary"
		    icon="el-icon-refresh"
		    @click="refresh"
		  >
		    重置
		  </el-button>
		  <el-button
		    size="small"
		    type="primary"
		    icon="el-icon-plus"
		    @click="add"
		  >
		    新增
		  </el-button>
		</el-button-group>
      
    </div>
	

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
        label="姓名"
		width="100"
        align="center"
      >
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
	  <el-table-column
	    label="昵称"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.id }}
	    </template>
	  </el-table-column>
	  
      <el-table-column
        label="性别"
        align="center"
		width="50"
      >
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
	  
	  <el-table-column
	    label="年龄"
	    align="center"
		width="50"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="电话"
	    align="center"
		width="120"
		>
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="技师状态"
	    align="center"
		width="150"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="审核状态"
	    align="center"
		width="120"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="接单量"
	    align="center"
		width="120"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="登录账号"
	    align="center"
		width="120"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="密码"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="从业(年)"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="申请时间"
	    align="center"
		width="150"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="店铺ID"
	    align="center"
		width="100"
	  >
	    <template slot-scope="scope">
	      {{ scope.row.title }}
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="身份证"
	    align="center"
		width="200"
	  >
	    <template slot-scope="scope">
	      <img :src="scope.row.icon" height="80">
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="健康证"
	    align="center"
	  		width="200"
	  >
	    <template slot-scope="scope">
	      <img :src="scope.row.icon" height="80">
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    label="按摩证"
	    align="center"
	  		width="200"
	  >
	    <template slot-scope="scope">
	      <img :src="scope.row.icon" height="80">
	    </template>
	  </el-table-column>
	  
	  <el-table-column
	    fixed="right"
	    label="操作"
	    width="250"
	    align="center"
	  >
	    <template slot-scope="scope">
	      <el-button-group>
			  <el-button
			    type="success"
			    icon="el-icon-check"
			    size="mini"
			    @click="edit(scope)"
			  >
			    审核
			  </el-button>
	        <el-button
	          type="primary"
	          icon="el-icon-edit"
	          size="mini"
	          @click="edit(scope)"
	        >
	          修改
	        </el-button>
	        <el-button
	          type="danger"
	          icon="el-icon-delete"
	          size="mini"
	          @click="del(scope)"
	        >
	          删除
	        </el-button>
	      </el-button-group>
	    </template>
	  </el-table-column>
      
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
