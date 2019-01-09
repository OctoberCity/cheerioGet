<template>
  <div>
    <comp-header></comp-header>
    <div class="select-param">
      <p @click="showDialog('scale')">规模<i class="el-icon-caret-bottom"></i></p>
      <p @click="showDialog('financing')">融资<i class="el-icon-caret-bottom"></i></p>
      <p @click="showDialog('industry')">行业<i class="el-icon-caret-bottom"></i></p> 
    </div>
    <company-item :companyData="companyData"></company-item>
    <anv-bottom></anv-bottom>
    <v-dialog :dialogVisible="isShowDialog" @on-close='closedDialog'>
      <selectSea-param :paramAllData="showDialogData"></selectSea-param>
    </v-dialog>

  </div>
</template>
<script>
  import VDialog from 'base/dialog.vue'
  import AnvBottom from 'components/anvbottom/anvbottom.vue'
  import CompHeader from 'components/posheader/compheader.vue'
  import SelectSeaParam from 'components/selectseaparam/selectseaparam.vue'

  import CompanyItem from 'base/companyitem.vue'

  export default {
    data() {
      return {
        isShowDialog: false,
        showDialogData: [],
        companyData: [{
          avatar: 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d3668cc1dc88d43ff0a996f44525b526/359b033b5bb5c9ea3aab2857df39b6003af3b32d.jpg',
          num: '22',
          companyName: '局之源',
          area: {
            city: '杭州',
            block: '下城区',
            second: '九里'
          },
          companyinfo: {
            scale: '100-499人',
            financing: '不要融资',
            industry: '教育'
          },
        },{
          avatar: 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d3668cc1dc88d43ff0a996f44525b526/359b033b5bb5c9ea3aab2857df39b6003af3b32d.jpg',
          num: '22',
          companyName: '局之源',
          area: {
            city: '杭州',
            block: '下城区',
            second: '九里'
          },
          companyinfo: {
            scale: '100-499人',
            financing: '不要融资',
            industry: '教育'
          },
        },{
          avatar: 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d3668cc1dc88d43ff0a996f44525b526/359b033b5bb5c9ea3aab2857df39b6003af3b32d.jpg',
          num: '22',
          companyName: '局之源',
          area: {
            city: '杭州',
            block: '下城区',
            second: '九里'
          },
          companyinfo: {
            scale: '100-499人',
            financing: '不要融资',
            industry: '教育'
          },
        },{
          avatar: 'https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=d3668cc1dc88d43ff0a996f44525b526/359b033b5bb5c9ea3aab2857df39b6003af3b32d.jpg',
          num: '22',
          companyName: '局之源',
          area: {
            city: '杭州',
            block: '下城区',
            second: '九里'
          },
          companyinfo: {
            scale: '100-499人',
            financing: '不要融资',
            industry: '教育'
          },
        }],
        paramCompany: {
          financing: {
            paramType: '融资阶段',
            selOnlyOne: false,
            data: ['未融资', '天使轮', 'A轮', 'B轮', 'C轮', 'D轮以及以上', '已上市', '不需要融资']
          },
          scale: {
            paramType: '人员规模',
            selOnlyOne: false,
            data: ['0-20', '20-99人', '100-499人', '500-999人', '1000-9999人', '10000人以上']
          },
          industry: {
            paramType: '行业',
            selOnlyOne: false,
            data: []
          }
        }
      }
    },
    components: {
      AnvBottom,
      CompanyItem,
      CompHeader,
      VDialog,
      SelectSeaParam
    },
    methods: {
      showDialog(dialog) {
        this.showDialogData.push(this.paramCompany[dialog]);
        this.isShowDialog = true;
      },
      closedDialog() {
        this.showDialogData = [];
        this.isShowDialog = false;
      }
    }
  }

</script>
<style scoped>
  .select-param {
    display: flex;
    justify-content: space-around;
    height: 40px;
    line-height: 40px;
    width: 100%;
    border-bottom: #ddd 1px solid;
  }

  .select-param p {
    width: 33.33333%;
    text-align: center;
    justify-content: center;

  }

</style>
