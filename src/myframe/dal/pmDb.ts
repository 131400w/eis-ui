/*
 * @Author: your name
 * @Date: 2022-01-04 16:49:31
 * @LastEditTime: 2022-01-05 18:32:14
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \userpermission\dal\pmDb.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */


export const knexTool = require('knex')({
    client: 'mysql',
    connection: {
        host : '192.168.0.11',
        port : 13306,
        user :'mcadmin',
        password :'mcroot123',
        database :'mc_society_save'
    },
    debug: false,
    log: {
        debug(message:any) {            
            console.log(message.sql);
            console.log(message.bindings);
            console.log("---------------");
        },
    }
})

export const bookshelf = require('bookshelf')(knexTool);