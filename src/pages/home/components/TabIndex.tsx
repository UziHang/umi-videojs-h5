/*
 * @Author: your name
 * @Date: 2021-05-27 18:12:50
 * @LastEditTime: 2022-02-07 11:33:28
 * @LastEditors: jiangjie
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\home\components\TabIndex.tsx
 */
import React, { Suspense } from 'react';
const imgUrl = require('@/assets/images/index/loading.gif');
const Subnav = React.lazy(() => import('@/components/Subnav'));
const AppSwiperImg = React.lazy(() => import('@/components/AppSwiperImg'));
const AppRecommend_2N = React.lazy(
  () => import('@/components/AppRecommend_2N'),
);
const AppRecommend_1_2N = React.lazy(
  () => import('@/components/AppRecommend_1_2N'),
);
const AppTextInformation = React.lazy(
  () => import('@/components/AppTextInformation'),
);
const AppRecommend_3_2 = React.lazy(
  () => import('@/components/AppRecommend_3_2'),
);
const AppHorizontalRecommend = React.lazy(
  () => import('@/components/AppHorizontalRecommend'),
);
const MoreRecommend = React.lazy(() => import('@/components/MoreRecommend'));
const AppRecommendSpecial = React.lazy(
  () => import('@/components/AppRecommendSpecial'),
);
const AppRecommendVideo = React.lazy(
  () => import('@/components/AppRecommendVideo'),
);
const AppAds = React.lazy(() => import('@/components/AppAds'));
const SpecialTabTopic = React.lazy(
  () => import('@/components/SpecialTabTopic'),
);
const SpecialTabVote = React.lazy(() => import('@/components/SpecialTabVote'));
const SpecialTabDraw = React.lazy(() => import('@/components/SpecialTabDraw'));
const AwardList = React.lazy(() => import('@/components/AwardList/home'));
const AppHoverButton = React.lazy(() => import('@/components/AppHoverButton'));
const TabIndex = (props: any) => {
  const { itemData, layout } = props;
  const maps: any = {
    app_recommend_2N: AppRecommend_2N,
    'app_recommend_1+2N': AppRecommend_1_2N,
    app_swiper_img: AppSwiperImg,
    app_horizontal_recommend: AppHorizontalRecommend,
    app_text_information: AppTextInformation,
    more_recommend: MoreRecommend,
    'app_recommend_3+2': AppRecommend_3_2,
    app_recommend_special: AppRecommendSpecial,
    app_recommend_video: AppRecommendVideo,
    app_ads: AppAds,
    app_recommend_4: AppRecommend_2N,
    app_recommend_5: AppRecommend_1_2N,
    app_recommend_7: AppRecommend_1_2N,
    app_ad_banner: AppAds,
    SpecialTabTopic: SpecialTabTopic,
    SpecialTabVote: SpecialTabVote,
    SpecialTabDraw: SpecialTabDraw,
    AwardList: AwardList,
    app_hover_button: AppHoverButton,
  };

  return itemData ? (
    <Suspense
      fallback={
        <div
          className="loading"
          style={{
            backgroundImage: `url(${imgUrl})`,
            width: '64px',
            height: '64px',
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            WebkitTransform: 'translate(-50%,-50%)',
          }}
        ></div>
      }
    >
      {layout === 'Category_Activity' ? ( //特殊栏目 活动模板
        <div
          style={{
            position: 'relative',
          }}
        >
          {itemData.map((item: any, index: number) => {
            if (!maps[item.layout]) return;
            const C = maps[item.layout];
            return <C key={index} renderData={item} />;
          })}
        </div>
      ) : (
        <div style={{ margin: '0.2rem' }}>
          <Subnav
            categoryObj={itemData.find(
              (item: { layout: string }) =>
                item.layout === 'app_screening_lable', //筛选 搜索元素
            )}
          />
          {itemData.map((item: any, index: number) => {
            if (!maps[item.layout] || !item.playFlag) return;
            const C = maps[item.layout];
            return <C key={index} renderData={item} />;
          })}
        </div>
      )}
    </Suspense>
  ) : null;
};
export default TabIndex;
