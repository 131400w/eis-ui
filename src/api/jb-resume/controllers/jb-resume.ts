/**
 * jb-resume controller
 */

import { factories } from '@strapi/strapi';
import { staticMsg } from '../../../util/msgConfig';
const { ApplicationError } = require("@strapi/utils").errors;

export default factories.createCoreController('api::jb-resume.jb-resume', ({ strapi }) => ({

    /**
     * 查询个人数据
     * @param ctx 
     */
    async findResumePerson(ctx) {
        try {
            //获取登录用户
            const user = ctx.state.user;
            //获取参数
            const param = { ...ctx.query };
            if (param.filters == undefined || param.filters == null || param.filters == "") {
                param.filters = {};
            }
            //追加条件
            param.filters.jb_person = {
                users_permissions_user: {
                    id: user.id
                }
            }
            console.log(JSON.stringify(param));
            let result = await strapi.entityService.findMany("api::jb-resume.jb-resume", param);
            ctx.body = {
                data: result,
                msg: staticMsg.RESULT_MSG_SUCCESS
            };
        } catch (e) {
            console.log(e);
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, e.message);
        }
    },

    /**
     * 增加简历空一条数据
     */
    async addResumeOne(ctx) {
        try {
            //获取登录用户
            const user = ctx.state.user;
            //查询个人信息
            let personList = await strapi.entityService.findMany("api::jb-person.jb-person", {
                filters: {
                    users_permissions_user: {
                        id: user.id
                    }
                }
            });
            if (personList.length == 0) {
                throw new ApplicationError(staticMsg.PERSON_MSG_202);
            }
            let result = await strapi.entityService.create("api::jb-resume.jb-resume", {
                data: {
                    jb_person: {
                        id: personList[0].id
                    },
                    sex: "NAN",
                    huntingStatus: "A",
                }
            });
            ctx.body = {
                data: result,
                msg: staticMsg.RESULT_MSG_SUCCESS
            };
        } catch (error) {
            throw new ApplicationError(staticMsg.RESULT_MSG_THROW, error.message);
        }
    }

}));
