import Vue from 'vue'
import Router from 'vue-router'
import Positions from '../page/position/position.vue'
import Company from '../page/company/company.vue'
import Search from '../page/search/search.vue'
import Message from '../page/message/message.vue'
import MyTable from '../page/mytable/mytable.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/position'
    },
    {
      path: '/position',
      component: Positions
    },
    {
      path: '/company',
      component: Company
    },
    {
      path: '/message',
      component: Message
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/mytable',
      component: MyTable
    }

  ]
})
