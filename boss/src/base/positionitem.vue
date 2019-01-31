<!--展示职位信息单元-->
<template>
  <div class="position-warp">
    <router-link to="/position-detail" tag="div" class="anv-item">
      <ul class="position-list">
        <li class="position-item" v-for="(item , index) in positionData">
          <div>
            <span class="position-name">{{item.name}}</span>
            <span class="position-slary">{{item.slary}}</span>
          </div>
          <div>
            <span class="position-company">{{item.companyname}}</span>
            <span class="position-finance">{{item.financing}}</span>
          </div>
          <div class="position-reuiqre">
            <span v-for="(value,key) in item.requires">{{value}}</span>
          </div>
          <div class="position-hr">
            <img :src="item.hravatar" /><span>{{item.hrname}}</span>
          </div>

        </li>
      </ul>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    positionData: {
      type: Array
    }
  },
  data () {
    return {}
  },
  created () {
    this.test()
  },
  methods: {
    test: function () {
      console.log(this.positionData)
    }
  }
}

</script>
<style scoped>
  .position-item {
    padding: 0 20px 20px 20px;
  }

  .position-item span {
    margin-left: 5px;
  }

  .position-name {
    font-size: 20px;
    font-weight: bold;
    display: inline-block;
    width: 80%;
  }

  .position-slary {
    display: inline-block;
    color: #53cac4;
    font-weight: bold;
  }

  .position-company {
    font-size: 15px;
    line-height: 30px;
  }

  .position-reuiqre {
    line-height: 40px;
    color: #002223;
  }

  .position-reuiqre span {
    margin-right: 10px;
    background-color: #E8E3E2;
    border-radius: 3px;
  }

  .position-hr {
    line-height: 40px;
  }

  .position-hr img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    line-height: 40px;
    border-radius: 15px;
  }

  .position-hr span {
    width: 30px;
    margin-left:10px;
  }

</style>
