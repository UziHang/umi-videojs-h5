/*
 * @Author: your name
 * @Date: 2021-05-27 18:16:59
 * @LastEditTime: 2021-07-13 18:32:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\components\AppSwiperImg\index.tsx
 */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import ModelTitleBar from '../ModelTitleBar';
import style from './index.less';
import { globalJump } from '@/utils/utils';

const AppHorizontalRecommend = (props: any) => {
  const { renderData } = props;

  return renderData ? (
    <div className={style.flex_container}>
      <div
        className={style.bgBox}
        style={{ backgroundImage: `url(${renderData.bgImage})` }}
      ></div>
      <ModelTitleBar
        title={' '}
        fatherType={'AppHorizontalRecommend'}
        jumpData={renderData.elements.filter(
          (item: any) => !item.layout.includes('Page_Detail'),
        )}
      />
      <div className={style.bigBox}>
        <div className={style.flex_box}>
          {renderData.elements
            .filter((item: any) => item.layout.includes('Page_Detail'))
            .map((item: any) => {
              return (
                <div
                  key={item.elementId}
                  className={style.flex_item}
                  onClick={() => globalJump(item)}
                >
                  <div className={style.img_box}>
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
                  <div className={style.content_title}>{item.title}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  ) : null;
};
export default AppHorizontalRecommend;
