<!--聊天消息聊天框-->
<template>
  <div class="messageitem-warp">
    <div v-if="message && message.type === 1 " class="sendEmil">
      <p>对方请你发送一份简历至对方邮箱<span class="clickSendEmail" @click="sendEmil(message.to)">点击发送</span></p>
    </div>
    <div v-if="message &&  message.type === 2">
      <div class="avatar" if="me && message" :class="[message.from === me.userId ? 'avatar2' : '' ]">
        <img :src="message.avatar" width="40px" height="40px" />
      </div>
      <div class="part-message" if="me && message" :class="[message.from === me.userId ? 'part-message2' : '' ]">
        <p class="message-content">{{message.content}}</p>
      </div>
    </div>
    <div v-if="message &&  message.type === 3"  class="sendEmil">
      <h2>{{message.positionId}} 请问贵公司还招聘这个职业吗？暂时用positionId代替</h2>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      message: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data() {
      return {
        me: null
      };
    },
    methods: {
      _getmeInfo() {
        this.me = this.$store.state.userInfo;
      }
    },
    created() {
      this._getmeInfo();
    }
  }

</script>
<style scoped>
  .messageitem-warp {
    font-size: 0px;
    padding: 15px 10px;
    clear: both;
  }

  .avatar {
    float: left;
    width: 40px;
    margin: 0 10px;
    vertical-align: top;

  }

  .avatar img {
    border-radius: 20px;
  }

  .part-message {
    float: left;
    font-size: 12px;
    color: #999;
    width: 200px;
  }

  /**消息所有者不同样式不同**/
  .avatar2 {
    float: right;
  }

  .part-message2 {
    float: right;
  }


  .part-message .message-content {
    border-radius: 5px;
    border: 1px skyblue solid;
  }

  .sendEmil {
    text-align: center;
    color: #999;
    font-size: 12px;
  }

  .clickSendEmail {
    color: darkturquoise;
  }

</style>
