/**
 * ym-log service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::ym-log.ym-log',({ strapi }) => ({
    /**
     * 日志
     * @param titile   标题
     * @param type     类型
     * @param yuanData 原内容
     * @param data     新内容
     * @param username 操作人
     * @param id       操作人id
     */
     async addLog(titile:any,type:any,yuanData:any,data:any,username:any,id:any) {
        //增加操作记录
        let logEntity = {
            data: {
                titile: titile,
                type: type,
                yuanContext: JSON.stringify(yuanData),
                xinContext: JSON.stringify(data),
                operator: username,
                operatorId: id,
                time: new Date()
            }
        }
        //增加日志
        await strapi.entityService.create('api::ym-log.ym-log', logEntity);
    }
}));
