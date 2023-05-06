/*
 * @Author: your name
 * @Date: 2023-01-31 16:48:12
 * @LastEditTime: 2023-01-31 16:48:23
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \smtyum\src\myframe\dal\ent\upUsersYmFactoryLinks.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { buildEasyQuery, EasyQuery } from "../EasyQuery";
import { IMyQueryBuilder,IMyModel } from "../knexDef";
import { knexTool } from "../pmDb";
import { ISqlHelper } from "../sqlHelper";
import { bookshelf } from "../pmDb";



export interface  IUpUsersYmFactoryLinks {
   /***/
    id: number | null|undefined, 
   /***/
    user_id: number | null|undefined, 
   /***/
    ym_factory_id: number | null|undefined, 
   /***/
    user_order: number | null|undefined, 
}
export const  DUpUsersYmFactoryLinks ={   
   id:"up_users_ym_factory_links.id",
   user_id:"up_users_ym_factory_links.user_id",
   ym_factory_id:"up_users_ym_factory_links.ym_factory_id",
   user_order:"up_users_ym_factory_links.user_order",
   _tableName:"up_users_ym_factory_links",
   get allFileld():string[]{       
       return [this.id,this.user_id,this.ym_factory_id,this.user_order];
   }
}

export const UpUsersYmFactoryLinks:IUpUsersYmFactoryLinksModel = bookshelf.model(DUpUsersYmFactoryLinks._tableName, {
    tableName:  DUpUsersYmFactoryLinks._tableName,    
    idAttribute:"id"
     
});    
 UpUsersYmFactoryLinks.getQueryBuilder=function():IMyQueryBuilder{
    var rnt:any;
    UpUsersYmFactoryLinks.query((qb: any) =>{
        rnt=qb;
    });
    return rnt;
}
UpUsersYmFactoryLinks.getDataOneWhere=async function(help:ISqlHelper,...pm:any[]):Promise<IUpUsersYmFactoryLinks[]>{
    var rnt:any;
    UpUsersYmFactoryLinks.query((qb: any) =>{
        rnt=qb.where(...pm);
    });
    var dbEnt= await help.queryQueryBuilder(rnt);
    return dbEnt;
}

UpUsersYmFactoryLinks.easyQuery=async function (help:ISqlHelper,cb:()=>EasyQuery,addCb:(knexQb:IMyQueryBuilder)=>void|null):Promise<any>{
    var knexQb:any;
    UpUsersYmFactoryLinks.query((qb: any) =>{
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
UpUsersYmFactoryLinks.insert=async function(help:ISqlHelper,ent:IUpUsersYmFactoryLinks):Promise<any>{
    var sql= knexTool(DUpUsersYmFactoryLinks._tableName).insert(ent);     
    await help.execQueryBuilder(sql) ;
        var id= await help.lastInsertId();
        ent.id=id;
}


UpUsersYmFactoryLinks.updateById=async function(help:ISqlHelper,ent:any,id?:any):Promise<any>{
    var entId:any=ent.id;
    if(id){
        entId=id;
    }
    var sql= knexTool(DUpUsersYmFactoryLinks._tableName).where(DUpUsersYmFactoryLinks.id,entId).update(ent);
   // console.log(sql);
    await help.execQueryBuilder(sql);    
}
UpUsersYmFactoryLinks.easyUpdate=async function(help:ISqlHelper,cb:()=>EasyQuery,ent:any):Promise<any>{
    var knexQb:any;
    UpUsersYmFactoryLinks.query((qb: any) =>{
        knexQb=qb;
    });
    var easyQb= cb();    
    buildEasyQuery(easyQb,knexQb);
    var sql= knexQb.update(ent);
    //console.log(sql);
    await help.execQueryBuilder(sql);    
}

UpUsersYmFactoryLinks.deleteById=async function(help:ISqlHelper, id:number):Promise<any>{
    var sql= knexTool(DUpUsersYmFactoryLinks._tableName).where(DUpUsersYmFactoryLinks.id,id).delete();
    await help.execQueryBuilder(sql);    
}
UpUsersYmFactoryLinks.easyDelete=async function(help:ISqlHelper,cb:()=>EasyQuery):Promise<any>{
    var knexQb:any;
    UpUsersYmFactoryLinks.query((qb: any) =>{
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
export interface IUpUsersYmFactoryLinksModel extends IMyModel {
        
}


