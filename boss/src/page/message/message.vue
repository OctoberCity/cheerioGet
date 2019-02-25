<template>
  <div>
    <div class="messages-select">
      <div class="button">
        <span >聊天<i  v-if="contactList" :class="[ contactList.some((item)=>{return item.haveNewNews}) === true? 'cred' : 'cnone' ]" ></i></span><span>互动</span>
      </div>
    </div>
    <div class="contact-warp">
      <div class="attention">
        <p>联系人</p>
        <p>极速处理</p>
      </div>
      <div class="contact-list" v-if="contactList">
        <div  class="contact-item "  v-for="(item , index) in contactList" :key="index" @click="startChat(item.id,item.name,item.avator)" >
          <div class="left"><img :src="item.avatar" width="40px" height="40px"> </div>
          <div class="right">
              <p class="message-name">{{item.name}}<i  :class="[item.haveNewNews === true ? 'cred' : 'cnone' ]" ></i></p>
              <p class="message" >{{item.lastNews}}</p>
          </div>
        </div>
      </div>
    </div>
    <anv-bottom></anv-bottom>
  </div>
</template>
<script>
  import AnvBottom from 'components/anvbottom/anvbottom.vue'
  import {
    get
  } from 'api'
  export default {
    data() {
      return {
        contactList:''
      }
    },
    components: {
      AnvBottom
    },
    created() {
      this._getContactList()
    },
    methods: {
      _getContactList() {
        get('/message/getContactList').then((res) => {
          this.contactList = res.data;
        });
      },
      startChat(friendId,friendName,avatar){
         this.$router.push({path:'/chat',query:{friendId,friendName,avatar}})
      }
    }
  }

</script>
<style scoped>
  .messages-select {
    background-color: #53cac4;
    padding: 10px;
  }

  .messages-select .button {
    margin: 0 auto;
    width: 100px;
    border: 1px solid #fff;
    border-radius: 5px;
  }

  .messages-select span {
    display: inline-block;
    height: 20px;
    width: 50px;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    background-color: #fff;
    color: #53cac4;
  }

  .messages-select span:last-child {
    background-color: #53cac4;
    color: #fff;
  }
.attention p {
  float:left;
  margin:5px 0 10px 10px;
}
.attention p:last-child {
  float:right;
  margin:5px 10px 10px 0;
  border-radius: 3px;
  border: 1px #999 solid;
  font-size: 10px;
  text-align: center;
  width:60px;
  height:15px;
}
.contact-list{
    clear: both;
}
.contact-item{
  height: 40px;
  padding:10px;
  vertical-align: top;
}
.contact-item .left{
  display: inline-block;
  width:40px;
  height: 40px; 
}
  .left img{
  border-radius: 30px;
}
.contact-item .right{
  display: inline-block;
  margin-left:5px;
  font-size: 15px;
}
.message{
    width:300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding:5px 0px;
    color:#999;
    font-size: 10px;
    
}
.cred{
  display:inline-block;
  background:#f00;
  border-radius:50%;
  width:5px;
  height:5px; 
  vertical-align: top;
  margin-left:5px;
}
.cnone{
    display:none;
}
</style>
