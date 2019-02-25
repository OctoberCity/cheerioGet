// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from  './store'
import ElementUI from 'element-ui' 
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import vuex from 'vuex'
import Socketio from 'vue-socket.io'
import socketioclient from 'socket.io-client';



Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(vuex)
Vue.use(Socketio, socketioclient('http://127.0.0.1:7001/'));

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
