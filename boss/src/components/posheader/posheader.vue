<template>
  <div class="posheader-warp">
    <div class="user-select">{{selectItem}}</div>
    <div class="user-wang-list">
      <ul>
        <li v-for="(item,index) in userWant" @click="selectWangWork(item)">{{item.position}}</li>
      </ul>
    </div>
    <router-link to="{name:'wantlist',params:{'name':'San'}}" tag="div" class="want-list router-c">
      <span class="el-icon-plus"></span>
    </router-link>
    <router-link to="/search" tag="div" class="search router-c">
        <span class="el-icon-search"></span>
    </router-link>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectItem: 'hjjk', // 选择的列表
      userWant: [{
        position: 'node222.js',
        citycode: '1001',
        city: '北京'
      },
      {
        position: 'nodsse.js',
        citycode: '1001',
        city: '北京'
      }] // 用户期望的数据列表
    }
  },
  created () {

  },
  methods: {
    selectWangWork (item) {
      this.selectItem = item.position
      this.$emit('want-change', item)
    }
  }
}

</script>
<style scoped>
    .posheader-warp{
        height:40px;
        line-height: 40px;
        background-color: #53cac4;
        width:100%;
        color: #fff;
     }
    .user-select{
        display: inline;
        margin:0 5px;
    }
    .user-wang-list{
        display: inline;
    }
    .user-wang-list ul {
        display: inline;
        padding:0px;
        margin:0px;
    }
    .user-wang-list li {
        display: inline;
        list-style-type:none;
        font-size: 12px;
        margin-left:3px;
    }
    .router-c{
        float:right;
        padding-right: 5px;
    }
    .router-c span{
        padding :0 5px;
    }

</style>
