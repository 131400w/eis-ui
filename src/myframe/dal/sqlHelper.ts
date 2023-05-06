import { IMyQueryBuilder } from "./knexDef";

 
/*
 * @Author: your name
 * @Date: 2022-01-04 16:56:05
 * @LastEditTime: 2022-01-05 16:47:51
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \userpermission\dal\sqlHelper.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
export interface ISqlHelper{
    open():Promise<any>;
    startTranslate(bodyFun:(help:ISqlHelper)=>Promise<any>):Promise<any>;
    queryQueryBuilder(queryBuilder:IMyQueryBuilder):Promise<any>;
    execQueryBuilder(queryBuilder:IMyQueryBuilder):Promise<any>;
    commit():void;
    rollback():void;
    query(sql:string,params?:any[]|null):Promise<any>;
    exec(sql:string,params?:any[]|null):Promise<any>;
    close():void ;   
    lastInsertId():Promise<any>; 
}