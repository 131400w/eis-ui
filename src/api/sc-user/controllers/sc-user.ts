import { BaseServer } from "../../../myframe/server/baseServer";
import { staticVariable,wxStatic } from "../../../util/config";
import { KoaContext } from "../../../util/controlDef";
import { HttpUtil, PostOption } from "../../../util/httpUtil";


export class scUser extends BaseServer {

    //调用微信登录
    async weixinLogin(ctx:KoaContext){
        try{
            //重定向
            ctx.response.redirect(staticVariable.wxUrl);
        }catch(e){
            console.error("系统错误---------" + e);
            return 0;
        }
    }

    //微信授权成功后回调方法
    async weixinLoginRucess(ctx){
        console.log("**********************" + JSON.stringify(ctx.request.body));
        try{
            //获取参数
            let code = ctx.request.body.code;
            let state = ctx.request.body.state;
            //通过code获取access_token
            let param = {
                appid: wxStatic.appid,
                secret: wxStatic.secret,
                code: code,
                grant_type: wxStatic.access_token_grant_type,
            }
            let httpUtil = new HttpUtil();
            let option = new PostOption(staticVariable.wxAccessToken, param);
            httpUtil.postJson(option,async (res:any) => {
                //获取用户微信信息
                let params = {
                    access_token: res.access_token,
                    openid: res.openid
                }
                let httpUtil = new HttpUtil();
                let option = new PostOption(staticVariable.wxUser, params);
                httpUtil.postJson(option,async (result:any) => {
                    ctx.body = result;
                },(res:any) => {
                    console.log("登录失败、请稍后再试" + JSON.stringify(res));
                });
            },(res:any) => {
                console.log("操作失败、请稍后再试" + JSON.stringify(res));
            });
        }catch(e){
            console.error("系统错误---------" + e);
            return 0;
        }
    }

}
