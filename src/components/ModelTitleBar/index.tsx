/*
 * @Author: your name
 * @Date: 2021-05-28 18:12:24
 * @LastEditTime: 2021-07-02 18:19:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\components\ModelTitleBar\index.tsx
 */

import { globalJump, getLocaleText } from '@/utils/utils';
import styles from './index.less';
const ModelTitleBar = (props: any) => {
  const { title, jumpData } = props;
  return (
    title && (
      <div className={styles.top_box}>
        <div className={styles.title}>{title}</div>
        {jumpData.length > 0 && (
          <span onClick={() => globalJump(jumpData[0])}>
            {getLocaleText('home.page.more')}
          </span>
        )}
      </div>
    )
  );
};

export default ModelTitleBar;
