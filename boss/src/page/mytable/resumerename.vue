<template>
  <div class="warp">
    <div class="header">
      <go-back class="goback"></go-back>
      <p class="friendName">重命名</p>
    </div>
    <div class="renamebody">
      <el-input v-model="input" class="input-text" placeholder="请输入内容" size='mini'></el-input>
      <el-button size="small" type="primary" class="upload_btn" @click="updateResumeName()">确定重命名</el-button>
    </div>

  </div>
</template>
<script>
  import {
    get,
    post
  } from 'api'
  import GoBack from 'base/routerback.vue'


  export default {
    data() {
      return {
        input: ''
      }
    },
    components: {
      GoBack
    },
    methods: {
      updateResumeName() {
        const params = {
          resumeId: this.$route.query,
          newResumeName: this.input
        };
        console.log(params);
        post('/resume/rename', params).then((res) => {
          this.$message("修改成功");
        });
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

  .renamebody {
    margin-top: 60px;
    text-align: center;
  }

  .input-text {
    width: 80%;
    margin-bottom: 20px;
  }

</style>
