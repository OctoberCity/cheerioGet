<template>
  <div class="selPar-warp">
    <!-- <multi-choose v-for="(item ,index ) in paramAllData" :chooseDataDet="item"></multi-choose> -->
  </div>
</template>
<script>
import MultiChoose from '../../base/multichoose.vue'
export default {
  props: {
    // paramAllData: {
    //   type: Array,
    //   default: []
    // }
  },
  data () {
    return {}
  },
  components: {
    MultiChoose
  }
}

</script>
<style scoped>

</style>
