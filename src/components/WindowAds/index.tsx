/*
 * @Author: your name
 * @Date: 2021-06-25 17:44:54
 * @LastEditTime: 2021-06-28 12:10:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\src\components\WindowAdb\index.tsx
 */
import { useState, useEffect } from 'react';
import { connect } from 'dva';
import request from '@/utils/request';
import { globalJump } from '@/utils/utils';
import styles from './index.less';

const WindowAds = (props: any) => {
  const [adsData, setAdsData] = useState<any>();

  const { dispatch, renderData, showAds } = props;

  useEffect(() => {
    const init = async () => {
      const res = await request.get(renderData.jsonUrl);
      setAdsData(res.data.comps[0].elements[0]);
    };
    try {
      init();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const changeVisible = () => {
    dispatch({
      type: 'home/updateAds',
    });
  };
  return adsData && showAds ? (
    <div className={styles.windowBox}>
      <div className={styles.adbBox}>
        <div
          className={styles.imgBox}
          onClick={() => {
            globalJump(adsData);
            changeVisible();
          }}
        >
          <img src={adsData.contentImage} alt="" />
        </div>
        <div
          className={styles.quit}
          onClick={() => {
            changeVisible();
          }}
        ></div>
      </div>
    </div>
  ) : null;
};

export default connect(({ home }: any) => ({
  showAds: home.showAds,
}))(WindowAds);
