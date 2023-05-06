/*
 * @Author: your name
 * @Date: 2021-12-31 14:31:45
 * @LastEditTime: 2022-01-05 16:28:36
 * @LastEditors: your name
 * @Description: 查询条件语法糖构造
 * @FilePath: \userpermission\dal\EasyQuery.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

import { IMyQueryBuilder } from "./knexDef";

/**
 * 查询表达式
 */
 class EasyExpress {
    //操作符号, and or
    linkOperate: string;
    // 查找参数 
    param: any[]|EasyQuery|string;
    constructor(op: string, pms: any[]|EasyQuery|string) {
        this.linkOperate = op;
        this.param = pms;
    }
}

/**
 * 查询构造对象
 */
export class EasyQuery {
    //  queryBuder:IMyQueryBuilder;
    //  constructor( qb:IMyQueryBuilder) {
    //      this.queryBuder=qb;
    //  }
    expresses: EasyExpress[];
    constructor() {
        this.expresses = [];
    }
    public and(...pm: any[]): EasyQuery {
        if (pm.length == 0) {
            throw { code: -100, msg: "查询参数不能为空" }
        }
        if (pm[0] instanceof EasyQuery) {
          //  console.log("andSub--");
            this.expresses.push(new EasyExpress("andSub",pm[0]));
           // console.log("andSub");
        } else {
          //  console.log("and--");
            this.expresses.push(new EasyExpress("and",pm));
          //  console.log("and");
        }
        return this;

    }
    public andNotNull(field:string):EasyQuery{
        this.expresses.push(new EasyExpress("andNotNull",field))
        return this;
    }
    public or(...pm: any[]): EasyQuery {
        if (pm.length == 0) {
            throw { code: -100, msg: "查询参数不能为空" }
        }
        if (pm[0] instanceof EasyQuery) {
          //  console.log("orSube--");
            this.expresses.push(new EasyExpress("orSub",pm[0]));
          //  console.log("orSube");
        }
        else {
          //  console.log("or--");
            this.expresses.push(new EasyExpress("or",pm));
          //  console.log("or");
        }
        return this;
    }
    public orNotNull(field:string):EasyQuery{
        this.expresses.push(new EasyExpress("orNotNull",field))
        return this;
    }
}


export function where(...pm: any[]): EasyQuery {
    var rnt = new EasyQuery();
    rnt.and(...pm);
    return rnt;
}

/**
 * 根据easyQuery构造knex查询
 * @param eqb 
 * @param knexQb 
 */
 export function buildEasyQuery( eqb:EasyQuery,knexQb:IMyQueryBuilder) {
  for(var q of eqb.expresses){
      if(q.linkOperate=="and"){
          if(q.param instanceof Array){
              knexQb.where(...q.param);
          }else{
              throw {code:-101,msg:"and 查询参数错误,参数不是数组"};
          }
          
      }
      else if(q.linkOperate=="or"){
          if(q.param instanceof Array){
              knexQb.orWhere(...q.param);
          }else{
              throw {code:-101,msg:"or 查询参数错误,参数不是数组"};
          }            
      }
      else if(q.linkOperate=="andSub"){
          if(q.param instanceof EasyQuery){
              var subEqb=q.param;
              knexQb.where((subQb:IMyQueryBuilder)=>{
                  buildEasyQuery(subEqb,subQb);
              })
              
          }else{
              throw {code:-101,msg:"andSub 查询参数错误,参数不是子查询"};
          }             
          
      } else if(q.linkOperate=="orSub"){
          if(q.param instanceof EasyQuery){
              var subEqb=q.param;
              knexQb.orWhere((subQb:IMyQueryBuilder)=>{
                  buildEasyQuery(subEqb,subQb);
              })                
          }else{
              throw {code:-101,msg:"andSub 查询参数错误,参数不是子查询"};
          }             
          
      }else if(q.linkOperate=="andNotNull"){            
          knexQb.whereNotNull(q.param.toString());                                    
      }else if(q.linkOperate=="orNotNull"){            
          knexQb.orWhereNotNull(q.param.toString());                                    
      }
      else{
          throw {code:-102,msg:"不支持的操作符"};
      }
  }
}