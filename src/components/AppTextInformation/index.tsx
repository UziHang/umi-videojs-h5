/*
 * @Author: your name
 * @Date: 2021-05-27 18:16:49
 * @LastEditTime: 2021-07-08 17:00:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\components\AppRecommend4\index.tsx
 */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import ModelTitleBar from '../ModelTitleBar'; //头部标题栏
import { globalJump } from '@/utils/utils';
import styles from './index.less';

const AppTextInformation = (props: any) => {
  const { renderData } = props;

  return renderData ? (
    <div className={styles.contain_box}>
      <ModelTitleBar
        title={renderData.title}
        jumpData={renderData.elements.filter(
          (item: any) => !item.layout.includes('app_text_information'),
        )}
      />
      <div className={styles.text_box}>
        {renderData.elements.map((item: any) => {
          return (
            <div
              key={item.elementId}
              className={styles.content_box}
              onClick={() => globalJump(item)}
            >
              <div className={styles.content_summary}>{item.newsInfo.name}</div>
              <div className={styles.img_box}>
                <img data-src={item.newsInfo.coverImg} className="lazyload" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default AppTextInformation;
