/*
 * @Author: your name
 * @Date: 2021-06-18 10:14:24
 * @LastEditTime: 2021-11-08 18:00:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\config\config.test.ts
 */

import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    // test 环境的请求基础地址
    'process.env.baseUrl': 'http://223.121.14.254:8090/',
    'process.env.UDSUrl': 'https://uds-i.cmishow.com:1443/',
    'process.env.BiUrl': 'https://log.cmishow.com/wyx/',
    // 'process.env.voteUrl': 'http://223.121.14.247:8020/api/assets/likes',  //测试环境
    'process.env.voteUrl': 'https://uds-i.cmishow.com/api/assets/likes', //正式接口
    'process.env.drawUrl': 'http://223.121.14.254:8081/prize/statistics',
  },
});
