import { globalJump } from '@/utils/utils';
import { useState, useEffect } from 'react';
import styles from './index.less';

const AppHoverButton = (props: any) => {
  const { renderData } = props;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    if (renderData.elements[0].layout === 'app_share') {
      !localStorage.getItem('userCode') &&
        !localStorage.getItem('mobile') &&
        setVisible(false);
    }
  }, [renderData]);
  return renderData && visible ? (
    <div className={styles.hoverBody}>
      <div
        className={styles.quit}
        onClick={() => {
          setVisible(false);
        }}
      ></div>
      <div
        className={styles.imgBox}
        onClick={() => {
          globalJump(renderData.elements[0]);
        }}
      >
        <img src={renderData.elements[0].contentImage} alt="" />
      </div>
    </div>
  ) : null;
};

export default AppHoverButton;
