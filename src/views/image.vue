<template>
    <div class="app-container">
        <template>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="imageAdd()">新增</el-button>
        </template>
  
      <el-table v-loading="loading" :data="orderList" height="580">
        <el-table-column label="图片"  align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 180px; height: 50px"
              :src="scope.row.imageUrl" 
              :preview-src-list="[scope.row.imageUrl]">
            </el-image>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180"  align="center" fixed="right">
            <template slot-scope="scope" >
                <!-- <el-button type="primary" size="mini" >修改</el-button> -->
                <el-button type="danger" size="mini" @click="imageDelPop(scope.row.bannerId)">删除</el-button>
            </template>
      </el-table-column>
        

      </el-table>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>是否确认删除</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="imageDelCommit()">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="新增轮播图" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">

          <el-form-item label="图片" :label-width="formLabelWidth" >
            <el-upload
              class="avatar-uploader"
              action="https://www.sxhsit.com/sxhstest/image/imageUpload"
              :show-file-list="false"
              :on-success="imageSuccess"
              :before-upload="imageUpload">
              <img v-if="form.serviceImage" :src="form.serviceImage" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="imageAddCommit()">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </template>
  
  <script>
  import { imageList , bannerAdd , imageDel } from '@/api/order'
  
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
        dialogVisible:false,
        dialogFormVisibleAdd:false,
        form:{
          serviceImage:"",
        },
        formLabelWidth: '120px',
        bannerId:-1,
      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        imageList().then(response => {
          this.loading = false
          console.log(response)
          this.orderList = response.data
          // this.total = response.data.total
        })
      },
      imageAdd(){
        this.dialogFormVisibleAdd = true
      },
      imageSuccess(res, file) {
        // console.log(res);
        // this.form.serviceImage = URL.createObjectURL(file.raw);
        this.form.serviceImage = res;
      },
      imageUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },

      imageAddCommit(){
        bannerAdd({bannerImage:this.form.serviceImage}).then(response => {
          this.dialogFormVisibleAdd = false
          this.form.serviceImage = ""
          this.getList();
        })
      },

      imageDelPop(id){
        this.dialogVisible = true
        this.bannerId = id
      },
      imageDelCommit(){
        imageDel({bannerId:this.bannerId}).then(response => {
          this.dialogVisible = false
          this.getList();
        })
      },

    }
  };
  </script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>