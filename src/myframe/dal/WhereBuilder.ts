
/*
 * @Author: hzy
 * @Date: 2021-12-31 14:31:45
 * @LastEditTime: 2023-01-04 15:46:29
 * @LastEditors: your name
 * @Description: 前端查询参数构造 knex查询queryBuilder
 * @FilePath: \mytsdemo1\src\myAuth\dal\WhereBuilder.ts
 *  
 */

import { IMyQueryBuilder } from "./knexDef";

 

//Get
//    firstName=John  firstName_eq=John
// price_gte=3
// id_in=3&id_in=6&id_in=8
// _where[price_gte]=3     _where[0][price_gte]=3&[0][price_lte]=7
// Post
// {_where: [{ stars: 1 }, { pricing_lte: 20 }]}   { _where: { _or: [{ stars: 1 }, { pricing_gt: 30 }] } } 
// var opt=  [{ stars: 1 },{ pricing_lte: 20 },{_or:[{ stars: 1 }, { pricing_gt: 30 }]}];
// var opt1= { _or: [{ stars: 1 }, { pricing_gt: 30 }] };
// var opt2=[{ stars: 1 }, { pricing_lte: 20 }];
 

// var opt3= {
//    _or: [
//        [{ stars: 2 }, { pricing_lt: 80 }], // implicit AND
//        [{ stars: 1 }, { pricing_gte: 50 }], // implicit AND
//      ],
//    };
var operate = {
    _ne: "!=",
    _lt: "<",
    _gt: ">",
    _lte: "<=",
    _gte: ">=",
    _in: "in",
    _nin: "not in",
    _null: "is null",
    _nnull: "is not null",
    _lk: 'like',
    _nlk: 'not like'
}
interface IExpress {
    key: string,
    op: string,
    val: any,
    srcOp: string
}
/**
 * 查询条件构造操作类
 */
export class WhereBuilder {
    // queryBuilder:any;
    /**
     * 
     * @param qb 查询构造对象
     */
    constructor() {
        //  this.queryBuilder=qb;
        //console.log("this.queryBuilder",this.queryBuilder);
    }
    /**
     
     * @param opt 查询条件对象
     * @param where 使用where 或orWhere
     * @param qbOwner 查询构造对象
     * @returns 
     */
    private doBuild(opt: object, qbOwner: IMyQueryBuilder, where: string = "where",): IMyQueryBuilder {
        //  console.log("---",where);
        if (opt instanceof Array) {
            // and 处理
            for (var p of opt) {
                // console.log("builder",p);
                this.doBuild(p, qbOwner,where);
            }
        } else {
            //  or, not, 算术表达 处理
            for (var key in opt) {
                if (key == "_or") {
                    // console.log("sub where");

                    var that = this;
                    qbOwner.where((subQb:IMyQueryBuilder)=> {
                        that.doBuild((<any>opt)[key], subQb,"orWhere");
                    });

                } else if (key == "_not") {
                    // console.log("whereNot");
                    this.doBuild((<any>opt)[key],  qbOwner,"whereNot");
                } else {
                    var exp = this.doExpress(key, (<any>opt)[key]);
                    if (where == "where") {
                        // console.log("where",exp);
                        // if(qbOwner){
                        // console.log("owner");
                        if (exp.val)
                            qbOwner.where(exp.key, exp.op, exp.val);
                        // }else{
                        //     if(exp.val)
                        //         this.queryBuilder.where(exp.key,exp.op,exp.val);
                        // }

                    }
                    if (where == "orWhere") {
                        // console.log("orWhere",exp);                        
                        //if(qbOwner!=null){                            
                        if (exp.val)
                            qbOwner.orWhere(exp.key, exp.op, exp.val);
                        // }else{  
                        //     if(exp.val)                          
                        //         this.queryBuilder.orWhere(exp.key,exp.op,exp.val);
                        // }

                    }
                    //this.queryBuilder.where(arr[0],arr[1],arr[2]);
                }
            }
        }
        return qbOwner;//this.queryBuilder;
    }
    /**
     * * 传入参数opt 的三中形式
     * 1. 数组, 例如: [{ stars: 1 },{ pricing_lte: 20 },{_or:[{ stars: 1 }, { pricing_gt: 30 }]}]
     * 2. or, not 逻辑表达式, 例如:  { _or: [{ stars: 1 }, { pricing_gt: 30 }] }
     * 3. 算术表达 例如: { stars: 1 }
     * 构造查询对象
     * @param opt 查询条件对象    
     * @returns 
     */
    build(opt: object,qb:IMyQueryBuilder): IMyQueryBuilder {
        return this.doBuild(opt,qb);
    }

    /**
     * 转换表达式
     * @param key 表达式键 
     * @param val 表达式值
     * @returns 返回
     */
    private doExpress(key: string, val: any): IExpress {
        var rnt = { key: "", op: "", val: "", srcOp: "" };
        var find = false;
        for (var op in operate) {
            if (key.endsWith(op)) {
                var k = key.substr(0, key.length - op.length);
                var fh = (<any>operate)[op];
                rnt.key = k;
                rnt.op = fh;
                rnt.val = val;
                rnt.srcOp = op;
                //rnt.push(k,fh,val);  
                find = true
                break;
            }
        }
        if (!find) {
            //rnt.push(key,"=",val);
            rnt.key = key;
            rnt.op = "=";
            rnt.val = val;
        }
        return rnt;
    }
    /**
     * 查询字段转换到数据库字段
     * @param src 原始查询对象
     * @param map 字段映射表
     * @returns  数据库查询对象
     */
    convertField(src: any, map: any): any {
        if (typeof (src) != "object") {
            return undefined;
        }
        if (src instanceof Array) {
            // console.log("array");
            var rnt: any = [];
            for (var it of src) {
                rnt.push(this.convertField(it, map));
            }
            // console.log("create ",rnt);
            return rnt;
        } else {
            //console.log("obj");
            var rnt: any = {};
            for (var key in src) {
                //
                // console.log("key",key);
                var exp = this.doExpress(key, "");
                var toKey = exp.key + exp.srcOp;
                if (map[exp.key]) {
                    toKey = map[exp.key] + exp.srcOp;
                }
                //    
                if (typeof (src[key]) == "object") {
                    var innerObj = this.convertField(src[key], map);
                    //  console.log("innerObj",innerObj);      
                    rnt[toKey] = innerObj;
                } else {
                    rnt[toKey] = src[key];
                }
            }
            return rnt;
        }
    }
}


 