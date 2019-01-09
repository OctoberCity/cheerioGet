<!-- 这是多选按钮组件，在选择的时候要用,允许选一个多个 -->
<template>
  <div class="multichoose-warp">
    <div class="choose-title">{{chooseDataDet.paramType}}<span v-if="chooseDataDet.selOnlyOne">单选</span></div>
    <div class="choose-item">
      <span class="mainParam" @click="resetParam()" :class="selectparam.length == 1? 'active' : ''">全选</span>
      <span class="mainParam" v-for="(item,index) in chooseDataDet.data" @click="selectParams(item,index+1)" :class="selectparam.indexOf(index+1)>0? 'active' :'' ">{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    chooseDataDet: {
      type: Object,
      default () {
        return {}
      }
    },
    chooseType: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      selectparam: [0]
    }
  },
  methods: {
    selectParams (item, index) {
      if (this.chooseDataDet.selOnlyOne) {
        // 如果是单选，那么只替换
        if (this.selectparam.length == 1) {
          this.selectparam.push(index)
        } else {
          this.selectparam.push(index)
          this.selectparam.splice(1, 1)
        }
      } else {
        if (this.selectparam.indexOf(index) >= 0) {
          this.selectparam = this.selectparam.filter((item) => {
            return item !== index
          })
        } else {
          this.selectparam.push(index)
        }
      }
      // 返回给组件所选的类型
      this.$emit('on-change', {
        type: this.chooseType,
        selectParam: this.selectparam
      })
    },
    resetParam () {
      this.selectparam = [0]
    }
  }
}

</script>
<style scoped>
  .multichoose-warp {
    padding: 10px 5px 20px 5px;
  }

  .choose-title {
    font-size: 10px;
    margin-bottom: 5px;
  }

  .mainParam {
    display: inline-block;
    font-size: 13px;
    border: 1px solid #444;
    padding: 7px 5px;
    border-radius: 3px;
    margin: 0 3px 5px 0;
  }

  .mainParam.active {
    background-color: #53cac4;
    color: #fff;
  }

</style>
