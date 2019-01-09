<template>
    <div class="selectlist-warp">
        <p v-for="(item, index) in selectList" @click="selectItem(index)" :key="index" :class="selectitem === index ? 'active' : ''" >{{item.name}}</p>
    </div>
</template>
<script>
    // 列表选择，不是下拉选择
    export default {
        props:{
           selectList:{
               type:Array
           }
        },
        data(){
            return {
                selectitem:0
            }
        },
        methods:{
            selectItem(index){
                this.selectitem = index;
                //选择完毕之后，发送数据并且调用查询语句
                this.$emit("on-change",this.selectItem);
            }  
        }
    }
</script>
<style scoped>
    .selectlist-warp{
        padding:10px; 
        color:black; 
    }

     .selectlist-warp p { 
         padding:5px 10px 9px 15px;
         font-size:15px; 
     }
     .selectlist-warp p.active  {
         color:#53cac4; 
     }
    .selectlist-warp p.active:after {
         color:#53cac4;
         content:"√";
         padding-left:5px;
     }

</style>