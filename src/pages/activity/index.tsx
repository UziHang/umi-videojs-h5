/*
 * @Author: your name
 * @Date: 2021-06-01 14:15:49
 * @LastEditTime: 2021-11-09 16:29:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\special\index.tsx
 */
import React, { useEffect, useState } from 'react';
import { Toast } from 'antd-mobile';
import { postWatchList, postExchange } from '@/utils/otherRequest';
import style from './index.less';
import { history } from 'umi';

const activity = () => {
  const [data, setData] = useState<any>({
    effectTime: 0, //有效时长
    exchangeNum: 0, //已兑换币个数
    relateWatchTime: 0,
    userWatchTime: 0,
  });
  const [btnVisible, setBtnVisible] = useState(
    data.userWatchTime + data.relateWatchTime < 10,
  );

  const coinList = [
    { content: 1, coinNum: 1 },
    { content: 2, coinNum: 2 },
    { content: 5, coinNum: 5 },
    { content: 10, coinNum: 10 },
  ];
  useEffect(() => {
    if (!localStorage.getItem('userCode') && !localStorage.getItem('mobile')) {
      Toast.fail('请登录后再参与活动~', 2, () => {
        history.push({
          pathname: '/home',
        });
      });
      return;
    }

    const init = async () => {
      const res = await postWatchList();
      setData(res.data);
    };

    try {
      init();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const exchange = async (exchangeNum: number, exchangeTime: number) => {
    Toast.loading('兑换中', 0);
    try {
      const res = await postExchange(exchangeNum, exchangeTime);
      if (res.code !== 200) {
        Toast.fail(res.mes, 3);
      } else {
        setData(res.data);
        Toast.success('兑换成功', 1);
      }
    } catch (error) {
      Toast.fail('兑换失败，请稍后重试', 1);
    }
  };

  const filterCss = (item: any, index: number) => {
    return data.effectTime >= item.content &&
      data.exchangeNum <= 10 - item.content
      ? 'none'
      : 'grayscale(100%)';
  };

  return data ? (
    <div style={{ backgroundColor: '#E8587E' }}>
      <div className={style.container}>
        <div className={style.topImg}></div>
        {/* 兑换 */}
        <div className={style.timeBox}>
          <div className={style.timeTitle}></div>
          <div className={style.coinBox}>
            {coinList.map((item: any, index: number) => {
              return (
                <div
                  className={style.coinItem}
                  key={index}
                  style={{ filter: filterCss(item, index) }}
                  onClick={() => {
                    data.effectTime >= item.content &&
                      10 - data.exchangeNum >= item.content &&
                      exchange(item.coinNum, item.content);
                  }}
                >
                  <div className={style.top}>
                    <span className={style.x}>x</span>
                    <span>{item.coinNum}</span>
                  </div>
                  <div className={style.content}>观看{item.content}分钟</div>
                  <div className={style.button}>领取</div>
                </div>
              );
            })}
          </div>

          <div className={style.timeContent}>
            <div className={style.timeTop}>
              <div className={style.total}>
                总计时长：
                {(data.userWatchTime + data.relateWatchTime).toFixed(2)}分钟
              </div>
              <div className={style.use}>
                可兑换时长：{10 - data.exchangeNum}
                /10分钟
              </div>
            </div>
            <div className={style.content_bar}>
              <div
                className={style.bar_me}
                style={{ width: `${(data.userWatchTime * 5.9) / 10}rem` }}
              ></div>
              <div
                className={style.bar_friend}
                style={{ width: `${(data.relateWatchTime * 5.9) / 10}rem` }}
              ></div>
            </div>
            <div className={style.summary}>
              <div className={style.me}>
                <span></span>本人观看时长：{data.userWatchTime}分钟
              </div>
              <div className={style.friend}>
                <span></span>好友贡献时长：{data.relateWatchTime}分钟
              </div>
            </div>
          </div>
        </div>

        {/* 规则 */}
        <div className={style.rulerBox}>
          <div className={style.rulerTitle}></div>
          <div>
            <span>
              1) 此活动仅针对无忧行APP中国内地手机号注册用户（以下简称“用户”）
              ；
            </span>
            <span>
              2)
              用户在无忧行看世界页面观看视频达指定时长即可领取无忧币；每位用户于活动期间每日领取上限为10个无忧币；
            </span>
            <span>
              3)
              每日观看视频累计达1分钟，可领取1个无忧币；每日观看视频累计达2分钟，可领取2个无忧币；每日观看视频累计达5分钟，可领取5个无忧币；每日观看视频累计达10分钟，可领取10个无忧币；
            </span>
            <span>
              4)
              用户分享视频给好友，好友观看时长的10%将同步计入分享者的观看时长；
            </span>
            <span>
              5)
              每日未兑换或超出当日兑换上限的观看时长，将于次日凌晨12时（北京时间）清零；
            </span>

            <span>
              6) 用户可于“无忧行APP &gt; 我的 &gt;
              无忧币”查看及兑换相应礼品，此活动无忧币兑换条件与细则遵循无忧行APP相关规定；
            </span>

            <span>7) 无忧币限量发放，领完即止，恕不另行通知；</span>
            <span> 8) 此活动最终解释权归中国移动国际有限公司所有。 </span>
          </div>
        </div>
      </div>
      {btnVisible && (
        <div
          className={style.leaveBtn}
          onClick={() => {
            history.push({
              pathname: '/home',
            });
          }}
        >
          金币不够 继续观看视频
        </div>
      )}
    </div>
  ) : null;
};

export default activity;
