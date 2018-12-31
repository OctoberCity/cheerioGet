<!--展示职位信息单元-->
<template>
  <div class="position-warp">
    <ul class="position-list">
      <li class="position-item" v-for="(item , index) in positionData">
        <div><span class="position-name">{{item.name}}</span><span class="position-slary">{{item.slary}}</span></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    positionData: {
      type: Array, 
    }
  },
  data () {},
  create(){
   this.test()
  },
  methods:{
      test:function(){
       console.log(positionData);
      }
  }
}

</script>
<style scoped></style>
