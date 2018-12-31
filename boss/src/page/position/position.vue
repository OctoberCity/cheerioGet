<template>
  <div>
    <pos-header></pos-header>
    <ul class="nav-list">
      <li @click="showDialog('recommend')">推荐<i class="el-icon-caret-bottom"></i></li>
      <li @click="showDialog('city')">城市<i class="el-icon-caret-bottom"></i></li>
      <li @click="showDialog('company')">公司<i class="el-icon-caret-bottom"></i></li>
      <li @click="showDialog('require')">要求<i class="el-icon-caret-bottom"></i></li>
    </ul>
    <position-list :positionList="positionData"></position-list>
    <anv-bottom></anv-bottom>
    <v-dialog :dialogVisible="thatDialog.recommend" @on-close='closedDialog'></v-dialog>
  </div>
</template>
<script>
// 组件
import PosHeader from '../../components/posheader/posheader.vue'
import AnvBottom from '../../components/anvbottom/anvbottom.vue'
import VDialog from '../../base/dialog.vue'
import PositionList from '../../base/position.vue'
// 请求
// import {get} from '../../api/z-axios.js'
// import selectSeaParam from '../../components/selectSeaParam/selectSeaParam.vue'

export default {
  data () {
    return {
      positionData: [
        {
          name: 'node.js服务端工程师',
          slary: '6k-10k',
          company: '十月科技',
          finance: 'A轮',
          require: {
            city: '杭州 西湖区  西西',
            experience: '1-3年',
            diploma: '本科',
            hrImg: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2377755175,144822395&fm=26&gp=0.jpg',
            hrname: '谢超'
          }
        }
      ],
      userInfo: {
        nowCity: 'city'
      },
      thatDialog: {
        recommend: false,
        city: false,
        company: false,
        require: false
      }
    }
  },
  create () {
    this._getPosition()
  },
  components: {
    PosHeader,
    AnvBottom,
    VDialog,
    PositionList
  },
  methods: {
    _getPosition () {
    // 获得定位数据
    //    get().then((data) => {
    //     this.positionData = data
    //   })
    },
    showDialog (isThatDia) {
      this.thatDialog[isThatDia] = true
    },
    closedDialog () {
      for (let index in this.thatDialog) {
        this.thatDialog[index] = false
      }
    }
  }
}

</script>
<style scoped>
     .nav-list{
         width:100%;
         height: 40px;
         line-height: 30px;
         padding:10px 0;
     }
    .nav-list li {
       display: inline-block;
       width:24%;
       text-align: center;
    }
    .nav-list li:hover {
      color:#53cac4;
    }
</style>
