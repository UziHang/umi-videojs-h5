import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    // dev 环境的请求基础地址
    // 'process.env.baseUrl': 'https://m-epg.cmishow.com:1443/',
    'process.env.baseUrl': 'http://223.121.14.254:8090/',
    'process.env.UDSUrl': 'https://uds-i.cmishow.com:1443/',
    'process.env.BiUrl': 'https://log.cmishow.com/wyx/',
    'process.env.voteUrl': 'http://223.121.14.247:8020/api/assets/likes',
    'process.env.drawUrl': 'http://223.121.14.254:8081/prize/statistics',
  },
});
