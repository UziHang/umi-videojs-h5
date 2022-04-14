/*
 * @Author: your name
 * @Date: 2021-06-15 13:50:50
 * @LastEditTime: 2021-07-09 14:07:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\src\pages\search\components\SearchList\index.tsx
 */
//@ts-ignore
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { Jump } from '@/utils/utils';
import styles from './index.less';

const ModelFlexList = (props: any) => {
  const { renderData } = props;

  return renderData ? (
    <div>
      <div className={styles.flex_box}>
        {renderData.map((item: any) => {
          return (
            <div
              key={item.assetId || item.id || item.elementId}
              className={styles.flex_item}
              onClick={() => globalJump(item)}
            >
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
              <img
                data-src={item.assetImg || item.image || item.contentImage}
                className="lazyload"
              />
              <p>{item.assetName || item.name || item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default ModelFlexList;
