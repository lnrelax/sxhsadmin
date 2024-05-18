<template>
    <div class="app-container">
        <template>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="itemAdd()">新增</el-button>
        </template>
  
      <el-table v-loading="loading" :data="orderList" height="580">
        <el-table-column label="项目名称" prop="serviceName"  align="center" />
        <el-table-column label="价格(RMB)" prop="serviceMoney" :show-overflow-tooltip="true"  align="center" />
        <el-table-column label="服务时长(分钟)" prop="serviceTime" :show-overflow-tooltip="true"  align="center" />
        <el-table-column label="项目描述" prop="serviceDetail"  align="center"/>
        <el-table-column label="创建时间" prop="insertTime"  align="center"/>
        <el-table-column label="图片"   align="center">
          <template slot-scope="scope">
            <el-image 
              style="width: 180px; height: 50px"
              :src="scope.row.serviceImage" 
              :preview-src-list="[scope.row.serviceImage]">
            </el-image>
          </template>
        </el-table-column>

        <el-table-column label="操作"  align="center" fixed="right">
            <template slot-scope="scope" >
                <el-button type="primary" size="mini" @click="itemEdit(scope.row)">修改</el-button>
                <el-button type="danger" size="mini" @click="itemDel(scope.row)">删除</el-button>
            </template>
      </el-table-column>
        

      </el-table>

      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisibleAdd">
        <el-form :model="form">
          <el-form-item label="项目名称" :label-width="formLabelWidth" prop="serviceName" :rules="[{ required: true, message: '项目名称不能为空'},]">
            <el-input v-model="form.serviceName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth" prop="serviceMoney" :rules="[{ required: true, message: '价格不能为空'},]">
            <el-input v-model="form.serviceMoney" autocomplete="off" type="number">
              <template slot="prepend">￥</template>
              <template slot="append">RMB</template>
            </el-input>
          </el-form-item>
          <el-form-item label="服务时长" :label-width="formLabelWidth" prop="serviceTime" :rules="[{ required: true, message: '服务时长不能为空'},]">
            <el-input v-model="form.serviceTime" autocomplete="off" type="number">
              <template slot="append">分钟</template>
            </el-input>
          </el-form-item>
          <el-form-item label="选择人数" :label-width="formLabelWidth" prop="selected" :rules="[{ required: true, message: '选择人数不能为空'},]">
            <el-input v-model="form.selected" autocomplete="off" type="number"></el-input>
          </el-form-item>
          <el-form-item label="项目描述" :label-width="formLabelWidth" prop="serviceDetail" :rules="[{ required: true, message: '项目描述不能为空'},]">
            <el-input v-model="form.serviceDetail" autocomplete="off" type="textarea"></el-input>
          </el-form-item>
          <!-- 图片切换地址 -->
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

          <el-form-item label="详情图片" :label-width="formLabelWidth" >
            <el-upload
              class="avatar-uploader"
              action="https://www.sxhsit.com/sxhstest/image/imageUpload"
              :show-file-list="false"
              :on-success="imageInfoSuccess"
              :before-upload="imageInfoUpload">
              <img v-if="form.serviceImageDetail" :src="form.serviceImageDetail" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
          <el-button type="primary" @click="itemCommit()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>是否确认删除</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="itemCommit()">确 定</el-button>
        </span>
      </el-dialog>

    </div>
  </template>
  
  <script>
  import { itemList , itemServiceEdit } from '@/api/order'
  
  export default {
    data() {
      return {
        // 遮罩层
        loading: true,
        // 总条数
        total: 0,
        // 查询参数
        Params: {
        },
        status:0,
        // 日期范围
        dateRange: [],
        orderList:[],
        dialogVisible:false,
        dialogFormVisibleAdd:false,
        form: {
          type:-1,
          serviceName: '',
          serviceMoney:'',
          serviceTime:'',
          selected:'',
          serviceDetail:'',
          serviceImage: '',
          serviceImageDetail: '',
          serviceId:'',
        },
        formLabelWidth: '120px',
        dialogTitle:''

      };
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.loading = true;
        itemList().then(response => {
          this.loading = false
          console.log(response)
          this.orderList = response.data
          // this.total = response.data.total
        })
      },

      imageSuccess(res, file) {
        this.form.serviceImage = res;
      },
      imageInfoSuccess(res, file) {
        this.form.serviceImageDetail = res;
      },

      imageUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
      imageInfoUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      },
      itemAdd(){
        this.dialogTitle = '新增服务项目'
        this.dialogFormVisibleAdd = true
        this.form = {
          type:1,
          serviceName: '',
          serviceMoney:'',
          serviceTime:'',
          selected:'',
          serviceDetail:'',
          serviceImage: '',
          serviceImageDetail: '',
        }
      },
      itemCommit(){
        let param = new FormData();
        param.append('type', this.form.type);
        param.append('serviceName', this.form.serviceName);
        param.append('serviceMoney', parseFloat(this.form.serviceMoney));
        param.append('serviceTime', this.form.serviceTime);
        param.append('selected', this.form.selected);
        param.append('serviceDetail', this.form.serviceDetail);
        param.append('serviceImage', this.form.serviceImage);
        param.append('serviceImageDetail', this.form.serviceImageDetail);
        if(this.form.type != 1){
          param.append('serviceId', this.form.serviceId);
        }
        itemServiceEdit(param).then(response => {
          this.loading = false
          console.log(response)
          this.dialogFormVisibleAdd = false
          this.dialogVisible = false
          this.form = {
            type:1,
            serviceName: '',
            serviceMoney:'',
            serviceTime:'',
            selected:'',
            serviceDetail:'',
            serviceImage: '',
            serviceImageDetail: '',
          }
          this.getList()
        })
      },
      itemEdit(row){
        this.dialogTitle = '编辑服务项目'
        this.dialogFormVisibleAdd = true
        this.form = {
          type:3,
          serviceName: row.serviceName,
          serviceMoney: row.serviceMoney,
          serviceTime: row.serviceTime,
          selected: row.selected,
          serviceDetail: row.serviceDetail,
          serviceImage: row.serviceImage,
          serviceImageDetail: row.ext1,
          serviceId: row.serviceId
        }
      },
      itemDel(row){
        this.form = {
          type:2,
          serviceName: row.serviceName,
          serviceMoney: row.serviceMoney,
          serviceTime: row.serviceTime,
          selected: row.selected,
          serviceDetail: row.serviceDetail,
          serviceImage: row.serviceImage,
          serviceImageDetail: row.ext1,
          serviceId: row.serviceId
        }
        this.dialogVisible = true
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