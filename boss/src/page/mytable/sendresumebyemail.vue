<template>
        <div class="warp">
          <div class="header">
            <go-back class="goback"></go-back>
            <p class="friendName">管理附件简历</p>
      
          </div> 
        </div>
      </template>
      <script>
        import {
          get
        } from 'api'
        import GoBack from 'base/routerback.vue'
        import VDialog from 'base/dialog.vue'
      
      
        export default {
          data() {
            return {
      
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
      
      </style>
      