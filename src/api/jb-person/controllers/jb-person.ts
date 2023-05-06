/**
 * jb-person controller
 */

import { factories } from '@strapi/strapi'
import { staticMsg } from '../../../util/msgConfig';

export default factories.createCoreController('api::jb-person.jb-person', ({ strapi }) => ({

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

        const entity = await strapi.service('api::jb-person.jb-person').findOne(id, query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },

    /**
     * 根据登录用户查询个人信息
     */
    async findPersonOne(ctx) {
        //获取登录用户
        const user = ctx.state.user;
        const entries = await strapi.entityService.findMany('api::jb-person.jb-person', {
            filters: {
                users_permissions_user: {
                    id: user.id
                }
            },
        });
        ctx.body = {
            data: entries,
            msg: staticMsg.RESULT_MSG_SUCCESS
        };
    }

}));
