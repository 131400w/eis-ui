/**
 * jb-industry controller
 */

import { factories } from '@strapi/strapi'
import { staticMsg } from '../../../util/msgConfig';
const { ApplicationError } = require("@strapi/utils").errors;

export default factories.createCoreController('api::jb-industry.jb-industry', ({ strapi }) => ({
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

        const entity = await strapi.service('api::jb-industry.jb-industry').findOne(id, query);
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);
    },

    async addJBWork(ctx) {
        try {
            //获取参数
            let data = ctx.request.body.data;
            let count = 1;
            //分析
            for (var item of data[0].data) {
                let entry = await addW(strapi, item.label, data[0].type, 0, count);
                if (item.children.length > 0) {
                    await digui(item.children, entry.id, strapi, count, data[0].type);
                }
            }
        } catch (e) {
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    },

    //查询树形
    async findJBWorkTree(ctx) {
        try {
            //获取参数
            let query = { ...ctx.query };
            //查询数据
            const entries = await strapi.entityService.findMany('api::jb-industry.jb-industry', query);
            //判断是否存在数据
            if (entries.length == 0) {
                throw new ApplicationError(staticMsg.RESULT_MSG_COUNT);
            }
            let list = [];
            for(var item of entries){
                if(item.parentId == 0){
                    let nodeList = findJBWorkTree(entries,item);
                    item.children = nodeList;
                    list.push(item);
                }
            }
            ctx.body = {
                data: list,
                msg: staticMsg.RESULT_MSG_SUCCESS
            }
        } catch (e) {
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    }

}));


/**
 * 递归增加
 */
async function digui(list: any, id: any, strapi: any, count: any, type: any) {
    if (list.length > 0) {
        for (var item of list) {
            let entry = await addW(strapi, item.label, type, id, (count + 1));
            if (item.children.length > 0) {
                await digui(item.children, entry.id, strapi, (count + 1), type);
            }
        }
    }
}

/**
 * 增加数据
 */
async function addW(strapi: any, name: any, type: any, parentId: any, level: any) {
    let entry = await strapi.db.query('api::jb-industry.jb-industry').create({
        data: {
            name: name,
            type: type,
            parentId: parentId,
            level: level
        },
    });
    return entry;
}

/**
 * 递归查询数据
 */
 function findJBWorkTree(list:any,parentRow: any){
    let children = [];
    for(var item of list){
        if(item.parentId == parentRow.id){
            let nodeList = findJBWorkTree(list,item);
            item.children = nodeList;
            children.push(item);
        }
    }
    return children;
 }