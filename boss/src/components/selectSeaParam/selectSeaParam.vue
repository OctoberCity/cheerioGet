<template>
  <div class="selPar-warp">
    <multi-choose v-for="(item ,index ) in paramAllData"  :key="index" :chooseDataDet="item"  :chooseType="index" @on-change="getParam"></multi-choose>
  </div>
</template>
<script>
import MultiChoose from 'base/multichoose.vue'
export default {
  props: {
    paramAllData: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      allPram: []
    }
  },
  created () {
  },
  components: {
    MultiChoose
  },
  methods: {
    getParam (e) {
      this.allPram.push(e)
    }
  }
}

</script>
<style scoped>

</style>
