import { useEffect, useState } from 'react';
import { Toast } from 'antd-mobile';
import request from '@/utils/request';
import { useIntl } from 'react-intl';
import styles from './index.less';
import AppRecommendVideo from '@/components/AppRecommendVideo';
import DetailInfo from './components/DetailInfo';
import DetailActivity from './components/DetailActivity';
import PlayList from './components/PlayList';
import ModelFlexList from '@/components/ModelFlexList';

const Detail = (props: any) => {
  const { location } = props;
  const [detailData, setDetailData] = useState<any>();
  const [moreRecommendData, setMoreRecommendData] = useState<any>([]);
  const [current, setCurrent] = useState<number>(0);
  const intl = useIntl();

  let detailUrl: string = '';
  if (location.query.assetId) {
    detailUrl = `${process.env.baseUrl}/?s=99&p=mAsset&k=1&v=1&c=1&a=86&i=2&assetId=${location.query.assetId}`;
  } else {
    detailUrl = location.state.detailUrl;
  }
  useEffect(() => {
    const getData = async () => {
      const detailRes = await request.get(detailUrl);
      if (!detailRes.data.detail.playFlag) {
        Toast.fail('该资产无版权，将自动返回上一页。', 3, () => {
          history.go(-1);
        });
      }
      const recommendRes = await request.get(detailRes.data.recommend.jsonUrl);
      setDetailData(detailRes.data);
      setMoreRecommendData(recommendRes.data.assets);
    };

    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [location]);

  const setVideoCurrent = (current: number) => {
    setCurrent(current);
  };

  return detailData ? (
    <div className={styles.detailBox}>
      {detailData.item.list[current] && (
        <AppRecommendVideo
          renderData={detailData.item.list[current]}
          assetDetail={detailData.detail}
          type={'detail'}
        />
      )}

      <div style={{ margin: '0.2rem' }}>
        <DetailInfo renderData={detailData.detail} jsonUrl={detailUrl} />

        {localStorage.getItem('userInfo') && <DetailActivity />}

        {detailData.detail.assetType !== 'Movie' && (
          <PlayList
            renderData={detailData.item}
            assetType={detailData.detail.assetType}
            setVideoCurrent={setVideoCurrent}
          />
        )}

        <div>
          <div className={styles.title}>
            {intl.formatMessage({
              id: 'detail.page.recommend',
            })}
          </div>
          {moreRecommendData && (
            <ModelFlexList renderData={moreRecommendData} />
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Detail;
