/**
 * ym-role-permission controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::ym-role-permission.ym-role-permission', ({ strapi }) => ({

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

        const entity = await strapi.service('api::ym-role-permission.ym-role-permission').findOne(id, query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },

    //根据登录用户角色查询对应的功能菜单
    async findPermission(ctx) {
        //获取登录用户
        const user = ctx.state.user;
        //获取角色
        const roleList = user.role;
        let role = [];
        for (var item of roleList) {
            role.push(item.name);
        }
        //根据角色查询
        const entries = await strapi.entityService.findMany('api::ym-page.ym-page', {
            sort: { index: 'asc' },
            populate: ["ym_actions", "ym_role_permissions"],
            filters: {
                ym_role_permissions: {
                    roleName: {
                        $in: role
                    },
                },
            }
        });
        let list = [];
        for(var item of entries){
            if(item.parentId == 0 || item.parentId == null || item.parentId == ""){
                item.children = digui(entries,item);
                list.push(item);
            }
        }
        ctx.body = {
            data: list
        };
    },

    /**
     * 查询按钮
     */
    async findPermissionAction(ctx) {
        //获取登录用户
        const user = ctx.state.user;
        //获取角色
        const roleList = user.role;
        let role = [];
        for (var item of roleList) {
            role.push(item.name);
        }
        //根据角色查询
        const entries = await strapi.entityService.findMany('api::ym-action.ym-action', {
            populate: ["ym_role_permissions"],
            filters: {
                ym_role_permissions: {
                    roleName: {
                        $in: role
                    },
                },
            }
        });
        ctx.body = {
            data: entries
        };
    }

}));

function digui(list:any,parentRow:any){
    let arrgs = [];
    for(var item of list){
        if(item.parentId == parentRow.id){
            item.children = digui(list,item);
            arrgs.push(item);
        }
    }
    return arrgs;
}
