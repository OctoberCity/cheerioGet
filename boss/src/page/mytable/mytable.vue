<template>
  <div>
    <div class="mytable-header">
      <img src="https://img2.bosszhipin.com/mcs/useravatar/20160113/57dc0326803b6622500241303be401408c7dd922ad47494fc02c388e12c00eac_s.jpg?x-oss-process=image/resize,w_40,limit_0" />
      <div>
        <p class="username">{{user.name}}</p>
        <p>我的个人主页&nbsp;&nbsp;&nbsp;&nbsp;></p>
      </div>
    </div>
    <div class="mytable-anv">
      <router-link :to="item.path" tag="div" v-for="(item ,index) in mytableInfoData " :key="index">
        <p class="num">{{item.num}}</p>
        <p>{{item.name}}</p>
      </router-link>
    </div>
    <div class="findPosHelper">
      <div class="left">
        <p>求职助手</p>
        <p>多种助手祝你提升求职成功率</p>
      </div>
      <div class="right">
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="mytable-list">
      <router-link to="/littleresume" tag="div" class="anv-item">
        <div class="left">
          <p><i class="el-icon-tickets"></i><span class="title">我的微简历</span></p>
        </div>
        <div class="right">
          <p><i class="el-icon-arrow-right"></i></p>
        </div>
      </router-link>
      <router-link to="/resumeMg" tag="div" class="anv-item un-line">
        <div class="left">
          <p><i class="el-icon-tickets"></i><span class="title">附件简历</span></p>
        </div>
        <div class="right">
          <p><span class="title-info">已经上传了{{resumrNumber}}</span><i class="el-icon-arrow-right"></i></p>
        </div>
      </router-link>
      <router-link to="/wantResumeList" tag="div" class="anv-item ">
        <div class="left">
          <p><i class="el-icon-tickets"></i><span class="title">管理求职意向</span></p>
        </div>
        <div class="right">
          <p><span class="title-info">{{wantResume}}</span><i class="el-icon-arrow-right"></i></p>
        </div>
      </router-link>
      <router-link to="/wantResumeList" tag="div" class="anv-item un-line">
        <div class="left">
          <p><i class="el-icon-tickets"></i><span class="title">提升简历排名</span></p>
        </div>
        <div class="right">
          <p><span class="title-info"></span><i class="el-icon-arrow-right"></i></p>
        </div>
      </router-link>
      <router-link to="/persinfo" tag="div" class="anv-item  ">
        <div class="left">
          <p><i class="el-icon-tickets"></i><span class="title">隐私设置</span></p>
        </div>
        <div class="right">
          <p><span class="title-info"></span><i class="el-icon-arrow-right"></i></p>
        </div>
      </router-link>
    </div>
    <anv-bottom></anv-bottom>
  </div>
</template>
<script>
  import AnvBottom from 'components/anvbottom/anvbottom.vue'
  export default {
    data() {
      return {
        resumrNumber: 3,
        user: {
          name: '胡小佳'
        },
        mytableInfoData: [{
          name: '沟通过',
          num: 1,
          path:'dd'
        }, {
          name: '面试过',
          num: 2,
          path:'dd'

        }, {
          name: '已投递',
          num: 1,
          path:'dd'

        }, {
          name: '感兴趣',
          num: 1,
          path:'dd'
        }]
      }
    },
    components: {
      AnvBottom
    }
  }

</script>
<style scoped>
  .mytable-header {
    padding: 80px 10px 10px 10px;
    background-color: #53cac4;
  }

  .mytable-header p {
    padding: 5px 0 5px 10px;
    color: #fff;
  }

  .mytable-header img {
    float: right;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    border: 2px solid #74e5cf;
    margin-right: 30px;
  }

  .mytable-header .username {
    font-weight: bold;
    font-size: 25px;
    padding-bottom: 10px;
  }

  .anv-item {
    height: 40px;
    line-height: 40px;
    clear: both;
  }

  .mytable-anv {
    display: flex;
    width: 100%;
    font-size: 12px;
    text-align: center;
  }

  .mytable-anv div {
    flex: 1;
    padding: 5px 0;
  }

  .mytable-anv .num {
    font-size: 15px;
    font-weight: bold;
    padding: 5px 0 10px 0;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .findPosHelper {
    padding: 10px 10px 20px 20px;
  }

  .findPosHelper p {
    font-size: 14px;
    color: darkgrey
  }

  .findPosHelper p:first-child {
    font-size: 18px;
    margin-bottom: 15px;
    color: #000;
  }

  .mytable-list {
    clear: both;
  }

  .anv-item .left i {
    margin: 0 10px 0 20px;
    font-size: 20px;

  }

  .anv-item .right i {
    margin: 0 10px 0 20px;
  }

  .anv-item .title-info {
    font-size: 14px;
    color: darkgrey
  }

  .un-line {
    border-bottom: 1px solid #ddd;
  }

</style>
