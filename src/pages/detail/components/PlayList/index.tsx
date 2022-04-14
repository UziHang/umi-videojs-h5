/*
 * @Author: wuzh
 * @Date: 2021-06-04 16:20:58
 * @LastEditTime: 2021-07-13 16:02:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\detail\components\PlayList.tsx
 */

import { useState, useRef, useEffect } from 'react';
import { getLocaleText } from '@/utils/utils';
import styles from './index.less';

const PlayList = (props: any) => {
  const { renderData, assetType, setVideoCurrent } = props;
  const [currentNum, setCurrentNum] = useState(0);
  const [fullView, setFullView] = useState(false);
  const refNowrap: any = useRef(null); //  ref获取dom 横向自适应用
  useEffect(() => {
    setCurrentNum(0);
    autoScroll(0);
  }, [props.renderData]);

  const autoScroll = (index: number) => {
    let [currentLeft, currentWidth, boxWidth] = [
      refNowrap.current.childNodes[index].offsetLeft,
      refNowrap.current.childNodes[index].offsetWidth,
      refNowrap.current.offsetWidth,
    ];
    // srcollLeft<0自动转为0.  当前元素的距离边框距离-滚动盒子宽度/2 +当前元素宽度/2
    refNowrap.current.scrollLeft =
      currentLeft - boxWidth / 2 + currentWidth / 2;
  };

  const handlePlay = (index: number) => {
    setCurrentNum(index); //当前组件选中状态
    autoScroll(index); // 横向布局时自动自动滚动
    setVideoCurrent(index); //传给父--兄弟 当前播放集数
  };

  const handleView = () => {
    setFullView(!fullView);
    fullView && setTimeout(() => autoScroll(currentNum));
  };

  const seriesList = renderData.list.map((item: any, index: number) => {
    return (
      <div
        className={
          currentNum === index ? styles.currentItem : styles.seriresItem
        }
        key={item.itemId}
        onClick={() => handlePlay(index)}
      >
        {assetType === 'Series' && (
          <div className={styles.item}>{index + 1}</div>
        )}
        {assetType === 'Culumn' && (
          <div className={styles.culumnItem}>
            <div className={styles.imgBox}>
              <img src={item.assetImage} alt="" />
            </div>
            <div className={styles.title}>{item.title}</div>
          </div>
        )}
        {currentNum === index && <span className={styles.playingIcon}></span>}
      </div>
    );
  });

  const culumnList = renderData.list.map((item: any, index: number) => {
    return (
      <div
        className={currentNum === index ? styles.current : styles.culumnItem}
        key={item.itemId}
        onClick={() => handlePlay(index)}
      >
        <div className={styles.culumnItem}>
          <div className={styles.imgBox}>
            <img src={item.itemImg} alt="" />
            {currentNum === index && (
              <span className={styles.playingIcon}></span>
            )}
          </div>
          <div className={styles.title}>{item.itemName}</div>
        </div>
      </div>
    );
  });

  return renderData.list.length > 0 ? (
    <div className={fullView ? styles.playListBox : undefined}>
      <div className={styles.topBox}>
        <div className={styles.title}>
          {getLocaleText('detail.page.selection')}
        </div>
        <div
          onClick={() => handleView()}
          className={fullView ? styles.icon : styles.word}
        >
          {fullView ? null : getLocaleText('detail.page.selections')}
        </div>
      </div>

      <div
        className={assetType === 'Series' ? styles.seriesBox : styles.culumnBox}
      >
        <div
          ref={refNowrap}
          className={fullView ? styles.wrapBox : styles.nowrapBox}
        >
          {assetType === 'Series' ? seriesList : culumnList}
        </div>
      </div>
    </div>
  ) : null;
};

export default PlayList;
