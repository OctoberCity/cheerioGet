<!-- 这是多选按钮组件，在选择的时候要用,允许选一个多个 -->
<tempalte>
    <div class="multichoose-warp">
        <div class="choose-title">{{title}}</div>
        <div class="choose-title">
            <ul>
                <li v-for="(item,index) in arrayChoose">{{item,name}}</li>
            </ul>
        </div>
    </div>
</tempalte>
<script>
export default{
  props: {
    chooseNum: {
      type: Number,
      default: 0// 默认全选
    },
    chooseTitle: {
      type: string,
      default: 'OctoberCity'
    },
    arrayChoose: {// 数据
      type: array,
      default: []
    }
  },
  data () {
    return {}
  },
  methods: {

  }
}
</script>
<style></style>
