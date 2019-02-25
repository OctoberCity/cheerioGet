<template>
  <div class="chat-warp"> 
    <div class="header">
      <go-back class="goback"></go-back>
      <p class="friendName" v-if="friend">{{friend.friendName}}</p>
    </div>
    <div class="messageList">
       <message-item  v-if="chatList" v-for="(item,index) in chatList" :message="item" :friend="friend" :key="index"></message-item>      
    </div>
    <div class="write-input">
      <el-input type="textarea" class="input" :autosize="{ minRows: 2, maxRows: 4}"  v-model="chatContent" placeholder="请输入内容" >
      </el-input>
      <p class="send-botton" @click="sendMessage()"><i class="el-icon-message"></i></p>
    </div>
  </div>
</template>
<script>
  import {
    get
  } from 'api'
  import GoBack from 'base/routerback.vue'
  import MessageItem from 'base/messageitem.vue'
  export default {
    data() {
      return {
        chatList: [],
        friend: null, 
        textarea3: '',
        me:null,
        chatContent:null,
        chatType:null,// 聊天类型
        positionId:null // 工作id
      }
    },
    components: {
      GoBack,
      MessageItem
    },
    created() {
      this._getChatMessageList(),
      this._getmeInfo(),
      this.isFirstFriend()
    },
    destroyed(){ 
      this.disconnect()  
    },
    methods: {
      _getChatMessageList() {
        const {
          friendId,
          friendName,
          avatar,
          positionId
        } = this.$route.query;
        this.positionId=positionId;
        this.friend = {
          friendId,
          friendName,
          avatar
        }; 
        get('/message/getChatList', {
          friendId
        }).then((res) => { 
          this.chatList = res.data;
        });
      },
      _getmeInfo(){
          console.log("获取自己在socket连接之前");
        this.me = this.$store.state.userInfo;  
       },
      sendMessage(messageType){ 
           const messageObj={from:this.me.userId,to:this.friend.friendId,chatContent:this.chatContent,positionId:this.positionId,type:messageType,roleType:this.me.roleType};
           this.$socket.emit("sendMessage",messageObj,(res)=>{
                if(res.code!==1001)
                return null;//elui信息提醒 
                this.chatList.push(messageObj);
           })
       },
       isFirstFriend(){
           //判断是否是第一次与人通话 
           const  obj ={from:this.me.userId,to:this.friend.friendId};
           this.$socket.emit('isFirstFriend',obj,(res)=>{ 
                if(res.code === 1001)
                return  this.$socket.emit("initUserLink",obj,(res)=>{
                    if(res.code === 1001){ 
                        this.sendMessage(3);
                    }
                });
           });
       },
       disconnect(){
           // 断开连接
           this.$socket.emit('disconnectUser',this.me.userId);
       }

    },
    sockets:{ 
        connect: function () {
            console.log('socket connected');
            //发射自己已经加入
            this.$socket.emit('join',this.me.userId);
            // 监听消息
            this.$socket.on('sendMessageBySocketId',(messageObj)=>{ 
                  this.chatList.push(messageObj);
            });
        },
        customEmit: function (data) {
            console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        }
    }
  }

</script>
<style scoped>
  .header {
    background-color: #53cac4;
    padding: 10px 10px;
    color: #fff;
    position: fixed;
    top:0px;
    left:0px;
    width: 100%;

  }

  .goback {
    float: left;
  }

  .friendName {
    text-align: center;
    margin-right:16px;
  }
  .messageList{
      margin-bottom: 200px;
      margin-top: 40px;
      overflow-y:scroll;
      height: 100%;
  }

  .write-input {
    width: 100%;
    background-color: #ddd;
    position: fixed;
    bottom: 0;
    font-size: 0
  }

  .write-input .input {
    display: inline-block;
    width: 80%;
  }

  .write-input .send-botton {
    display: inline-block;
    width: 20%;
    font-size: 40px;
    text-align: center;
    height: 100%;
  }

</style>
