import Vue from 'Vue';
import Vuex from 'vuex'
import mutations from './mutation.js'



Vue.use(Vuex);
const state = {
  userInfo: JSON.parse(sessionStorage.getItem("userinfo")) || '',
  token: sessionStorage.getItem("token") || '',
 }
export default new Vuex.Store({
  state,
  mutations
})
