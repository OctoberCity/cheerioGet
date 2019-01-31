<template>
  <div>
    <div class="pos-hearder">
      <pos-header></pos-header>
      <ul class="nav-list">
        <li @click="showDialog('recommend')">推荐<i class="el-icon-caret-bottom"></i></li>
        <li @click="showDialog('city')">城市<i class="el-icon-caret-bottom"></i></li>
        <li @click="showDialog('company')">公司<i class="el-icon-caret-bottom"></i></li>
        <li @click="showDialog('require')">要求<i class="el-icon-caret-bottom"></i></li>
      </ul>
    </div>
    <position-list :positionData="positionData"></position-list>
    <anv-bottom></anv-bottom>
    <v-dialog :dialogVisible="thatDialog.recommend" @on-close='closedDialog'>
      <select-list @on-change='selectLsit(e)' :selectList="selectListData"></select-list>
    </v-dialog>
    <v-dialog :dialogVisible="thatDialog.require" @on-close='closedDialog'>
      <selectSea-param :paramAllData="param.paramRequire"></selectSea-param>
    </v-dialog>
    <v-dialog :dialogVisible="thatDialog.company" @on-close='closedDialog'>
      <selectSea-param :paramAllData="param.paramCompany"></selectSea-param>
    </v-dialog>
    <v-dialog :dialogVisible="thatDialog.city" @on-close='closedDialog'>
      <select-city :cityDataList="cityDataList"></select-city>
    </v-dialog>
  </div>
</template>
<script>
  // 组件
  import PosHeader from 'components/posheader/posheader.vue'
  import AnvBottom from 'components/anvbottom/anvbottom.vue'
  import VDialog from 'base/dialog.vue'
  import PositionList from 'base/positionitem.vue'
  // 请求
  import {
    get
  } from 'api'
  import SelectSeaParam from 'components/selectseaparam/selectseaparam.vue'
  import SelectCity from 'components/selectseaparam/selectcity.vue'
  import SelectList from 'components/selectseaparam/selectlist.vue'


  export default {
    data() {
      return {
        nowParam:{city:101210100,position:100114},
        cityDataList: [],
        selectListData: [{
            code: 0,
            name: '最新'
          },
          {
            code: 1,
            name: '最热'
          }
        ],
        positionData: [],
        userInfo: {
          nowCity: 'city'
        },
        thatDialog: {
          recommend: false,
          city: false,
          company: false,
          require: false
        },
        param: {
          paramCompany: [],
          paramRequire: []
        },
      }
    },
    components: {
      PosHeader,
      AnvBottom,
      VDialog,
      PositionList,
      SelectSeaParam,
      SelectCity,
      SelectList
    },
    created() {
      this._getparamRequire()
      this._getpositionData()
    },
    methods: {
      showDialog(isThatDia) {
        this.thatDialog[isThatDia] = true
      },
      closedDialog() {
        for (let index in this.thatDialog) {
          this.thatDialog[index] = false
        }
      },
      _getpositionData() { 
        get('/position/searchPosition',this.nowParam).then((res) => {
            console.log("hjwhjwhjwhjwhwjhwjh");
          this.positionData = res.data;
        });
      },
      _getparamRequire() {
        get('/cheerioParam/searchParams').then((res) => {
          // 公司的参数
          this.param.paramCompany.push(res.data.financing);
          this.param.paramCompany.push(res.data.scale);
          // 要求
          this.param.paramRequire.push(res.data.education);
          this.param.paramRequire.push(res.data.experience);
          this.param.paramRequire.push(res.data.slary);
          this._getparamOldIndustry();
        });
      },
      _getparamOldIndustry() {
        get('/cheerioParam/getDBParam', {
          param: 'oldindustry'
        }).then((res) => {
          const oldindustry = {
            paramType: '行业',
            selOnlyOne: false,
            data: []
          };
          res.data.forEach(item => {
            oldindustry.data.push(item.name);
          });
          this.param.paramCompany.push(oldindustry);
        });
      }
    }
  }

</script>
<style scoped>
  .nav-list {
    width: 100%;
    height: 40px;
    line-height: 30px;
    padding: 10px 0;
  }

  .nav-list li {
    display: inline-block;
    width: 24%;
    text-align: center;
  }

  .nav-list li:hover {
    color: #53cac4;
  }

</style>
