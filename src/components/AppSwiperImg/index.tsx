/*
 * @Author: your name
 * @Date: 2021-05-27 18:16:59
 * @LastEditTime: 2021-07-09 09:46:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\components\AppSwiperImg\index.tsx
 */
//@ts-ignore

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Autoplay } from 'swiper/core';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'swiper/swiper.less';
import styles from './index.less';
import { globalJump } from '@/utils/utils';

const AppSwiperImg = (props: any) => {
  const { renderData } = props;
  SwiperCore.use([Pagination, Autoplay]);
  return renderData ? (
    <div className={styles.carouselBox}>
      <Swiper
        pagination={{
          clickable: true,
        }}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000, //自动滚屏速度
          disableOnInteraction: false,
        }}
      >
        {renderData.elements.map((item: any) => (
          <SwiperSlide key={item.elementId}>
            <div className={styles.imgBox} onClick={() => globalJump(item)}>
              {item.tagImage && (
                <span
                  style={{
                    position: 'absolute',
                    right: '0',
                    top: '0',
                    display: 'inline-block',
                    width: '0.72rem',
                    height: '0.52rem',
                    backgroundImage: `url(${item.tagImage})`,
                    backgroundSize: '100% 100%',
                  }}
                ></span>
              )}
              <img data-src={item.contentImage} className="lazyload" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : null;
};
export default AppSwiperImg;
