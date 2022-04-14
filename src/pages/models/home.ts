/*
 * @Author: your name
 * @Date: 2021-06-09 15:33:08
 * @LastEditTime: 2021-11-05 18:08:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\src\pages\home\home.ts
 */

import { Model } from 'dva';
import { getCurrent } from '@/utils/utils';

const HomeModel: Model = {
  namespace: 'home',
  state: {
    current: 0,
    navData: [],
    showAds: true,
    adsImg: '', //分享页图片配置
    topBgImage: '', // 栏目个性背景图（纯色）
    ADBgImage: '', // 栏目个性背景图（ad）
    searchWord: '', //公共搜索词
  },
  effects: {},
  reducers: {
    updateCurrent(state, { payload }: any) {
      return {
        ...state,
        current: payload.num,
        topBgImage: state.navData[payload.num].bgImage1,
        adsImg: state.navData[payload.num].bgImage2,
        ADBgImage: state.navData[payload.num].bgImage3,
      };
    },
    initCurrent(state, { payload }: any) {
      if (!document.cookie.includes('windowAdb=1')) {
        setTimeout(() => {
          document.cookie = `windowAdb=1;expires=${new Date(
            Date.now() + 86400000,
          )};path=/`;
        }, 0);
      }
      return {
        ...state,
        showAds: !document.cookie.includes('windowAdb=1'),
        navData: payload,
        current: getCurrent(payload),
        topBgImage: payload[getCurrent(payload)].bgImage1,
        adsImg: payload[getCurrent(payload)].bgImage2,
        ADBgImage: payload[getCurrent(payload)].bgImage3,
        searchWord: payload[payload.length - 1].title,
      };
    },
    updateAds(state) {
      return {
        ...state,
        showAds: false,
      };
    },
  },
};
export default HomeModel;
