<!--路由回退-->
<template>
    <div  class="back-warp">
    <p class="el-icon-arrow-left goback" @click="goback()"></p>
    </div>
  </template>
  <script>
  export default {
     data(){
         return {};
     },
     methods:{
          goback() { 
            if (window.history.length <= 1) {
                this.$router.push({path:'/'})
                return false
            } else {
                this.$router.go(-1);
            }   
        }
         } 
  }
  
  </script>
  <style scoped>

  </style>
  