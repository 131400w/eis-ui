import request = require('request')
//import xml2js = require('xml2js')

export class HttpUtil {
    /**
   * 同步调用社会救助API ,按表单方式提交
   * @param url  地址
   * @param option  参数
   */
    postAsync(option: PostOption) {
        // var fun = function () {
        return new Promise<any>(function (resolve, reject) {
            request.post({
                url: option.url,
                headers: option.headers,
                formData: option.body
            }, function (error:any, response:any, body:any) {
                
                if (error) {
                    reject(error);
                    var msg = `option:${JSON.stringify(option)} ${error} --> ${error.stack || ''}\n`;                   
                    //errLogger(msg, ".net 服务", '系统日志')
                }
                else {
                    resolve(body);
                    var msg = `option:${JSON.stringify(option)} return --> ${ JSON.stringify(body) } \n`    ;
                  //  fileLogger(msg, ".net 服务", '系统日志');
                }

            });
        });
        // };
        // return fun();
    }
     
    /**
     * 请求Net应用Api
     * @param url
     * @param param
     */
    async postToNetAppAsync(url:string, param:any) {
        var opt = new PostOption(url, param);
        return await this.postFormAsync(opt);
    }
    /**
   * 同步调用社会救助API ,按表单方式提交
   * @param url  地址
   * @param option  参数
   */
    postFormAsync(option: PostOption) {
        // var fun = function () {
        return new Promise<any>(function (resolve, reject) {
            request.post({
                url: option.url,
                headers: option.headers,//option.headers,
                form: option.body
            }, function (error:any, response:any, body:any) {
               
                if (error) {
                    reject(error);
                    var msg = `option:${JSON.stringify(option)} ${error}--> ${error.stack || ''}\n` ;
                    //errLogger(msg, ".net 服务", '系统日志')
                }
                else {
                    resolve(body);
                    var msg = `option:${JSON.stringify(option)} return--> ${JSON.stringify(body)}\n`;
                    //fileLogger(msg, ".net 服务", '系统日志');
                }

            });
        });
        // };
        // return fun();
    }

    /**
    * 异步调用社会救助API,按表单方式提交
    * @param option  参数
    * @param success  成功回调
    * @param falut   失败回调
    * isSign 是否签名
    */
    post(option: PostOption, success: Function, falut: Function) {
        request.post({
            url: option.url,
            headers: option.headers,
            formData: option.body
        }, function (error:any, response:any, body:any) {            
            if (error) {
                falut(error);
                var msg = `option:${JSON.stringify(option)} ${error} --> ${(error.stack || '')}\n`;
                //errLogger(msg, "app服务", '系统日志');
            }
            else {
                success(body);
                var msg = `option:${JSON.stringify(option)} return--> ${JSON.stringify(body)}\n`;
               // fileLogger(msg, ".net 服务", '系统日志');
            }
        });
    }
    postJson(option: PostOption, success: Function, falut: Function) {        
        option.headers["content-type"]="application/json";
        option.headers['user-agent']='ApiPOST Runtime +https://www.apipost.cn';
        option.headers['accept-encoding']='gzip, deflate, br';
        option.headers['accept']='*/*';
        option.headers['connection']='keep-alive';
        request({
            url: option.url,
            method: "POST",
            json: true,
            headers: option.headers,
            body:  option.body
        }, function (error:any, response:any, body:any) {            
            if (error) {
                falut(error);
                var msg = `option:${JSON.stringify(option)} ${error} --> ${(error.stack || '')}\n`;
               // errLogger(msg, "app服务", '系统日志');
            }
            else {
                success(body);
                var msg = `option:${JSON.stringify(option)} return--> ${JSON.stringify(body)}\n`;
               // fileLogger(msg, ".net 服务", '系统日志');
            }
        });

    }
    postJsonAsync(option: PostOption) {
        var that = this;
        return new Promise<any>(function (resolve, reject) {
            option.headers['content-type'] = "application/json";
            option.headers['user-agent']='ApiPOST Runtime +https://www.apipost.cn';
            option.headers['accept-encoding']='gzip, deflate, br';
            option.headers['accept']='*/*';
            option.headers['connection']='keep-alive';
            request({
                url: option.url,
                method: "POST",
                json: true,
                headers: option.headers,
                body: JSON.stringify(option.body)
            }, function (error:any, response:any, body:any) {
                
                if (error) {
                    reject(error);
                    var msg = `option:${JSON.stringify(option)} ${error} --> ${(error.stack || '')}\n`;
                    //errLogger(msg, "app服务", '系统日志');
                }
                else {
                    resolve(body);
                    var msg = `POST option:${JSON.stringify(option)} return--> ${JSON.stringify(body)}\n`;
                    console.log(msg);
                    //fileLogger(msg, ".net 服务", '系统日志');
                }
            });
        });
    }
    getAsync(option: PostOption) {
        var that = this;
        option.headers['content-type'] = "application/json";
            option.headers['user-agent']='ApiPOST Runtime +https://www.apipost.cn';
            option.headers['accept-encoding']='gzip, deflate, br';
            option.headers['accept']='*/*';
            option.headers['connection']='keep-alive';
        return new Promise<any>(function (resolve, reject) {
            var paramStr = '';
            for (var key in option.body) {
                paramStr += key + "=" + option.body[key] + "&";
            }
            console.log("12312312231---" + paramStr);
            var opt = {
                url: option.url + "?" + paramStr,
                method: "GET",
                headers: option.headers
            }
            request(opt, function (error:any, response:any, body:any) {
                 
                if (error) {
                    reject(error);
                    var msg = `option:${JSON.stringify(option)} ${error} --> ${(error.stack || '')}\n`;
                   //errLogger(msg, "app服务", '系统日志');
                }
                else {
                    resolve(body);
                  //  var parser = new xml2js.Parser({ explicitArray: false, ignoreAttrs: true });   //xml -> json
                    //parser.parseString(body, function (err, result) {
                    //    console.log('xml解析成json:' + JSON.stringify(result));
                    //    resolve(result);
                    //});
                    var msg = `option:${JSON.stringify(option)} return--> ${JSON.stringify(body)}\n`;
                    //fileLogger(msg, ".net 服务", '系统日志');
                }
            });
        });
    }
    uploadPost(option: PostOption) {
        var that = this;
        return new Promise<any>(function (resolve, reject) {
            let boundaryKey = '----' + new Date().getTime();    // 用于标识请求数据段
            option.headers['Content-Type'] = "multipart/form-data; boundary=" + boundaryKey;
            option.headers['Connection'] = "keep-alive";
            request({
                url: option.url,
                method: "POST",
                headers: option.headers
            }, function (error:any, response:any, body:any) {
                 
                if (error) {
                    reject(error);
                    var msg = `option:${JSON.stringify(option)} ${error} --> ${(error.stack || '')}\n`;
                   // errLogger(msg, "app服务", '系统日志');
                }
                else {
                    resolve(body);
                    var msg = `option:${JSON.stringify(option)} return--> ${JSON.stringify(body)}\n`;
                  //  fileLogger(msg, ".net 服务", '系统日志');
                }
            });
        });
    }
}
/**
 * 提交参数
 * */
export class PostOption {
    url: string;
    headers:any = {};//{ "go-token": '' };
    body: any;
    /**
     * 构造提交参数
     * @param url  请求地址
     * @param body  提交参数对象
     * @param token
     */
    constructor(url: string, body: object, token: string = "") {
        this.url = url;        
        this.body = body;
        // if (token != null) {
        //     this.headers["go-token"] = token;
        //     this.body["go-token"] = token;
        // }        
    }
     
}