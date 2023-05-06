/*
 * @Author: your name
 * @Date: 2022-01-04 16:54:32
 * @LastEditTime: 2023-01-04 15:47:06
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \mytsdemo1\src\myAuth\dal\knexDef.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

import { EasyQuery } from "./EasyQuery";
import { ISqlHelper } from "./sqlHelper";

export interface IMyQueryBuilder{
    where(...pm:any[]):IMyQueryBuilder;
    orWhere(...pm:any[]):IMyQueryBuilder;
    whereNot(...pm:any[]):IMyQueryBuilder;
    orWhereNot(...pm:any[]):IMyQueryBuilder;
    whereIn (column:string,arr:any[]):IMyQueryBuilder;
    orWhereIn(column:string,arr:any[]):IMyQueryBuilder;
    whereNotIn(column:string,arr:any[]):IMyQueryBuilder;
    orWhereNotIn(column:string,arr:any[]):IMyQueryBuilder;
    whereNull(column:string):IMyQueryBuilder;    
    orWhereNull(column:string):IMyQueryBuilder;    
    whereNotNull(column:string):IMyQueryBuilder;    
    orWhereNotNull(column:string):IMyQueryBuilder;    
    whereExists(pm:IMyQueryBuilder|Function):IMyQueryBuilder;
    orWhereExists(pm:IMyQueryBuilder|Function):IMyQueryBuilder;
    whereNotExists(pm:IMyQueryBuilder|Function):IMyQueryBuilder;
    orWhereNotExists(pm:IMyQueryBuilder|Function):IMyQueryBuilder;
    whereBetween (column:string,arr:any[]):IMyQueryBuilder;
    orWhereBetween (column:string,arr:any[]):IMyQueryBuilder;
    whereNotBetween (column:string,arr:any[]):IMyQueryBuilder;
    orWhereNotBetween (column:string,arr:any[]):IMyQueryBuilder;    
    whereRaw (...pm:any[]):IMyQueryBuilder;  
    

    join(...pm:any[]):IMyQueryBuilder;
    leftJoin(...pm:any[]):IMyQueryBuilder;
    rightJoin(...pm:any[]):IMyQueryBuilder;       
    
    select(...pm:any[]):IMyQueryBuilder;    
    limit(page:number):IMyQueryBuilder;
    offset(pos:number):IMyQueryBuilder;
    count(...pm:any[]):IMyQueryBuilder;
    
    orderBy(column:string,direction?:string):IMyQueryBuilder;
    groupBy(...pm:any[]):IMyQueryBuilder;

    toSQL():any;
    clone():IMyQueryBuilder;
}

export interface IMyModel{
    /**
     * 获取knex查询构造对象
     */
    getQueryBuilder(...pm:any[]):IMyQueryBuilder;
    /**
     * 构造查询对象
     * @param fun 
     */
    query(fun: Function):IMyQueryBuilder;
    /**
     * 从数据库获取数据, 只兼容knex的一个where
     * @param help 
     * @param pm 
     */
    getDataOneWhere( help:ISqlHelper,...pm:any[]):Promise<any>;
    /**
     * 快速构造查询并查询结果
     * @param help 
     * @param cb 
     * @param addCb 
     */
    easyQuery(help:ISqlHelper,cb:()=>EasyQuery,addCb?:(knexQb:IMyQueryBuilder)=>void|null):Promise<any>;

    insert(help:ISqlHelper,ent:any):Promise<any>;

    updateById(help:ISqlHelper,ent:any,id?:number):Promise<any>;
    easyUpdate(help:ISqlHelper,cb:()=>EasyQuery,ent:any):Promise<any>;
    deleteById(help:ISqlHelper,id?:number):Promise<any>;
    easyDelete(help:ISqlHelper,cb:()=>EasyQuery):Promise<any>;
}