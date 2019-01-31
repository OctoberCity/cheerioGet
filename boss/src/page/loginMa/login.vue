<template>
    <div class="login-warp">
        <el-input v-model="username" placeholder="请输入账户"></el-input>
        <el-input v-model="password" placeholder="请输入密码"></el-input>
        <el-button type="primary" @click="loginsubmit()">登录</el-button>
    </div>
  </template>
  <script> 
  import {post} from "api"  
  export default {
      data(){
          return{
             username:'',
             password:'',
          }
      },
      created () { 
      },
     methods:{
        loginsubmit(){
            const param={username:this.username,password:this.username}
           post('/user/login',param).then((res)=>{
             sessionStorage.setItem('isLogin',res.data);  
             sessionStorage.setItem('token',res.data.token);  

             this.$store.commit('changeuserInfo', res.data.userInfo);
             this.$store.commit('changetoken', res.data.token);
             this.$router.push({path:'/'}); 
           });
        }   
     }
  }
  
  </script>
  <style scoped>
  .login-warp{
      background-color:#53cac4;
  }
  </style>
  