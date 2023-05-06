/*
 * @Author: your name
 * @Date: 2022-01-04 18:03:44
 * @LastEditTime: 2023-01-04 15:33:33
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \mytsdemo1\src\myAuth\dal\MySqlHelper.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
// import { MySql } from "../config";
//import { MyLogger } from "../util/log4";
import { IMyQueryBuilder } from "./knexDef";
import { ISqlHelper } from "./sqlHelper";
// const mysql = require('mysql');

// var _debug=false;
// if(process.env.NODE_ENV=="debug"){
//     _debug=true;
// }

// const globPool = mysql.createPool(
//     MySql.permissionDB
// )

interface myglob {    
    strapi:any
}
const mysql = require('mysql');

var _debug=false;
if(process.env.NODE_ENV=="debug"){
    _debug=true;
}
function getConfig(){
    let myGlob:myglob=<any>global;
    let cfg=myGlob.strapi.container.get('config').get('database.myframeConnection');
    // console.log("my dbconfig",cfg);
    return cfg;
}

const globPool = mysql.createPool(
    getConfig()
)

export class MySqlHelper implements ISqlHelper {
    connection: any;
    isConnected: boolean;
    isAutoClose: boolean;
    isTansaction: boolean;
   // log:MyLogger;
    constructor(autoClose?: boolean) {
        this.isConnected = false;
        this.isAutoClose = autoClose!=null ? autoClose : true;
        this.isTansaction = false;
        //this.log=new MyLogger(__filename);
    }

    open(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.isConnected) {
                resolve(this.connection);
            } else {
                _debug && console.log("get new  connect");
                globPool.getConnection((err: any, con: any) => {
                    if (err) {
                        reject(reject);
                    } else {
                        this.connection = con;
                        this.isConnected = true;
                        resolve(con);
                    }
                })
            }
        })
    }
    async queryQueryBuilder(queryBuilder: IMyQueryBuilder) {
        var ctx = queryBuilder.toSQL().toNative();
        var sql = ctx.sql;//.replace(/`/g,'"');
        // console.log(queryBuilder.toString());
        // console.log("------------");/
        var rnt = await this.query(sql, ctx.bindings);
        return rnt;
    }
    async execQueryBuilder(queryBuilder: IMyQueryBuilder) {
         
        var ctx = queryBuilder.toSQL().toNative();
        var sql = ctx.sql;//.replace(/`/g,'"');
      //  _debug && this.log.debug(queryBuilder.toString());         
        // console.log("------------");/
        var rnt = await this.exec(sql, ctx.bindings);
        return rnt;
    }
    startTranslate(bodyFun:(help:ISqlHelper)=>Promise<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            this.open().then((con) => {                
                this.connection.beginTransaction((err: any) => {
                    if(err){
                        reject(err);
                        return;
                    }
                   // console.log("start tran");
                    this.isTansaction = true;
                    bodyFun(this).then(async () => {                      
                        await this.commit();                         
                        resolve(null);                        
                    }).catch((err: any) => {
                        reject(err);
                        this.rollback();
                    });

                })

            }).catch((err) => {
                reject(err);
            });
        });
    }
    commit(): Promise<any> {
        return new Promise((resolve, reject) => {
            // console.log("commit isTansaction",this.isTansaction);
            if (!this.isTansaction) {
                resolve(null);
                if (this.isAutoClose) this.close();
            } else {
                _debug && console.log("commit");
                this.isTansaction = false;
                this.connection.commit((err: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(err);
                    if (this.isAutoClose) this.close();
                });
            }
        });
    }
    async rollback(): Promise<any> {
        if (!this.isTansaction) {
            return;
        }
        _debug && console.log("rollback");
        await this.connection.rollback();
        this.isTansaction = false;        
    }
    query(sql: string, params?: any[] | null): Promise<any> {
        return new Promise((resolve, reject) => {
            this.open().then((conn) => {
                _debug && console.log("exec sql", sql, params);
                conn.query(sql, params, (err: any, result: any) => {
                    if (err) {
                        this.isTansaction && this.rollback();
                        reject(err);
                        console.error("数据库错误:" + err);
                    } else {
                        resolve(result);
                    }
                    _debug && console.log('this.isAutoClose',this.isAutoClose,'this.isTansaction',this.isTansaction);
                    if (this.isAutoClose && !this.isTansaction) this.close();
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }
    exec(sql: string, params?: any[] | null): Promise<any> {
        return this.query(sql, params);
    }
    close(): void {
        _debug && console.log("connect close");
        this.isConnected = false;
        this.connection.release();                
    }
    async lastInsertId():Promise<number>{
        var id= await this.query('select last_insert_id() as lastId');        
        return id[0].lastId;
    }
}