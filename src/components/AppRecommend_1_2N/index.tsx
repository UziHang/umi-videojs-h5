/*
 * @Author: your name
 * @Date: 2021-05-27 18:16:49
 * @LastEditTime: 2021-09-01 17:33:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\components\AppRecommend4\index.tsx
 */
import AppRecommend_2N from '../AppRecommend_2N'; //下部 2N模块
import ModelTitleBar from '../ModelTitleBar';
import { globalJump } from '@/utils/utils';
import styles from './index.less';

const AppRecommend_1_2N = (props: any) => {
  const { renderData } = props;

  return renderData.elements.filter((item: any) =>
    item.layout.includes('Page_Detail'),
  ).length > 0 ? (
    <div className="container">
      <ModelTitleBar
        title={renderData.title}
        jumpData={renderData.elements.filter(
          (item: any) => !item.layout.includes('Page_Detail'),
        )}
      />
      <div
        className={styles.top_box}
        onClick={() => globalJump(renderData.elements[0])}
      >
        <div className={styles.img_box}>
          {renderData.elements[0].tagImage && (
            <span
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
                display: 'inline-block',
                width: '0.72rem',
                height: '0.52rem',
                backgroundImage: `url(${renderData.elements[0].tagImage})`,
                backgroundSize: '100% 100%',
              }}
            ></span>
          )}
          <img src={renderData.elements[0].contentImage} alt="" />
        </div>
        <div className={styles.content_title}>
          {renderData.elements[0].title}
        </div>
        <div className={styles.content_summary}>
          {renderData.elements[0].summary}
        </div>
      </div>

      <AppRecommend_2N
        renderData={{ title: '', elements: renderData.elements.slice(1) }}
      />
    </div>
  ) : null;
};

export default AppRecommend_1_2N;
