/*
 * @Author: your name
 * @Date: 2023-03-09 18:51:18
 * @LastEditTime: 2023-03-13 15:25:23
 * @LastEditors: your name
 * @Description:  格式化返回数据, 使其适配 amis
 * @FilePath: \gytz\src\middlewares\amisResponse.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

const _ = require('lodash');
export default (config, { strapi }) => {
   return async (context, next) => {
      await next();
      if (context.body) {
         context.body._pretty = toAmis(context);
      }
   }
}


// 适配amis中间件, 使用规范
// 1. 数据库字段不能有 _pretty,data,attributes 否则转换错误
// 2. data,attributes 属性下 数组不能和其他属性共存,否则会相互覆盖
function toAmis(ctx: any): any {
   let code = ctx.status == 200 ? 0 : ctx.status;
   if (ctx.status != 200) {
      ctx.status = 200;
   }
   if (ctx.request.method.toUpperCase() == 'GET') {
      var body = dealBody(ctx.body);
      if (body instanceof Array) {
         let count = ctx.body.meta ? ctx.body.meta.pagination.total : 0;
         return {
            code,
            row: body,
            count
         }
      } else {
         return {
            code,
            data: body
         }
      }
   } else {
      let msg = "";
      if (code != 0) {
         msg = "操作失败!";
      } else {
         msg = "更新成功!";
      }
      if (ctx.body && ctx.body.error && ctx.body.error.message) {
         msg = ctx.body.error.message;
      }
      let data = dealBody(ctx.body)
      return { code, data, msg };
   }
}
function dealBody(bodyData) {

   if (!(bodyData instanceof Object))
      return bodyData;
   let curData = {};
   if (bodyData instanceof Array)
      curData = [];
   for (var k in bodyData) {
      let val = dealBody(bodyData[k]);
      if (k == "data") {
         if (val instanceof Array) {
            curData = val;
         } else {
            curData = _.assign(curData, val);
         }
      }
      else if (k == "attributes") {
         curData = _.assign(curData, val);
      } else {
         curData[k] = val;
      }

   }

   return curData;
} 