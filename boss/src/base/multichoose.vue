<!-- 这是多选按钮组件，在选择的时候要用,允许选一个多个 -->
<tempalte>
  <div class="multichoose-warp">
    <div class="choose-title">{{chooseDataDet.title}}</div>
    <div class="choose-title">
      <ul>
        <li v-for="(item,index) in chooseDataDet.arrayChoose">{{item,name}}</li>
      </ul>
    </div>
  </div>
</tempalte>
<script>
export default {
  props: {
    chooseDataDet: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      selectAllData: []
    }
  },
  methods: {
    add
  }
}

</script>
<style></style>
