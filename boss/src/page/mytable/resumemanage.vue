<template>
    <div class="resume-warp">
        <ul class="resumelist">
            <li v-for="(item,index) in resumeData" :key="index" class="resumelist">
                <img src="#">
                <div class="resumeInfo">
                    <p>{{item.filename}}</p>
                    <p>{{item.size}}&nbsp;&nbsp;&nbsp;{{item.uploadtime}}</p>
                </div>
            </li>
        </ul>
        <div>上传新附件简历</div>
    </div>
</template>
<script>
 import {get} from 'api'
 export default{
  data(){
      return {
        resumeData:'',
      }
  },
  created(){
     this._getResumeList();
  },
  methods:{
    _getResumeList(){
        get('/resume/getresumelist').then((res)=>{
               this.resumeData= res.data;
        });
    }
  }
}
</script>
<style></style>
