<template>
  <div class="selectlist-warp">
    <div class="province">
      <p v-for="(item,index) in cityDataList" :key="index" @click="selectPronvince = index" :class=" selectPronvince === index ? 'active':'' ">{{item.name}}</p>
    </div>
    <div class="city">
      <p v-for="(item,index) in cityDataList[selectPronvince].subLevelModelList" :key="index" @click="selectCity = index"
        :class=" selectCity === index ? 'active':'' ">{{item.name}}</p>
    </div>
  </div>
</template>
<script>
  import {
    get
  } from 'api'
  // 列表选择，不是下拉选择
  export default {
    data() {
      return {
        selectPronvince: 0,
        selectCity: 0,
        cityDataList:[]
      }
    },
    mounted() {
      this.$nextTick(() => {
        get('/cheerioParam/getDBParam', {
          param: 'city'
        }).then((res) => {
          this.cityDataList = res.data;
        });
      });

    }
  }

</script>
<style scoped>
  .selectlist-warp {
    height: 300px;
    line-height: 30px;
    display: flex;
  }

  .province {
    flex: 1;
    overflow: auto;
    text-align: center;
  }

  .province p.active {
    background-color: #ddd;
    color: #53cac4;
  }

  .city {
    flex: 2;
    overflow: auto;
    background-color: #ddd;
    font-size: 0px;
    padding: 10px 10px 0px 10px;
  }

  .city p {
    display: inline-block;
    font-size: 14px;
    width: 45%;
    border: #333 solid 1px;
    border-radius: 5px;
    text-align: center;
    margin-right: 10px;
    background-color: #fff;
    color: #333;
  }

  .city p.active {
    color: #53cac4;
  }

</style>
