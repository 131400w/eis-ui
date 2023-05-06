import { scUser } from "../controllers/sc-user";

let user = new scUser();

export default {
    routes: [
      {
        method: 'POST',
        path: '/weixin/weixinLogin',
        handler: user.weixinLogin,
      },
      {
        method: 'POST',
        path: '/weixin/weixinLoginRucess',
        handler: user.weixinLoginRucess,
      },
    ],
  };