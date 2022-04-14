/*
 * @Author: your name
 * @Date: 2021-05-27 18:16:49
 * @LastEditTime: 2021-07-13 11:37:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\components\AppRecommend4\index.tsx
 */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import style from './index.less';
import ModelTitleBar from '../ModelTitleBar';
import { globalJump } from '@/utils/utils';

const AppAds = (props: any) => {
  const { renderData } = props;

  return renderData ? (
    <div className={style.flex_container}>
      <ModelTitleBar title={renderData.title} jumpData={[]} />

      <div className={style.flex_box}>
        {renderData.elements.map((item: any, index: number) => {
          return (
            <div
              key={item.elementId}
              className={style.flexItem}
              onClick={() => globalJump(item)}
            >
              <div className={style.img_box}>
                <img data-src={item.contentImage} className="lazyload" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default AppAds;
