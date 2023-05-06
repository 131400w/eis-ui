/*
 * @Author: your name
 * @Date: 2023-01-31 16:50:10
 * @LastEditTime: 2023-02-01 15:56:39
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \smtyum\src\myframe\server\userFactoryLinksSever.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
 
 
 
import { IUpUsersYmFactoryLinks, UpUsersYmFactoryLinks, DUpUsersYmFactoryLinks } from "../dal/ent/upUsersYmFactoryLinks";
import { IMyQueryBuilder } from "../dal/knexDef";
// import { MyLogger } from "../util/log4";
import { BaseServer } from "./baseServer";

export class UserFactoryLinksSever extends BaseServer {
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
    async searchOneParam(... para:any[]):Promise<any[]>{
        try{             
            let knexQb= UpUsersYmFactoryLinks.getQueryBuilder();
            knexQb.where(... para);
            var ents= await this.help.queryQueryBuilder(knexQb);
            return ents;
        }catch(err){
           //  this.log.error(err);
            throw err;
        }
    }
    async searchById(id:number):Promise<IUpUsersYmFactoryLinks|null>{
        try{            
            var ents= await UpUsersYmFactoryLinks.getDataOneWhere(this.help,DUpUsersYmFactoryLinks.id,id);
            if(ents.length==0)
                return null;
            return ents[0];
        }catch(err){
           //  this.log.error(err);
            throw err;
        }
    }
    async add(ent: IUpUsersYmFactoryLinks): Promise<IUpUsersYmFactoryLinks | null> {
        try {            
            await UpUsersYmFactoryLinks.insert(this.help, ent);
            return ent;
        } catch (err) {
          //   this.log.error(err);
            throw err;
        }
    }
    async delete(id: number): Promise<boolean> {
        try {          
            await UpUsersYmFactoryLinks.deleteById(this.help, id);
            return true;
        } catch (err) {
           //  this.log.error(err);
            throw err;
        }
    }
    async modify(ent: any):Promise<IUpUsersYmFactoryLinks | null>{
        try {             
            await UpUsersYmFactoryLinks.updateById(this.help, ent);
            return ent;
        } catch (err) {
          //   this.log.error(err);
            throw err;
        }
    }
    //#endregion
}



