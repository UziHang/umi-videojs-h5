/*
 * @Author: your name
 * @Date: 2021-06-11 10:00:40
 * @LastEditTime: 2021-06-23 17:42:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\src\pages\detail\components\DetailActivity\index.tsx
 */
import { history } from 'umi';
import styles from './index.less';

const DetailActivity = () => {
  const content = [
    { summary: '活动1：看视频领无忧币' },
    { summary: '活动2：分享视频有机会获得奖品' },
  ];

  const jumpActivity = (item: any) => {
    history.push({
      pathname: '/activity',
    });
  };

  return (
    <div className={styles.activityBox}>
      {content.map((item: any, index: number) => {
        return (
          <div
            className={styles.activity}
            key={index}
            onClick={() => {
              jumpActivity(item);
            }}
          >
            <span></span>
            {content[index].summary}
          </div>
        );
      })}
    </div>
  );
};

export default DetailActivity;
