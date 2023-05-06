/**
 * application controller
 */

const { ApplicationError } = require("@strapi/utils").errors;
import { factories } from '@strapi/strapi';
import { staticAttribute, staticVariable, wxStatic } from "../../../util/config";
import { HttpUtil, PostOption } from "../../../util/httpUtil";
import { staticMsg } from '../../../util/msgConfig';
const util = require("util");
// 引入sha1
const sha1 = require("sha1");


//jwt令牌  登录
const utils = require('@strapi/utils');
const { sanitize } = utils;
const sanitizeUser = (user, ctx) => {
    const auth = wxStatic.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');
    return sanitize.contentAPI.output(user, userSchema, { auth });
};

async function jwtLogin(ctx, strapi, result) {
    try {
        //增加日志
        await strapi.service('api::ym-log.ym-log').addLog(staticMsg.LOG_WEIXIN_LOGIN_NAME, staticMsg.LOG_WEIXIN_LOGIN_TITLE_1, JSON.stringify(ctx), '');
        let userList = await strapi.entityService.findMany('plugin::users-permissions.user', {
            filters: {
                openId: ctx.openid
            },
        });
        let user = userList[0];
        //判断用户是否存在
        if (userList.length == 0) {
            var random = await suijishu(ctx, strapi);
            console.log("************-----" + random);
            //查询角色
            let roleList = await strapi.entityService.findMany('plugin::users-permissions.role', {
                filters: {
                    name: staticAttribute.ROLE_PERSON
                },
            });
            if (roleList.length == 0) {
                ctx.body = {
                    data: staticMsg.RESULT_202
                };
                return;
            }
            //新增用户
            user = await strapi.entityService.create('plugin::users-permissions.user', {
                data: {
                    username: "ID" + random,
                    email: random + "@2023.com",
                    provider: "local",
                    password: null,
                    resetPasswordToken: null,
                    confirmationToken: null,
                    confirmed: null,
                    blocked: null,
                    phone: null,
                    openId: ctx.openid,
                    wxName: ctx.nickname,
                    wxImage: ctx.headimgurl,
                    type: staticAttribute.USER_TYPE_B,
                    role: {
                        id: roleList[0].id
                    }
                },
            });
            //新增个人信息
            await strapi.entityService.create('api::jb-person.jb-person', {
                data: {
                    sex: "NAN",
                    users_permissions_user: {
                        id: user.id
                    }
                },
            });
            //增加日志
            await strapi.service('api::ym-log.ym-log').addLog(staticMsg.LOG_WEIXIN_LOGIN_NAME, staticMsg.LOG_WEIXIN_LOGIN_TITLE_2, JSON.stringify(user), '');
        }
        return result.send({
            jwt: strapi.plugin('users-permissions').service('jwt').issue({ id: user.id }),
            user: await sanitizeUser(user, ctx),
        });
    } catch (e) {
        console.log(e);
        throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
    }
}

async function suijishu(ctx, strapi) {
    var random = Math.round(Math.random() * 1000000000 + 1000000000);
    let user = await strapi.query('plugin::users-permissions.user').findMany({
        filters: {
            username: "ID" + random,
        },
    });
    //判断用户是否存在
    if (user.length != 0 && user[0].username != undefined && user[0].username != "") {
        return await suijishu(ctx, strapi);
    } else {
        return random;
    }
}

