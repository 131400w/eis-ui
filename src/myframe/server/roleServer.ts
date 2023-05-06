/*
 * @Author: your name
 * @Date: 2023-01-31 16:46:02
 * @LastEditTime: 2023-02-01 15:58:51
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \smtyum\src\myframe\server\roleServer.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
 
 
 
import { IUpRoles, UpRoles, DUpRoles } from "../dal/ent/upRoles";
import { DUpUsersYmFactoryLinks } from "../dal/ent/upUsersYmFactoryLinks";
import { IMyQueryBuilder } from "../dal/knexDef";
// import { MyLogger } from "../util/log4";
import { BaseServer } from "./baseServer";
import { UserFactoryLinksSever } from "./userFactoryLinksSever";
import { SQL } from '../../util/sql';

export class RoleServer extends BaseServer {
    //#region auto create
   //  log: MyLogger;     
    constructor() {
        super();
       //  this.log = new MyLogger(__filename);        
    }

    /**
     * 用户增加权限
     */
     async addUserRole(ctx:any){
        try{
            //获取参数
            let param = ctx.request.body.data;
            var entry = param.factory;
            let roleRow:any;
            //判断企业是否是需求方
            if(entry.type == "order"){
                roleRow = await this.help.query(SQL.select_role_order);
            }else if(entry.type == "productor"){
                roleRow = await this.help.query(SQL.select_role_productor);
            }
            if(roleRow.length == 0){
                return 202;
            }
            for(var item of roleRow){
                //判断是否存在角色
                let roleList1 = await this.help.query(SQL.select_up_users_role_links,[param.id,item.id]);
                if(roleList1.length > 0){
                    continue;
                }
                //增加角色id
                await this.help.query(SQL.add_up_users_role_links,[param.id,item.id]);
            }
            let roleList2 = await this.help.query(SQL.select_up_users_ym_factory_links,[param.id,item.id]);
            if(roleList2.length > 0){
                return 200;
            }
            //增加角色企业中间表
            await this.help.query(SQL.add_up_users_ym_factory_links,[param.id,entry.id]);
            return 200;
        }catch(e){
            console.error("系统错误---------" + e);
            return 0;
        }
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
            let knexQb= UpRoles.getQueryBuilder();
            knexQb.where(...para);
            var ents= await this.help.queryQueryBuilder(knexQb);
            return ents;
        }catch(err){
           //  this.log.error(err);
            throw err;
        }
    }
    async searchById(id:number):Promise<IUpRoles|null>{
        try{            
            var ents= await UpRoles.getDataOneWhere(this.help,DUpRoles.id,id);
            if(ents.length==0)
                return null;
            return ents[0];
        }catch(err){
           //  this.log.error(err);
            throw err;
        }
    }
    async add(ent: IUpRoles): Promise<IUpRoles | null> {
        try {            
            await UpRoles.insert(this.help, ent);
            return ent;
        } catch (err) {
          //   this.log.error(err);
            throw err;
        }
    }
    async delete(id: number): Promise<boolean> {
        try {          
            await UpRoles.deleteById(this.help, id);
            return true;
        } catch (err) {
           //  this.log.error(err);
            throw err;
        }
    }
    async modify(ent: any):Promise<IUpRoles | null>{
        try {             
            await UpRoles.updateById(this.help, ent);
            return ent;
        } catch (err) {
          //   this.log.error(err);
            throw err;
        }
    }
    //#endregion
}



