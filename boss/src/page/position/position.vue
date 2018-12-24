<template>
  <div>
    <pos-header></pos-header>
    <ul></ul>
    <position-list :positionList="positionData"></position-list>
    <anv-bottom></anv-bottom>
  </div>
</template>
<script>
// 组件
import PosHeader from '../../components/posheader/posheader.vue'
import AnvBottom from '../../components/anvbottom/anvbottom.vue'
import AnvBottom from '../../components/anvbottom/anvbottom.vue'
import SelectItem from ''
// 请求
import axios from '../../api/z-axios.js'

export default {
  data () {
    return {
      positionData: []
    }
  },
  create () {
    this._getPosition()
  },
  components: {
    PosHeader,
    AnvBottom,
    PositionList
  },
  methods: {
    _getPosition () {
      axios().then((data) => {
        this.positionData = data
      })
    }
  }
}

</script>
<style scoped></style>
