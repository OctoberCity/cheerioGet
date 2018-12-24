<template>
  <div class="anv-bottom">
    <router-link to="/position" tag="div" class="anv-item">
      <span class="anv-link">职位</span>
    </router-link>
    <router-link to="/company" tag="div" class="anv-item">
      <span class="anv-link">公司</span>
    </router-link>
    <router-link to="/message" tag="div" class="anv-item">
      <span class="anv-link">消息</span>
    </router-link>
    <router-link to="/mytable" tag="div" class="anv-item">
      <span class="anv-link">我的</span>
    </router-link>
  </div>
</template>
<script>
export default{

}
</script>
<style scoped>
    .anv-bottom{
        display:flex;
        height:44px;
        line-height: 44px;
        color:black;
        background-color: #53cac4;
        position: fixed;
        bottom:0px;
        width:100%;
        /* z-index: 100; */
    }
    .anv-item{
        text-align: center;
        flex:1;
        clear: both;
    }
    .anv-link{

    }
    .router-link-active {
        background-color: #f2f2f2;
        color:#53cac4;
    }
</style>
