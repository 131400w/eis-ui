import { ErrCodes, MyError } from "../util/myError"

/*
 * @Author: your name
 * @Date: 2022-01-07 14:29:06
 * @LastEditTime: 2022-01-26 16:07:28
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \userpermission\control\controlDef.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
export interface KoaContext{
    request:KoaRequest;   
    response:KoaResponse;
    body:any;
    header:any;
    state:KoaState;
    throw(status?:number, msg?:string, properties?:any):any;
}
export interface KoaRequest{
    body:any;
    header:any;
    method:any;
    length:number;
    url:string;
    originalUrl:string;
    origin:string;
    href:string;
    path:string;
    querystring:string;
    search:string;
    host:string;
    hostname:string;
    URL:any;
    type:any;
    charset:string;
    query:any;
    protocol:string;
    ip:string;
    ips:any;
    subdomains:string[];
    is(...pm:string[]):string|null;
    socket:any;
    get(field:string):string;
}
export interface KoaResponse{
    header:any;
    socket:any;
    status:number;
    message:string;
    length:number;
    body:any;
    get(field:string):string|null;
    has(field:string):boolean;
    set(field:string,value:string):void;
    append(field:string,value:string):void;
    type:string;
    is(...pm:string[]):string|null;
    redirect(url:string, alt?:string):void;
}
export interface KoaState{
   user:KoaUser;
}
export interface KoaUser{
    name:string;
    id:number;
}
export function responseError(ctx:KoaContext,err:any) {
    if (err instanceof MyError) {            
        ctx.body = {
            status: err.code,
            msg: err.message,
            data: {}
        }
    }else{
        ctx.body = {
            status: ErrCodes.normalError.code ,
            msg: ErrCodes.normalError.msg,
            data: {}
        }
    }
}