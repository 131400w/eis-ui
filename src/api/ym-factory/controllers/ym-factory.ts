/**
 * ym-factory controller
 */

import { factories } from '@strapi/strapi'
import { staticAttribute } from '../../../util/config';
import { staticMsg } from '../../../util/msgConfig';
const { ApplicationError } = require("@strapi/utils").errors;

export default factories.createCoreController('api::ym-factory.ym-factory', ({ strapi }) => ({

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

        const entity = await strapi.service('api::ym-factory.ym-factory').findOne(id, query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },

    /**
     * 增加企业
     * @param ctx 
     */
    async create(ctx) {
        //获取登录用户
        const user = ctx.state.user;
        ctx.request.body.data.users_permissions_users = {
            id: user.id
        }
        //判断用户是否为A
        if (user.type == staticAttribute.USER_TYPE_A) {
            //查询企业
            const entries = await strapi.entityService.findMany('api::ym-factory.ym-factory', {
                filters: {
                    users_permissions_users: {
                        id: user.id,
                    },
                }
            });
            if (entries.length == 0) {
                //创建企业
                let data = await super.create(ctx);
                ctx.body = {
                    data: data
                };
            }else if (entries[0].statue == staticAttribute.FACTORY_STATUS_INVALIDATE) {
                //将状态改为创建
                ctx.request.body.data.status = staticAttribute.FACTORY_STATUS_CREATE;
                //修改企业状态
                await strapi.entityService.update('api::ym-factory.ym-factory',entries[0].id,ctx.request.body);
            }
            ctx.body = {
                data: entries[0]
            };
        } else {
            ctx.body = {
                data: staticMsg.RESULT_202
            };
        }
    },

    /**
     * 判断企业是否认证
     */
    async findISCheck(ctx) {
        try {
            //获取登录用户
            const user = ctx.state.user;
            //判断用户是否为A
            if (user.type == staticAttribute.USER_TYPE_A) {
                //获取登录用户
                const user = ctx.state.user;
                const entries = await strapi.entityService.findMany('api::ym-factory.ym-factory', {
                    filters: {
                        users_permissions_users: {
                            id: user.id,
                        },
                    }
                });
                if (entries.length == 0) {
                    ctx.body = {
                        data: staticMsg.RESULT_202,
                        msg: staticMsg.YM_FACTORY_MSG_202
                    };
                    return;
                } else if (entries[0].statue == staticAttribute.FACTORY_STATUS_CHECKED) {
                    ctx.body = {
                        data: entries
                    };
                    return;
                } else {
                    ctx.body = {
                        data: staticMsg.RESULT_206,
                        msg: staticMsg.YM_FACTORY_MSG_206
                    };
                    return;
                }
            }
        } catch (e) {
            console.log(e);
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    }
}));
