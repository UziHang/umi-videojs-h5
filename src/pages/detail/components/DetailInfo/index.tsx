import { useState } from 'react';
import { getLocaleText } from '@/utils/utils';
import { connect } from 'dva';
import styles from './index.less';

const DetailInfo = (props: any) => {
  const { renderData, jsonUrl, adsImg } = props;
  const [seeMore, setSeeMore] = useState(false);

  const handleMore = (): void => {
    setSeeMore(!seeMore);
  };

  const shareWechat = (): void => {
    //@ts-ignore
    Jegotrip.share(
      JSON.stringify({
        title: `${renderData.assetName}`, //this.videoNameData.assetName,
        desc: renderData.shareDesc
          ? `${renderData.shareDesc}`
          : `${renderData.description}`,
        url: `${window.location.origin}/freeStyleTourism/shareDetail?assetId=${
          renderData.assetId
        }&adsImg=${adsImg}&userId=${localStorage.getItem(
          'userCode',
        )}&accountId=${localStorage.getItem('mobile')}`,
        pic: renderData.assetImg,
        fn: '',
      }),
    );
  };

  return (
    renderData && (
      <div className={styles.infoBox}>
        <div className={styles.infoTop}>
          <div className={styles.topLeft}>
            <div className={styles.title}>{renderData.assetName}</div>
            <div className={styles.tags}>
              {renderData.tags.map((item: any, index: number) => {
                return <div key={item.tagId}>{item.tagName}</div>;
              })}
            </div>
          </div>
          {localStorage.getItem('userCode') && localStorage.getItem('mobile') && (
            <div
              className={styles.share}
              onClick={() => {
                shareWechat();
              }}
            >
              <span className={styles.icon}></span>
              <div className={styles.word}>
                {getLocaleText('detail.page.share')}
              </div>
            </div>
          )}
        </div>
        <div className={styles.descBox}>
          <div className={styles.descTitle}>
            {getLocaleText('detail.page.summary')}
            <span
              style={{
                transform: !seeMore ? 'rotate(0deg)' : 'rotate(180deg)',
              }}
              onClick={handleMore}
            ></span>
          </div>
          <div
            className={seeMore ? styles.descMore : styles.desc}
            onClick={handleMore}
          >
            {renderData.description}
          </div>
        </div>
      </div>
    )
  );
};

export default connect(({ home }: any) => ({
  adsImg: home.adsImg,
}))(DetailInfo);
