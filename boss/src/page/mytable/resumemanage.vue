<template>
  <div class="resume-warp">
    <div class="header">
      <go-back class="goback"></go-back>
      <p class="friendName">管理附件简历</p>

    </div>
    <div class="resumeBody">
      <ul class="resumelist">
        <li v-for="(item,index) in resumeData" :key="index" class="resumeitem">
          <div class="resumeInfo">
            <p>{{item.resumeName}}<span class="resume_config" @click="doConfigResume(item.id)">...</span></p>
            <p>{{item.resumeSize}}&nbsp;&nbsp;&nbsp;{{item.uploadTime}}上传</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="upload">
      <el-upload class="upload-demo" action='#'  multiple  :limit="3" :before-upload="beforeUpload">
        <el-button size="small" type="primary" class="upload_btn">点击上传</el-button>
      </el-upload>
    </div>
    <v-dialog :dialogVisible="isDialogShow" @on-close='closedDialog' class="dialog">
      <div class="resume_config_list" @click="toRename()">重命名</div>
      <div class="resume_config_list">发送邮件</div>
      <div class="resume_config_list" style="color: red" @click="">删除</div>
    </v-dialog>
  </div>
</template>
<script>
  import {
    get,
    post
  } from 'api'
  import GoBack from 'base/routerback.vue'
  import VDialog from 'base/dialog.vue'


  export default {
    data() {
      return {
        resumeData: [],
        nowClickResume: '',
        isDialogShow: false
      }
    },
    components: {
      GoBack,
      VDialog
    },
    created() {
      this.getResumeList();
    },
    methods: {
      getResumeList() {
        get('/resume/resumeList').then((res) => {
          this.resumeData = res.data;
        });
      },
      doConfigResume(id) {
        this.nowClickResume = id;
        this.showDialog();
      },
      showDialog() {
        this.isDialogShow = true;
      },
      closedDialog() {
        this.isDialogShow = false;
      },

      toRename(resumeId) {
        this.closedDialog();
        this.$router.push({
          path: '/resumeMg/resumerename',
          query: {
            resumeId: resumeId
          }
        })
      },
      toRename(resumeId) {
        this.closedDialog();
        this.$router.push({
          path: '/resumeMg/resumerename',
          query: {
            resumeId: resumeId
          }
        })
      },
      beforeUpload(file) {
        let formdata = new FormData();
        formdata.append('file', file); //传文件
        post('/resume/uploadResume', formdata).then(function (res) {
          if(res.code === 1001){ 
            this.$message("上传成功");
          }
        })
      }

    }
  }

</script>
<style scoped>
  .header {
    background-color: #53cac4;
    padding: 10px 10px;
    color: #fff;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .friendName {
    text-align: center;
    margin-right: 16px;
    text-align: center;
  }

  .goback {
    float: left;
  }

  .resumeBody {
    padding: 50px 0 40px 0;
    border-top: #999 1px solid;

  }

  .resumeitem {
    padding: 10px;
    border-bottom: #999 1px solid;
  }

  .resumeInfo {
    padding-left: 50px;
    background: url('https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=560310599,3006867296&fm=26&gp=0.jpg') no-repeat;
    background-size: 40px;
    color: #999;
    font-size: 13px;
    line-height: 20px;
  }

  .resume_config {
    float: right;
    font-weight: bold;
  }

  .upload {
    position: fixed;
    bottom: 0px;
    width: 100%;
    text-align: center;
  }

  .upload_btn {
    background-color: #53cac4;
  }

  /*弹出层操作*/
  .resume_config_list {
    line-height: 30px;
    font-size: 13px;
    text-align: center;
    border-top: 1px solid #999;
  }

  /* .resume_config_list :last-child{
     color:red;
 } */

</style>
