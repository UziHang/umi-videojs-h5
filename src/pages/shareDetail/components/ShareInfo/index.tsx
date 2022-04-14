/*
 * @Author: your name
 * @Date: 2021-07-19 15:26:10
 * @LastEditTime: 2021-07-19 15:52:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\src\pages\shareDetail\components\ShareInfo.ts
 */

import styles from './index.less';
const ShareInfo = (props: any) => {
  const handleJump = (): void => {
    window.location.href = 'http://hotapp.jegotrip.com.cn/23110272';
  };

  return (
    <div className={styles.infoBox}>
      <div className={styles.imgBox}>
        <img src={props.adsImg} alt="" />
      </div>
      <div className={styles.jumpAppStore} onClick={() => handleJump()}>
        <div className={styles.linkToApp}>点击进入无忧行APP</div>
      </div>
    </div>
  );
};

export default ShareInfo;
