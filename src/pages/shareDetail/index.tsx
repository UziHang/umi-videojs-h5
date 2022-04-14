import { useEffect, useState } from 'react';
import request from '@/utils/request';
import styles from './index.less';
import AppRecommendVideo from '@/components/AppRecommendVideo';
import DetailInfo from '../detail/components/DetailInfo';
import PlayList from '../detail/components/PlayList';
import ShareInfo from './components/ShareInfo';

const Detail = (props: any) => {
  const { location } = props;
  const [detailData, setDetailData] = useState<any>();
  const [current, setCurrent] = useState<number>(0);
  const [adsImg, setAdsImg] = useState<string>(location.query.adsImg);
  useEffect(() => {
    let detailUrl = `${process.env.baseUrl}/?s=99&p=mAsset&k=1&v=1&c=1&a=86&i=2&assetId=${location.query.assetId}`;
    const getData = async () => {
      const detailRes = await request.get(detailUrl);
      setDetailData(detailRes.data);
    };

    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setVideoCurrent = (current: number) => {
    setCurrent(current);
  };

  const userInfo = {
    userId: location.query.userId,
    accountId: location.query.accountId,
  };

  return detailData ? (
    <div className={styles.detailBox}>
      {detailData.item.list[current] && (
        <AppRecommendVideo
          renderData={detailData.item.list[current]}
          assetDetail={Object.assign(detailData.detail, userInfo)}
          type={'shareDetail'}
        />
      )}

      <div style={{ margin: '0.2rem' }}>
        <DetailInfo renderData={detailData.detail} />

        {detailData.detail.assetType !== 'Movie' && (
          <PlayList
            renderData={detailData.item}
            assetType={detailData.detail.assetType}
            setVideoCurrent={setVideoCurrent}
          />
        )}

        <ShareInfo adsImg={adsImg} />
      </div>
    </div>
  ) : null;
};

export default Detail;
