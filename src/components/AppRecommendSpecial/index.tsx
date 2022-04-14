/*
 * @Author: your name
 * @Date: 2021-05-27 18:16:49
 * @LastEditTime: 2021-07-08 16:59:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\components\AppRecommend4\index.tsx
 */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { globalJump, getLocaleText } from '@/utils/utils';
import styles from './index.less';

const AppRecommendSpecial = (props: any) => {
  const { renderData } = props;

  const topTitle = [
    {
      icon: require('@/assets/images/index/hot@2x.png'),
      title: getLocaleText('home.page.hot'),
    },
    {
      icon: require('@/assets/images/index/good@2x.png'),
      title: getLocaleText('home.page.good'),
    },
  ];

  return renderData ? (
    <div className={styles.flexBox}>
      {renderData.elements.map((item: any, index: number) => {
        if (index > 1) return;

        return (
          <div
            key={item.elementId}
            className={styles.flexItem}
            style={{ backgroundImage: `url(${item.iconImage})` }}
            onClick={() => globalJump(item)}
          >
            <div className={styles.topTitle}>
              <span
                style={{ backgroundImage: `url(${topTitle[index].icon})` }}
              ></span>
              <span className={styles.bigTitle}>{topTitle[index].title}</span>
            </div>
            <div className={styles.imgBox}>
              <img data-src={item.contentImage} className="lazyload" />
            </div>
            <div className={styles.contentBox}>
              <div className={styles.bottomTitle}>{item.title}</div>
              <div className={styles.summary}>{item.summary}</div>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default AppRecommendSpecial;
