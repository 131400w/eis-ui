/**
 * jb-work-user controller
 */

import { factories } from '@strapi/strapi'
import { staticMsg } from '../../../util/msgConfig';
const { ApplicationError } = require("@strapi/utils").errors;

export default factories.createCoreController('api::jb-work-user.jb-work-user', ({ strapi }) => ({

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

        const entity = await strapi.service('api::jb-work-user.jb-work-user').findOne(id, query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },

    /**
     * 创建多条
     * @param ctx 
     */
    async createMany(ctx) {
        try {
            //获取参数
            let param = ctx.request.body.data;
            for(var item of param){
                let data = {
                    data: item
                }
                await strapi.entityService.create("api::jb-work-user.jb-work-user",data);
            }
            ctx.body = {
                data: staticMsg.RESULT_200,
                msg: staticMsg.RESULT_MSG_SUCCESS
            };
        } catch (e) {
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    }

}));
