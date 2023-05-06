/*
 * @Author: your name
 * @Date: 2022-01-26 15:32:23
 * @LastEditTime: 2022-01-26 15:38:34
 * @LastEditors: your name
 * @Description: 异常对象
 * @FilePath: \userpermission\util\myError.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

export class MyError{
    code:number;
    message:string;
    innerError:any;
    constructor(code:number,msg:string){
        this.code=code;
        this.message=msg;
    }
}

export const ErrCodes={
    missParam:{code:100,msg:"缺少参数"},
    normalError:{code:999,msg:"未知错误"}
}