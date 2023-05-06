export default {
  routes: [
    {
      method: 'POST',
      path: '/weixin/weixinLogin',
      handler: 'application.weixinLogin',
    },
    {
      method: 'POST',
      path: '/user/userRegister',
      handler: 'application.userRegister',
    },
    {
      method: 'POST',
      path: '/user/updateQiYeZhuanYongHu',
      handler: 'application.updateQiYeZhuanYongHu',
    },
    {
      method: 'POST',
      path: '/user/addUserFactory',
      handler: 'application.addUserFactory',
    },
    {
      method: 'POST',
      path: '/user/updateYongHuZhuanQiYe',
      handler: 'application.updateYongHuZhuanQiYe',
    },
  ],
};