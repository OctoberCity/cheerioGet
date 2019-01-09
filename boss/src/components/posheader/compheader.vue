<template>
        <div class="compheader-warp">
          <router-link to="/search" tag="div" class="search router-c "> 
            <span class="el-icon-search"></span>
          </router-link>
          <p >公司</p>
        </div>
      </template>
      <script>
      export default {
        data () {
          return { 
          }
        } 
      }
      
      </script>
      <style scoped>
          .compheader-warp{
              height:40px;
              line-height: 40px;
              background-color: #53cac4;
              width:100%;
              text-align: center;
              color: #fff;
           }  
          .router-c{
              float:right;
              padding-right: 5px;
              
          }
          .router-c span{
              padding :0 5px;
              color: #fff;
          } 
      
      </style>
      