<template>
    <div>
      <div class="pos-hearder">
        <pos-header></pos-header>
        <ul class="nav-list"> 
          <li @click="showDialog('city')">城市<i class="el-icon-caret-bottom"></i></li> 
        </ul>
      </div>
      <position-list   v-loading="loading"  :positionData="positionData"></position-list> 
      <v-dialog :dialogVisible="thatDialog.city" @on-close='closedDialog'>
        <select-city :cityDataList="cityDataList"></select-city>
      </v-dialog>
    </div>
  </template>
  <script>
    // 组件
    import PosHeader from 'components/posheader/posheader.vue'
    import VDialog from 'base/dialog.vue'
     // 请求
    import {
      get
    } from 'api' 
    import SelectCity from 'components/selectseaparam/selectcity.vue'  
    export default {
      data() {
        return {
          nowCity:{city:101210100,position:100114},
          cityDataList: [],   
          thatDialog:false, 
          loading:true
        }
      },
      components: {
        PosHeader,
        AnvBottom,
        VDialog, 
        SelectCity, 
      },
      created() {
        this._getparamRequire()
        this._getpositionData()
      },
      methods: {
        showDialog(isThatDia) {
          this.thatDialog = true
        },
        closedDialog() { 
            this.thatDialog  = false 
        },
        _getpositionData() { 
          get('/position/searchPosition',this.nowParam).then((res) => {
             this.positionData = res.data;
             this.loading=false;
          });
        },
    
        
      }
    }
  
  </script>
  <style scoped>
    .nav-list {
      width: 100%;
      height: 40px;
      line-height: 30px;
      padding: 10px 0;
    }
  
    .nav-list li {
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  
    .nav-list li:hover {
      color: #53cac4;
    }
  
  </style>
  