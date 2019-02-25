export default {
  //修改用户信息
  changeuserInfo(state, userinfo) {
    console.log("vuex设置用户信息");
    sessionStorage.setItem('userinfo', JSON.stringify(userinfo));
    state.userInfo = userinfo;

  },
  changetoken(state, token) {
    sessionStorage.setItem('token', token);
    state.token = token;
  }
}
