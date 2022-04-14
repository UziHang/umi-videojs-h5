/*
 * @Author: your name
 * @Date: 2021-05-27 18:16:49
 * @LastEditTime: 2021-09-08 15:56:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\components\AppRecommend4\index.tsx
 */

import { useEffect, useRef, useState } from 'react';
import request from '@/utils/request';
import { Toast } from 'antd-mobile';
import {
  postWatchTime,
  postRelateWatchTime,
  biVod,
} from '@/utils/otherRequest';
import { history } from 'umi';
// @ts-ignore
import videojs from 'video.js';
import 'videojs-overlay';
// import 'videojs-landscape-fullscreen';
import 'video.js/dist/video-js.css';
import './index.less';

const DrawVideo = (props: any) => {
  const { renderData, assetDetail, type, login, minutes3 } = props;
  // const [maxTime, setMaxTime] = useState<number>(0);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<any>(null); //定时器
  const intervalRef2 = useRef<any>(null); //定时器
  const intervalBIRef = useRef<any>(null); //定时器
  const maxTime = useRef<any>(null);

  const [style, jsonUrl, playOptions, overlayOptions] = [
    //详情播放配置
    { margin: 0 },
    renderData.jsonUrl,
    {
      poster: renderData.contentImage,
      autoplay: false,
      controls: true,
      width: document.body.clientWidth * 0.8,
      height: (document.body.clientWidth * 2.4) / 5,
    },
    null,
  ];

  //渲染hook
  useEffect(() => {
    let player = playerRef.current && videojs(playerRef.current, playOptions);
    const getVideoData: any = async () => {
      const res = player.el && (await request.get(jsonUrl));
      if (!res.data.vodList[0]) {
        Toast.fail('loading fail,cannot be played!', 3, () => {
          history.go(-1);
        });
        return;
      }
      let initPlayer = () => {
        player &&
          player.src({
            src: res.data.vodList[0].playUrl,
            type: 'application/x-mpegURL',
          });
        overlayOptions && player.overlay(overlayOptions);
        // !/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent) &&
        //   player.landscapeFullscreen(); //安卓强制横屏
      };

      if (type !== 'detail') {
        const Observer = new IntersectionObserver(function (entries) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // entry.target元素进入区域了
              player && playerRef.current && initPlayer();
            }

            if (player && entries[0].intersectionRatio <= 0) {
              !player.paused() ? player.pause() : null;
            }
          });
        });
        playerRef.current && Observer.observe(playerRef.current);
      } else {
        initPlayer();
      }
    };

    getVideoData();

    return () => {
      player = null;
    };
  }, [renderData]);

  useEffect(() => {
    let time = 0;
    let time2 = 0;
    playerRef.current.addEventListener(
      'durationchange',
      () => {
        try {
          maxTime.current = playerRef.current.duration;
        } catch (error) {
          console.log(error);
        }
      },
      true,
    );
    playerRef.current.addEventListener('playing', () => {
      if (time >= maxTime.current || time2 >= maxTime.current) return;
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          time = time + 6;
          time <= maxTime.current &&
            localStorage.getItem('userInfo') &&
            postWatchTime('0.1');
          time <= maxTime.current &&
            type === 'shareDetail' &&
            postRelateWatchTime(
              assetDetail.userId,
              assetDetail.accountId,
              '0.01',
            ); //分享video
        }, 6000);
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          time = time + 6;
          time <= maxTime.current &&
            localStorage.getItem('userInfo') &&
            postWatchTime('0.1');
          time <= maxTime.current &&
            type === 'shareDetail' &&
            postRelateWatchTime(
              assetDetail.userId,
              assetDetail.accountId,
              '0.01',
            ); //分享video
        }, 6000);
      }

      if (!intervalRef2.current) {
        intervalRef.current = setInterval(() => {
          time2 = time2 + 1;
          if (!login) {
            time2 == 10 && Toast.fail('请登陆后参加活动', 3, () => {});
          }
          if (time2 >= 180) {
            minutes3(true);
          }
        }, 1000);
      } else {
        clearInterval(intervalRef2.current);
        intervalRef2.current = setInterval(() => {
          time2 = time2 + 1;
          if (!login) {
            time2 == 10 && Toast.fail('请登陆后参加活动', 3, () => {});
          }
          if (time2 >= 180) {
            minutes3(true);
          }
        }, 1000);
      }
    });

    playerRef.current.addEventListener('ended', () => {
      intervalRef.current && clearInterval(intervalRef.current);
      intervalRef2.current && clearInterval(intervalRef2.current);
    });
    return () => {
      //video页面生命周期销毁
      intervalRef.current && clearInterval(intervalRef.current);
      intervalRef2.current && clearInterval(intervalRef2.current);
    };
  }, [renderData]);

  //bi播放业务hook
  // useEffect(() => {
  //   let biTime = 0;
  //   let currentTime = 0;
  //   playerRef.current.addEventListener('playing', () => {
  //     if (!intervalBIRef.current) {
  //       intervalBIRef.current = setInterval(() => {
  //         if (biTime >= maxTime.current) return;
  //         biTime++;
  //       }, 1000);
  //       currentTime =
  //         playerRef.current &&
  //         playerRef.current.currentTime * 1000 > 0 &&
  //         playerRef.current.currentTime * 1000;
  //     } else {
  //       clearInterval(intervalBIRef.current);
  //       intervalBIRef.current = setInterval(() => {
  //         if (biTime >= maxTime.current) return;
  //         biTime++;
  //       }, 1000);
  //       currentTime =
  //         playerRef.current &&
  //         playerRef.current.currentTime * 1000 > 0 &&
  //         playerRef.current.currentTime * 1000;
  //     }
  //   });
  //   playerRef.current.addEventListener('ended', () => {
  //     console.log('结束实际观看时长' + biTime);
  //     const minuteTime = biTime >= maxTime.current ? maxTime.current : biTime;
  //     assetDetail &&
  //       biTime > 0 &&
  //       biVod(
  //         assetDetail.assetType,
  //         assetDetail.assetId,
  //         renderData.itemId,
  //         minuteTime * 1000,
  //         maxTime.current * 1000,
  //       );
  //     biTime = 0;
  //     intervalBIRef.current && clearInterval(intervalBIRef.current);
  //   });
  //   return () => {
  //     const minuteTime = biTime >= maxTime.current ? maxTime.current : biTime;
  //     assetDetail &&
  //       biTime > 0 &&
  //       biVod(
  //         assetDetail.assetType,
  //         assetDetail.assetId,
  //         renderData.itemId,
  //         minuteTime * 1000,
  //         //@ts-ignore
  //         parseInt(currentTime),
  //       );
  //     biTime = 0;
  //     intervalBIRef.current && clearInterval(intervalBIRef.current);
  //   };
  // }, [renderData]);

  return renderData ? (
    <div style={style}>
      <div data-vjs-player style={{}}>
        <video
          ref={playerRef}
          className="video-js vjs-big-play-centered"
          x5-video-player-type="h5-page" /*启用H5播放器,是wechat安卓版特性*/
          webkit-inline="true" //ios内联
          x-webkit-airplay="allow" //ios 投屏
          playsInline // 点击全屏时ios原生播放器小窗口播放
          webkit-playsinline="true" // 同上
          x5-video-player-fullscreen="true" //true支持全屏播放
          // style={{ objectFit: 'fill' }} //自动视口
        />
      </div>
    </div>
  ) : null;
};

export default DrawVideo;
