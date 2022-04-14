/*
 * @Author: your name
 * @Date: 2021-05-27 18:16:49
 * @LastEditTime: 2021-09-01 17:27:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\components\AppRecommend4\index.tsx
 */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { globalJump } from '@/utils/utils';
import ModelTitleBar from '../ModelTitleBar'; //头部标题栏
import styles from './index.less';

const AppRecommend_2N = (props: any) => {
  const { renderData } = props;

  return renderData.elements.filter((item: any) =>
    item.layout.includes('Page_Detail'),
  ).length > 0 ? (
    <div className={styles.flex_container}>
      <ModelTitleBar
        title={renderData.title}
        jumpData={renderData.elements.filter(
          (item: any) => !item.layout.includes('Page_Detail'),
        )}
      />
      <div className={styles.flex_box}>
        {renderData.elements
          .filter((item: any) => item.layout.includes('Page_Detail'))
          .map(
            (
              item: any, //app more 是 ’更多‘资产 垃圾接口
            ) => (
              <div
                key={item.elementId}
                className={styles.flex_item}
                onClick={() => globalJump(item)}
              >
                <div className={styles.img_box}>
                  {item.tagImage && (
                    <span
                      style={{
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        display: 'inline-block',
                        width: '0.52rem',
                        height: '0.28rem',
                        backgroundImage: `url(${item.tagImage})`,
                        backgroundSize: '100% 100%',
                      }}
                    ></span>
                  )}
                  <img data-src={item.contentImage} className="lazyload" />
                </div>
                <div className={styles.content_title}>{item.title}</div>
                <div className={styles.content_summary}>{item.summary}</div>
              </div>
            ),
          )}
      </div>
    </div>
  ) : null;
};

export default AppRecommend_2N;
