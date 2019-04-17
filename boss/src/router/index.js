import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Positions from 'page/position/position.vue'
import Company from 'page/company/company.vue'
import Search from 'page/search/search.vue'
import Message from 'page/message/message.vue'
import Chat from 'page/message/chat.vue'
import MyTable from 'page/mytable/mytable.vue'
import Login from 'page/loginMa/login.vue'
import ResumeManage from 'page/mytable/resumemanage.vue'
import ResumeRename from 'page/mytable/resumerename.vue' 
import SendResumeByEmail from 'page/mytable/sendresumebyemail.vue'



Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/position'
    },
    {
      path: '/position',
      component: Positions,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/company',
      component: Company,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/message',
      component: Message,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/chat',
      component: Chat,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mytable',
      component: MyTable,
      meta: {
        requiresAuth: true
      }
    },
    { //微简历
      path: '/littleresume',
      component: MyTable,
      meta: {
        requiresAuth: true
      }
    },
    { //简历管理
      path: '/resumeMg',
      component: ResumeManage,
      meta: {
        requiresAuth: true
      }
    },
    {//简历重名名
      path: '/resumeMg/resumerename',
      name:'resumerename',
      component: ResumeRename,
      meta: {
        requiresAuth: true
      }
    },
    {//邮箱发送简历
      path: '/resumeMg/sendResumeByEmail',
      component: SendResumeByEmail,
      name:'sendresumer',
      meta: {
        requiresAuth: true
      }
    },
    { // 登录页面
      path: '/login',
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    }

  ]
})



router.beforeEach((to, from, next) => {
  // 判断下一个路由是不是需要校验如果需要，校验否则
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (sessionStorage.getItem('isLogin')) {
      //获取token的值从新复制给vuex
      const token = sessionStorage.getItem('token');
      store.commit('changetoken', token);
      next()
    } else {
      next({
        path: '/login',
        name: "login"
      })
    }
  } else {
    next()
  }
  







})
export default router;
