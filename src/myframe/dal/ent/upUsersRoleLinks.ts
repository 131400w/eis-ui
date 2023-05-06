/*
 * @Author: your name
 * @Date: 2023-01-31 16:33:20
 * @LastEditTime: 2023-01-31 16:33:29
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \smtyum\src\myframe\dal\ent\upUsersRoleLinks.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { buildEasyQuery, EasyQuery } from "../EasyQuery";
import { IMyQueryBuilder,IMyModel } from "../knexDef";
import { knexTool } from "../pmDb";
import { ISqlHelper } from "../sqlHelper";
import { bookshelf } from "../pmDb";



export interface  IUpUsersRoleLinks {
   /***/
    id: number | null|undefined, 
   /***/
    user_id: number | null|undefined, 
   /***/
    role_id: number | null|undefined, 
   /***/
    user_order: number | null|undefined, 
}
export const  DUpUsersRoleLinks ={   
   id:"up_users_role_links.id",
   user_id:"up_users_role_links.user_id",
   role_id:"up_users_role_links.role_id",
   user_order:"up_users_role_links.user_order",
   _tableName:"up_users_role_links",
   get allFileld():string[]{       
       return [this.id,this.user_id,this.role_id,this.user_order];
   }
}

export const UpUsersRoleLinks:IUpUsersRoleLinksModel = bookshelf.model(DUpUsersRoleLinks._tableName, {
    tableName:  DUpUsersRoleLinks._tableName,    
    idAttribute:"id"
     
});    
 UpUsersRoleLinks.getQueryBuilder=function():IMyQueryBuilder{
    var rnt:any;
    UpUsersRoleLinks.query((qb: any) =>{
        rnt=qb;
    });
    return rnt;
}
UpUsersRoleLinks.getDataOneWhere=async function(help:ISqlHelper,...pm:any[]):Promise<IUpUsersRoleLinks[]>{
    var rnt:any;
    UpUsersRoleLinks.query((qb: any) =>{
        rnt=qb.where(...pm);
    });
    var dbEnt= await help.queryQueryBuilder(rnt);
    return dbEnt;
}

UpUsersRoleLinks.easyQuery=async function (help:ISqlHelper,cb:()=>EasyQuery,addCb:(knexQb:IMyQueryBuilder)=>void|null):Promise<any>{
    var knexQb:any;
    UpUsersRoleLinks.query((qb: any) =>{
        knexQb=qb;
    });
    var easyQb= cb();    
    buildEasyQuery(easyQb,knexQb);
    if(addCb){
        addCb(knexQb);
    }
    var dbEnt= await help.queryQueryBuilder(knexQb);
    return dbEnt;
}
UpUsersRoleLinks.insert=async function(help:ISqlHelper,ent:IUpUsersRoleLinks):Promise<any>{
    var sql= knexTool(DUpUsersRoleLinks._tableName).insert(ent);     
    await help.execQueryBuilder(sql) ;
        var id= await help.lastInsertId();
        ent.id=id;
}


UpUsersRoleLinks.updateById=async function(help:ISqlHelper,ent:any,id?:any):Promise<any>{
    var entId:any=ent.id;
    if(id){
        entId=id;
    }
    var sql= knexTool(DUpUsersRoleLinks._tableName).where(DUpUsersRoleLinks.id,entId).update(ent);
   // console.log(sql);
    await help.execQueryBuilder(sql);    
}
UpUsersRoleLinks.easyUpdate=async function(help:ISqlHelper,cb:()=>EasyQuery,ent:any):Promise<any>{
    var knexQb:any;
    UpUsersRoleLinks.query((qb: any) =>{
        knexQb=qb;
    });
    var easyQb= cb();    
    buildEasyQuery(easyQb,knexQb);
    var sql= knexQb.update(ent);
    //console.log(sql);
    await help.execQueryBuilder(sql);    
}

UpUsersRoleLinks.deleteById=async function(help:ISqlHelper, id:number):Promise<any>{
    var sql= knexTool(DUpUsersRoleLinks._tableName).where(DUpUsersRoleLinks.id,id).delete();
    await help.execQueryBuilder(sql);    
}
UpUsersRoleLinks.easyDelete=async function(help:ISqlHelper,cb:()=>EasyQuery):Promise<any>{
    var knexQb:any;
    UpUsersRoleLinks.query((qb: any) =>{
        knexQb=qb;
    });
    var easyQb= cb();    
    buildEasyQuery(easyQb,knexQb);
    var sql= knexQb.delete();
    await help.execQueryBuilder(sql);  
}

/*
  扩展代码,请勿覆盖
*/
export interface IUpUsersRoleLinksModel extends IMyModel {
        
}


