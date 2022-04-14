/*
 * @Author: your name
 * @Date: 2021-06-15 13:50:43
 * @LastEditTime: 2021-07-02 14:54:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\src\pages\search\components\SearchHistory\index.tsx
 */
import { useState } from 'react';
import {
  deleteSearchHistory,
  getSearchHistory,
  getLocaleText,
} from '@/utils/utils';
import styles from './index.less';

const SearchHistory = (props: any) => {
  const { handleClear, searchHistory } = props;
  const [historyData, setHistoryData] = useState(getSearchHistory());

  return historyData ? (
    <div className={styles.historyBox}>
      <div className={styles.title}>
        <span>{getLocaleText('search.page.searchhistory')}</span>
        <span
          onClick={() => {
            deleteSearchHistory(), handleClear();
          }}
        ></span>
      </div>
      <div className={styles.listBox}>
        {historyData.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={styles.historyItem}
              onClick={() => searchHistory(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};
export default SearchHistory;
