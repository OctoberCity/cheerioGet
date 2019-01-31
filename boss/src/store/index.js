import Vue from 'Vue';
import Vuex from 'vuex'
import mutations from './mutation.js'

 

Vue.use(Vuex);
const state = {
  userInfo:'',  
  token: ''} 
export default new Vuex.Store({
  state,
  mutations
})
