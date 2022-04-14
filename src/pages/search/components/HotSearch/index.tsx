/*
 * @Author: your name
 * @Date: 2021-06-15 13:50:58
 * @LastEditTime: 2021-08-06 11:58:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\src\pages\search\components\HotSearch\index.tsx
 */
import { getLocaleText } from '@/utils/utils';
import styles from './index.less';

const HotSearch = (props: any) => {
  const { hotSearchData, searchHot } = props;

  return hotSearchData ? (
    <div className={styles.hotBox}>
      <h3>{getLocaleText('search.page.hotSearch')}</h3>
      <div className={styles.hotWords}>
        {hotSearchData.map((item: any, index: number) => {
          return (
            <div
              key={index}
              className={styles.hotItem}
              onClick={() => searchHot(item.name)}
            >
              {`${index + 1}.${item.name}`}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};
export default HotSearch;
