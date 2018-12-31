<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
   </div>
</template>

<script>
export default {

}

</script>

<style>
  html {
    margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font-weight: normal;
	vertical-align: baseline;
	font-family: "微软雅黑";
	font-size: 14px;
	color:#444;
    width: 100%;
  }
  ul,body,div,p,img,span,td,tr{
      padding:0px;
      margin:0px;
  }
  li{
      padding:0px;
      margin: 0px;
      list-style-type: none;
  }

</style>
