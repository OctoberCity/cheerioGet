<template>
  <div class="login-warp"> 
    <div >
    <el-input v-model="username" placeholder="请输入账户"></el-input>
    <el-input v-model="password" placeholder="请输入密码"></el-input>
    <el-button type="primary" @click="loginsubmit(1)">找工作</el-button>
    <el-button type="primary" @click="loginsubmit(2)">找人</el-button>
    </div> 
  </div>
</template>
<script>
  import {
    post
  } from "api"
  export default {
    data() {
      return {
        username: '',
        password: '',
      }
    },
    created() {},
    methods: {
      loginsubmit(roleType) {
        const param = {
          username: this.username,
          password: this.username
        }
        post('/user/login', param).then((res) => {
          sessionStorage.setItem('isLogin', res.data);
          sessionStorage.setItem('roleType',roleType);
          // 设置角色1找工作， 2 发布工作
         const userInfo = res.data.userInfo;
         eval("userInfo.roleType="+roleType);  
          this.$store.commit('changeuserInfo', res.data.userInfo);
          this.$store.commit('changetoken', res.data.token);
          this.$router.push({
            path: '/'
          });
        });
      }
    }
  }

</script>
<style scoped>
  .login-warp {
    display: inline-block;
    width:100%; 
    background-color: #53cac4;
  }

</style>