export default factories.createCoreController('api::application.application', ({ strapi }) => ({

    // Method 2: Wrapping a core action (leaves core logic in place)
    async find(ctx) {
        // some custom logic here
        ctx.query = { ...ctx.query, local: 'en' };

        // Calling the default core action
        const { data, meta } = await super.find(ctx);

        // some more custom logic
        meta.date = Date.now();

        return { data, meta };
    },

    // Method 3: Replacing a core action
    async findOne(ctx) {
        const { id } = ctx.params;
        const { query } = ctx;

        const entity = await strapi.service('api::application.application').findOne(id, query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },

    //调用微信登录
    async weixinLogin(ctx) {
        try {
            //重定向
            // ctx.response.redirect(staticVariable.wxUrl);
            //获取参数
            let code = ctx.request.body.code;
            let state = ctx.request.body.state;
            if (code != undefined && code != null && code != "") {
                await this.weixinLoginRucess(ctx);
            } else {
                ctx.body = { url: staticVariable.wxUrl };
            }
        } catch (e) {
            // strapi.log.error(e);
            // strapi.log.error(util.inspect(e));
            // console.error("系统错误---------" + e);
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    },

    //微信授权成功后回调方法
    async weixinLoginRucess(ctx) {
        try {
            //获取参数
            let code = ctx.request.body.code;
            //通过code获取access_token
            let param = {
                appid: wxStatic.appid,
                secret: wxStatic.secret,
                code: code,
                grant_type: wxStatic.access_token_grant_type,
            }
            //增加日志
            await strapi.service('api::ym-log.ym-log').addLog(staticMsg.LOG_WEIXIN_LOGIN_NAME, staticMsg.LOG_WEIXIN_TOKEN_1, param, '');
            let test = staticVariable.wxAccessToken + "?appid=" + wxStatic.appid + "&secret=" + wxStatic.secret + "&code=" + code + "&grant_type=" + wxStatic.access_token_grant_type;
            let httpUtil = new HttpUtil();
            let option = new PostOption(staticVariable.wxAccessToken, param);
            let res = await httpUtil.getAsync(option);
            res = eval(JSON.parse(res));
            //增加日志
            await strapi.service('api::ym-log.ym-log').addLog(staticMsg.LOG_WEIXIN_LOGIN_NAME, staticMsg.LOG_WEIXIN_TOKEN_2, JSON.stringify(res), '');
            //获取用户微信信息
            let params = {
                access_token: res.access_token,
                openid: res.openid
            }
            let option1 = new PostOption(staticVariable.wxUser, params);
            let result = await httpUtil.getAsync(option1);
            result = eval(JSON.parse(result));
            //增加日志
            await strapi.service('api::ym-log.ym-log').addLog(staticMsg.LOG_WEIXIN_LOGIN_NAME, staticMsg.LOG_WEIXIN_USER, JSON.stringify(result), '');
            await jwtLogin(result, strapi, ctx);
        } catch (e) {
            // strapi.log.error(e);
            // strapi.log.error(util.inspect(e));
            // console.error("系统错误---------" + e);
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    },


    async weixinTest(ctx) {
        try {
            let req = ctx.request;
            let res = ctx.response;
            // GET请求携带参数是个参数signature,timestamp,nonce,echostr
            const { signature, timestamp, nonce, echostr } = req.query;
            console.log("user", req)
            // 服务器的token
            const token = "xinglu";

            // 将token、timestamp、nonce三个参数进行字典序排序 
            const arrSort = [token, timestamp, nonce];
            arrSort.sort();

            // 将三个参数字符串拼接成一个字符串进行sha1加密,npm install --save sha1
            const str = arrSort.join("");
            const shaStr = sha1(str);

            // 获得加密后的字符串可与signature对比，验证标识该请求来源于微信服务器
            if (shaStr === signature) {
                // 确认此次GET请求来自微信服务器，请原样返回echostr参数内容，则接入生效
                res.send(echostr);
            } else {
                //否则接入失败。
                res.send("no");
            }
        } catch (e) {
            // strapi.log.error(e);
            // strapi.log.error(util.inspect(e));
            // console.error("系统错误---------" + e);
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    },

    //注册用户
    async userRegister(ctx) {
        try {
            //获取参数
            let param = ctx.request.body.data;
            //判断用户名是否存在
            let userList = await strapi.entityService.findMany('plugin::users-permissions.user', {
                filters: {
                    username: param.username
                },
            });
            if (userList.length != 0) {
                ctx.body = {
                    data: staticMsg.RESULT_202,
                    msg: staticMsg.APPLICATION_USER_MSG_202
                };
                return;
            }
            let roleName = staticAttribute.ROLE_PERSON;
            //判断是否是企业
            if (param.type == staticAttribute.USER_TYPE_A) {
                roleName = staticAttribute.ROLE_ENTERPRISE;
            }
            //查询角色
            let roleList = await strapi.entityService.findMany('plugin::users-permissions.role', {
                filters: {
                    name: roleName
                },
            });
            if (roleList.length == 0) {
                ctx.body = {
                    data: staticMsg.RESULT_204,
                    msg: staticMsg.APPLICATION_USER_MSG_204
                };
                return;
            }
            ctx.request.body.data.role = {
                id: roleList[0].id
            }
            // ctx.request.body.data.type = staticAttribute.USER_TYPE_B;
            ctx.request.body.data.provider = staticAttribute.USER_PROVIDER;
            //新增用户
            let user = await strapi.entityService.create('plugin::users-permissions.user', ctx.request.body);
            //新增个人信息
            await strapi.entityService.create('api::jb-person.jb-person', {
                data: {
                    sex: "NAN",
                    users_permissions_user: {
                        id: user.id
                    }
                },
            });
            ctx.body = {
                data: user,
                msg: staticMsg.RESULT_MSG_SUCCESS
            };
            console.log(JSON.stringify(ctx.body));
        } catch (e) {
            console.log(e);
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    },

    /**
     * 新增账号
     */
    async addUserFactory(ctx) {
        //获取参数
        let param = ctx.request.body.data;
        //获取登录用户
        const user = ctx.state.user;
        //判断类型是否为企业
        if (user.type != staticMsg.APPLICATION_USER_TYPE_A) {
            throw new ApplicationError(staticMsg.APPLICATION_USER_MSG_206);
        }
        //查询企业
        const entries = await strapi.entityService.findMany('api::ym-factory.ym-factory', {
            filters: {
                users_permissions_users: {
                    id: user.id
                }
            },
        });
        if (entries.length == 0) {
            throw new ApplicationError(staticMsg.APPLICATION_USER_MSG_208);
        }
        //判断用户名是否存在
        let userList = await strapi.entityService.findMany('plugin::users-permissions.user', {
            filters: {
                username: param.username
            },
        });
        if (userList.length != 0) {
            throw new ApplicationError(staticMsg.APPLICATION_USER_MSG_212);
        }
        //查询角色
        let roleList = await strapi.entityService.findMany('plugin::users-permissions.role', {
            filters: {
                name: staticAttribute.ROLE_ENTERPRISE
            },
        });
        if (roleList.length == 0) {
            throw new ApplicationError(staticMsg.ROLE_MSG_202);
        }
        ctx.request.body.data.role = {
            id: roleList[0].id
        }
        ctx.request.body.data.ym_factory = {
            id: entries[0].id
        }
        ctx.request.body.data.type = staticMsg.APPLICATION_USER_TYPE_A;
        ctx.request.body.data.provider = staticAttribute.USER_PROVIDER;
        //新增用户
        let resultUser = await strapi.entityService.create('plugin::users-permissions.user', ctx.request.body);
        //新增个人信息
        await strapi.entityService.create('api::jb-person.jb-person', {
            data: {
                sex: "NAN",
                users_permissions_user: {
                    id: resultUser.id
                }
            },
        });
        ctx.body = {
            data: resultUser,
            msg: staticMsg.RESULT_MSG_SUCCESS
        };
    },

    /**
     * 企业转用户
     */
    async updateQiYeZhuanYongHu(ctx) {
        try {
            //获取登录用户
            const user = ctx.state.user;
            //判断类型是否为企业
            if (user.type != staticMsg.APPLICATION_USER_TYPE_A) {
                throw new ApplicationError(staticMsg.APPLICATION_USER_MSG_206);
            }
            //查询企业
            const entries = await strapi.entityService.findMany('api::ym-factory.ym-factory', {
                filters: {
                    users_permissions_users: {
                        id: user.id
                    }
                },
                populate: { users_permissions_users: true },
            });
            if (entries.length == 0) {
                throw new ApplicationError(staticMsg.APPLICATION_USER_MSG_208);
            }
            //根据企业查询用户
            if (entries[0].users_permissions_users.length == 1) {
                throw new ApplicationError(staticMsg.APPLICATION_USER_MSG_210);
            }
            //查询角色
            let roleList = await strapi.entityService.findMany('plugin::users-permissions.role', {
                filters: {
                    name: staticAttribute.ROLE_PERSON
                },
            });
            if (roleList.length == 0) {
                throw new ApplicationError(staticMsg.ROLE_MSG_202);
            }
            //更换角色类型
            const entry = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
                data: {
                    type: staticMsg.APPLICATION_USER_TYPE_B,
                    ym_factory: {
                        id: -1
                    },
                    role: {
                        id: roleList[0].id
                    }
                },
            });
            ctx.body = {
                data: entry,
                msg: staticMsg.RESULT_MSG_SUCCESS
            };
        } catch (e) {
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    },

    /**
     * 个人转企业
     */
    async updateYongHuZhuanQiYe(ctx) {
        try {
            //获取登录用户
            const user = ctx.state.user;
            //判断类型是否为用户
            if (user.type != staticMsg.APPLICATION_USER_TYPE_B) {
                throw new ApplicationError(staticMsg.APPLICATION_USER_MSG_206);
            }
            //查询角色
            let roleList = await strapi.entityService.findMany('plugin::users-permissions.role', {
                filters: {
                    name: staticAttribute.ROLE_ENTERPRISE
                },
            });
            if (roleList.length == 0) {
                throw new ApplicationError(staticMsg.ROLE_MSG_202);
            }
            //更换角色类型
            const entry = await strapi.entityService.update('plugin::users-permissions.user', user.id, {
                data: {
                    type: staticMsg.APPLICATION_USER_TYPE_A,
                    role: {
                        id: roleList[0].id
                    }
                },
            });
            ctx.body = {
                data: entry,
                msg: staticMsg.RESULT_MSG_SUCCESS
            };
        } catch (e) {
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    }

}));