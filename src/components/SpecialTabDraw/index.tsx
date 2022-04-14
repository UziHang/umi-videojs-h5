/*
 * @Author: wuzh
 * @LastEditTime: 2021-11-04 17:51:12
 * @LastEditors: Please set LastEditors
 * @Description: 特色专题页
 */

import { useEffect, useState, useRef } from 'react';
import { InputItem, Toast, Button } from 'antd-mobile';
import { Swiper, SwiperSlide } from 'swiper/react';
import DrawVideo from './DrawVideo';
import request from '@/utils/request';
import 'swiper/swiper.less';
import styles from './index.less';
const SpecialTabDraw = (props: any) => {
  const { renderData } = props;
  const [popShow, setPopShow] = useState(false);
  const [popShow2, setPopShow2] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [minutes3, setMinute3] = useState(false);
  const [login, setLogin] = useState(
    localStorage.getItem('userCode') && localStorage.getItem('mobile'),
  );
  const [latest, setLatest] = useState([]);
  const [list, setList] = useState([]);
  const [word, setWord] = useState([
    '3元话费',
    '10元话费',
    '3元话费+腾讯视频VIP月卡',
    '10元话费+腾讯视频VIP月卡',
  ]);
  const intervalRef = useRef<any>(null); //定时器

  useEffect(() => {
    const init = async () => {
      const latest = await request.get(`${process.env.drawUrl}/latest`);
      setLatest(latest);
      const list = await request.get(`${process.env.drawUrl}/list`);
      const demo = list.map((item: any, index: number) => {
        let obj: any = {};
        obj.date = Object.keys(item)[0];
        obj.list = item[obj.date];
        return obj;
      });
      setList(demo);
    };
    init();

    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, []);

  const onErrorClick = () => {
    hasError && Toast.info('请输入11位有效手机号');
  };

  const onChange = (value: string) => {
    if (value.replace(/\s/g, '').length < 11) {
      setHasError(true);
    } else {
      setHasError(false);
    }
    setInputValue(value);
  };

  const onSubmit = () => {
    request
      .get(
        `${process.env.drawUrl}/save?user=${localStorage.getItem(
          'userCode',
        )}&phonenum=${inputValue}`,
      )
      .then((res) => {
        if (res.code === 200) {
          Toast.success('提交成功~', 1);
        } else {
          Toast.fail(res.message, 1);
        }
      });
  };

  return renderData ? (
    <div
      className={styles.bodyBox}
      style={{
        width: '7.5rem',
        height: `${renderData.summary.split('|')[1] / 100}rem`,
        backgroundImage: `url(${renderData.bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        position: 'relative',
      }}
    >
      {latest.length > 0 && (
        <div className={styles.nameBox}>
          <Swiper
            direction={'horizontal'}
            loop={true}
            observer={true}
            observeParents={true}
            autoplay={{
              delay: 1000, //自动滚屏速度
              disableOnInteraction: false,
            }}
          >
            {latest.map((item: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  {item.phonenum.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}{' '}
                  {item.prize}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
      )
      <div
        className={styles.ruleBtn}
        onClick={() => {
          setPopShow(true);
        }}
      >
        活动规则
      </div>
      <div
        className={styles.listBtn}
        onClick={() => {
          setPopShow2(true);
        }}
      >
        中奖名单
      </div>
      <div className={styles.inputBox}>
        <InputItem
          className="inputCss"
          style={{
            height: '35px',
            width: '52vw',
            fontSize: '14px',
            border: '2px solid #ff628d',
            backgroundColor: 'rgba(0, 0, 0, 0)',
          }}
          placeholder="请输入话费红包领取号码"
          error={hasError}
          onErrorClick={onErrorClick}
          onChange={onChange}
          value={inputValue}
        ></InputItem>
        <Button
          style={{
            width: '25vw',
            height: '30px',
            fontSize: '16px',
            lineHeight: '30px',
            marginTop: '7px',
            backgroundColor: '#ff628d',
            borderRadius: '2px',
            color: '#fff',
            filter: minutes3 ? 'opacity(100%)' : 'grayscale(100%)',
          }}
          onClick={() => {
            if (!minutes3 || !localStorage.getItem('userCode')) {
              Toast.fail('观看时长需要满3分钟才能领取哦~', 3);
            } else {
              onSubmit();
            }
          }}
        >
          立即领取 <div className={styles.square}></div>{' '}
        </Button>
      </div>
      <div className={styles.videoBox}>
        {renderData.elements.map((item: any, index: number) => {
          return (
            <div key={index} className={styles.videoItem}>
              <DrawVideo
                renderData={item}
                login={login}
                minutes3={(value: boolean) => {
                  console.log(value);
                  setMinute3(value);
                }}
              />
            </div>
          );
        })}
      </div>
      {/* <div className={styles.enterBtn}>
        {!login && (
          <div
            className={styles.linkToApp}
            onClick={() =>
              (window.location.href = 'http://hotapp.jegotrip.com.cn/23110272')
            }
          >
            点击进入无忧行APP
          </div>
        )}
      </div> */}
      {popShow && (
        <div className={styles.popBox}>
          <div className={styles.bodyBox}>
            <div className={styles.contentBox}>
              1）此活动仅针对无忧行APP中国内地手机号注册用户（以下简称“用户”）;
              <br />
              2）活动期间（2022年1月10日至1月21日）用户进入活动页面点播同一视频累计达3分钟，即可参与领话费红包及腾讯视频月度会员权益活动，同一登陆用户活动期间只能参与一次领取；
              <br />
              3）以每日0点起计算，每日话费红包限量20个，每日前3名完成任务用户将额外获得腾讯视频VIP月卡，领完即止；
              <br />
              4）用户进入活动页面观看视频时长将同步累计至无忧币每日领取活动，用户在活动页面之外的看世界栏目观看视频时长不会记录至此页面；
              <br />
              5）活动期间，次日将在中奖名单页面更新前一日获奖用户名单，用户可进入活动页面查看，中奖用户奖品将在工作日48小时内完成充值与发放。如遇周末，名单公布及奖品发放则顺延至工作日，请中奖用户注意查询页面及短信；
              <br />
              6）此活动最终解释权归中国移动国际有限公司所有。
            </div>
          </div>
          <div
            className={styles.quit}
            onClick={() => {
              setPopShow(false);
            }}
          ></div>
        </div>
      )}
      {popShow2 && (
        <div className={styles.popBox}>
          <div className={styles.listBox}>
            {list && (
              <div className={styles.contentBox}>
                <div className={styles.word}>获奖名单次日更新，请多多关注</div>
                {list.slice(1).map((item: any, index) => {
                  return (
                    <div key={index}>
                      <div className={styles.date}>{item.date}</div>
                      <div className={styles.userBox}>
                        {item.list.map((item: any, index: number) => {
                          return (
                            <div className={styles.userItem} key={index}>
                              {item.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}{' '}
                              {index <= 2 ? word[3] : word[1]}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div
            className={styles.quit}
            onClick={() => {
              setPopShow2(false);
            }}
          ></div>
        </div>
      )}
    </div>
  ) : null;
};

export default SpecialTabDraw;
