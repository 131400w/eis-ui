/*
 * @Author: your name
 * @Date: 2023-01-17 14:18:45
 * @LastEditTime: 2023-01-17 14:42:38
 * @LastEditors: your name
 * @Description: 
 * @FilePath: \smtyum\config\server.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 5008),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
