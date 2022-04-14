/*
 * @Author: your name
 * @Date: 2021-05-27 18:16:49
 * @LastEditTime: 2021-10-22 13:54:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\components\AppRecommend4\index.tsx
 */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { globalJump } from '@/utils/utils';
import style from './index.less';
// import ModelTitleBar from '../ModelTitleBar'; //头部标题栏
const AppRecommend_3_2 = (props: any) => {
  const { renderData } = props;

  return renderData ? (
    <div className={style.flex_container}>
      {/* <ModelTitleBar
        title={renderData.title}
        jumpData={renderData.elements.filter(
          (item: any) => !item.layout.includes('Page_Detail'),
        )}
      /> */}
      <div className={style.title}>{renderData.title}</div>

      <div className={style.flex_box}>
        {renderData.elements.map((item: any, index: number) => {
          if (index >= 5) return;
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
                <div className={style.content_title}>{item.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};
export default AppRecommend_3_2;
