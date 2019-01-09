<!--展示职位信息单元-->
<template>
  <div class="company-warp">
    <router-link to="/company-detail" tag="div" class="anv-item">
      <ul class="company-list">
        <li class="company-item" v-for="(item , index) in companyData" :key="index">
          <div class="item-header">
            <div class="avatar">
              <img :src="item.avatar" />
            </div>
            <div class="company-area">
              <p class="company-name">{{item.companyName}}</p>
              <p><span v-for="(value,key) in item.area">{{value}}</span></p>
            </div>
          </div>
          <div class="company-info">
            <span   v-for="(value,key) in item.companyinfo">{{value}}</span>
          </div>
          <div class="position-num">
            <p>热招：<span>{{searchParam}}</span>等<span>{{item.num}}</span>职位<i class="el-icon-arrow-right"></i></p>
          </div>
        </li>
      </ul>
    </router-link>
  </div>
</template>
<script>
  export default {
    props: {
      companyData: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        searchParam: 'node.js'
      }
    },
  }

</script>
<style scoped>
  .company-warp { 
    background-color: #ddd;
    padding-bottom:40px;
  }

  .company-item {
    background-color: #fff;
    margin-bottom: 10px;
    padding:10px 15px 0px 20px;
  }

  .item-header {
    font-size: 0px;
    margin-bottom: 10px;
  }

  .avatar {
    display: inline;
  }

  .avatar img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .company-area {
    display: inline-block;
    font-size: 12px; 
    margin-left:40px; 
  }
  .company-area  .company-name{
      font-size:16px;
      margin-bottom: 10px
  }
  .company-area  span{ 
      margin-right:10px;
  }

 .company-info  span{ 
      margin-right:10px;
      padding:0 5px;
      font-size: 12px;
      background-color: #ddd;
      border-radius: 4px;
  }
  .position-num{
      border-top: #ddd solid 1px;
      padding:15px 0px;
      margin-top:10px;
      color:10px;
  }
  .position-num span{  
      color:#53cac4
  }
  .position-num i{  
     position:absolute;
     right:15px;
  }
    
</style>
