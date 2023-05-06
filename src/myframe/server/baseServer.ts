/*
 * @Author: your name
 * @Date: 2023-01-31 16:20:25
 * @LastEditTime: 2023-01-31 16:20:33
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \smtyum\src\myframe\server\baseServer.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { MySqlHelper } from "../dal/MySqlHelper";

export class BaseServer{
    help:MySqlHelper;
    constructor(){
        //使用基类的help, 必须保证同一个业务对象, 执行多个方法时必须同步执行, 否则前一个方法可能会关闭连接,造成后一个方法不能正确执行
        this.help=new MySqlHelper();
    }
     
}