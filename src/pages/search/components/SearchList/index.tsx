/*
 * @Author: your name
 * @Date: 2021-06-15 13:50:50
 * @LastEditTime: 2021-06-28 15:10:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\src\pages\search\components\SearchList\index.tsx
 */

import { history } from 'umi';
import styles from './index.less';

const SearchList = (props: any) => {
  const { searchListData } = props;

  const jumpDdetail = (item: any) => {
    history.push({
      state: { detailUrl: item.jsonUrl },
      pathname: '/detail',
    });
  };

  return searchListData ? (
    <div>
      <div className={styles.flex_box}>
        {searchListData.map((item: any) => {
          return (
            <div
              key={item.id}
              className={styles.flex_item}
              onClick={() => jumpDdetail(item)}
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
              <img src={item.image} alt="" />
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className={styles.search_alert}>
      <p>未搜索到相关视频</p>
      <p>请换个词再试试吧</p>
    </div>
  );
};

export default SearchList;
