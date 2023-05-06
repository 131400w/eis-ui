/**
 * sc-factory controller
 */

import { factories } from '@strapi/strapi'
import { staticMsg } from '../../../util/msgConfig';
const { ApplicationError } = require("@strapi/utils").errors;

export default factories.createCoreController('api::sc-factory.sc-factory', ({ strapi }) => ({
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

        const entity = await strapi.service('api::sc-factory.sc-factory').findOne(id, query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },

    /**
     * 判断企业是否认证
     */
    async findISCheck(ctx) {
        try {
            //获取登录用户
            const user = ctx.state.user;
            const entries = await strapi.entityService.findMany('api::sc-factory.sc-factory', {
                filters: {
                    users_permissions_users: {
                        id: user.id,
                    },
                }
            });
            if (entries.length == 0) {
                ctx.body = {
                    data: staticMsg.RESULT_202
                };
            }else if (entries[0].isCheck == "NO") {
                ctx.body = {
                    data: entries
                };
            }else if (entries[0].isCheck == "YES") {
                ctx.body = {
                    data: entries
                };
            }else{
                ctx.body = {
                    data: staticMsg.RESULT_206
                };
            }
        } catch (e) {
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    }

}));
