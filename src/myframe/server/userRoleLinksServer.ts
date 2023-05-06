/*
 * @Author: your name
 * @Date: 2023-01-31 16:36:32
 * @LastEditTime: 2023-02-01 16:00:28
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \smtyum\src\myframe\server\userRoleLinksServer.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
 
 
 
import { DUpUsersRoleLinks, IUpUsersRoleLinks, UpUsersRoleLinks } from "../dal/ent/upUsersRoleLinks";

import { IMyQueryBuilder } from "../dal/knexDef";
// import { MyLogger } from "../util/log4";
import { BaseServer } from "./baseServer";

export class UserRoleLinks extends BaseServer {
    //#region auto create
   //  log: MyLogger;     
    constructor() {
        super();
       //  this.log = new MyLogger(__filename);        
    }
    async search(knexQb:IMyQueryBuilder):Promise<any[]>{
        try{             
            var ents= await this.help.queryQueryBuilder(knexQb);
            return ents;
        }catch(err){
           //  this.log.error(err);
            throw err;
        }
    }
    async searchOneParam(...para:any[]):Promise<any[]>{
        try{             
            let knexQb=UpUsersRoleLinks.getQueryBuilder();
            knexQb.where(...para);
            var ents= await this.help.queryQueryBuilder(knexQb);
            return ents;
        }catch(err){
           //  this.log.error(err);
            throw err;
        }
    }
    async searchById(id:number):Promise<IUpUsersRoleLinks|null>{
        try{            
            var ents= await UpUsersRoleLinks.getDataOneWhere(this.help,DUpUsersRoleLinks.id,id);
            if(ents.length==0)
                return null;
            return ents[0];
        }catch(err){
           //  this.log.error(err);
            throw err;
        }
    }
    async add(ent: IUpUsersRoleLinks): Promise<IUpUsersRoleLinks | null> {
        try {            
            await UpUsersRoleLinks.insert(this.help, ent);
            return ent;
        } catch (err) {
          //   this.log.error(err);
            throw err;
        }
    }
    async delete(id: number): Promise<boolean> {
        try {          
            await UpUsersRoleLinks.deleteById(this.help, id);
            return true;
        } catch (err) {
           //  this.log.error(err);
            throw err;
        }
    }
    async modify(ent: any):Promise<IUpUsersRoleLinks | null>{
        try {             
            await UpUsersRoleLinks.updateById(this.help, ent);
            return ent;
        } catch (err) {
          //   this.log.error(err);
            throw err;
        }
    }
    //#endregion
}



