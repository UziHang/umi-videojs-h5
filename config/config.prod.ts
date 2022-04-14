import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    // 正式环境的请求基础地址
    'process.env.baseUrl': 'https://m-epg.cmishow.com:1443/',
    'process.env.UDSUrl': 'https://uds-i.cmishow.com:1443/',
    'process.env.BiUrl': 'https://log.cmishow.com/wyx/',
    'process.env.voteUrl': 'https://223.121.14.236/api/assets/likes',
    'process.env.drawUrl': 'https://bms-i.cmishow.com/prize/statistics',
  },
});
