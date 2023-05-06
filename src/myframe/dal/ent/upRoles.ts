/*
 * @Author: your name
 * @Date: 2023-01-31 16:44:48
 * @LastEditTime: 2023-01-31 16:45:00
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \smtyum\src\myframe\dal\ent\upRoles.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { buildEasyQuery, EasyQuery } from "../EasyQuery";
import { IMyQueryBuilder,IMyModel } from "../knexDef";
import { knexTool } from "../pmDb";
import { ISqlHelper } from "../sqlHelper";
import { bookshelf } from "../pmDb";



export interface  IUpRoles {
   /***/
    id: number | null|undefined, 
   /***/
    name: string | null|undefined, 
   /***/
    description: string | null|undefined, 
   /***/
    type: string | null|undefined, 
   /***/
    created_at: Date | null|undefined, 
   /***/
    updated_at: Date | null|undefined, 
   /***/
    created_by_id: number | null|undefined, 
   /***/
    updated_by_id: number | null|undefined, 
}
export const  DUpRoles ={   
   id:"up_roles.id",
   name:"up_roles.name",
   description:"up_roles.description",
   type:"up_roles.type",
   created_at:"up_roles.created_at",
   updated_at:"up_roles.updated_at",
   created_by_id:"up_roles.created_by_id",
   updated_by_id:"up_roles.updated_by_id",
   _tableName:"up_roles",
   get allFileld():string[]{       
       return [this.id,this.name,this.description,this.type,this.created_at,this.updated_at,this.created_by_id,this.updated_by_id];
   }
}

export const UpRoles:IUpRolesModel = bookshelf.model(DUpRoles._tableName, {
    tableName:  DUpRoles._tableName,    
    idAttribute:"id"
     
});    
 UpRoles.getQueryBuilder=function():IMyQueryBuilder{
    var rnt:any;
    UpRoles.query((qb: any) =>{
        rnt=qb;
    });
    return rnt;
}
UpRoles.getDataOneWhere=async function(help:ISqlHelper,...pm:any[]):Promise<IUpRoles[]>{
    var rnt:any;
    UpRoles.query((qb: any) =>{
        rnt=qb.where(...pm);
    });
    var dbEnt= await help.queryQueryBuilder(rnt);
    return dbEnt;
}

UpRoles.easyQuery=async function (help:ISqlHelper,cb:()=>EasyQuery,addCb:(knexQb:IMyQueryBuilder)=>void|null):Promise<any>{
    var knexQb:any;
    UpRoles.query((qb: any) =>{
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
UpRoles.insert=async function(help:ISqlHelper,ent:IUpRoles):Promise<any>{
    var sql= knexTool(DUpRoles._tableName).insert(ent);     
    await help.execQueryBuilder(sql) ;
        var id= await help.lastInsertId();
        ent.id=id;
}


UpRoles.updateById=async function(help:ISqlHelper,ent:any,id?:any):Promise<any>{
    var entId:any=ent.id;
    if(id){
        entId=id;
    }
    var sql= knexTool(DUpRoles._tableName).where(DUpRoles.id,entId).update(ent);
   // console.log(sql);
    await help.execQueryBuilder(sql);    
}
UpRoles.easyUpdate=async function(help:ISqlHelper,cb:()=>EasyQuery,ent:any):Promise<any>{
    var knexQb:any;
    UpRoles.query((qb: any) =>{
        knexQb=qb;
    });
    var easyQb= cb();    
    buildEasyQuery(easyQb,knexQb);
    var sql= knexQb.update(ent);
    //console.log(sql);
    await help.execQueryBuilder(sql);    
}

UpRoles.deleteById=async function(help:ISqlHelper, id:number):Promise<any>{
    var sql= knexTool(DUpRoles._tableName).where(DUpRoles.id,id).delete();
    await help.execQueryBuilder(sql);    
}
UpRoles.easyDelete=async function(help:ISqlHelper,cb:()=>EasyQuery):Promise<any>{
    var knexQb:any;
    UpRoles.query((qb: any) =>{
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
export interface IUpRolesModel extends IMyModel {
        
}


