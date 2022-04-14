/*
 * @Author: your name
 * @Date: 2021-05-27 15:43:18
 * @LastEditTime: 2021-11-05 11:07:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\home\index.tsx
 */
import { useEffect, useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import request from '@/utils/request';
import { getCurrent } from '@/utils/utils';
import { connect } from 'dva';
import WindowAds from '@/components/WindowAds';
import TabIndex from './components/TabIndex';
import './index.less';

const Home = (props: any) => {
  const { dispatch, current, navData, showAds, topBgImage, ADBgImage } = props;
  const [navList, setNavList] = useState<any>([]);
  const [itemData, setItemData] = useState<any>();
  useEffect(() => {
    const init = async () => {
      let navbarRes;
      if (navData.length > 0) {
        //navData存在于redux说明非第一次打开项目
        navbarRes = await request.get(navData[current].jsonUrl);
        setNavList(navData);
      } else {
        const areaRes = await request.get(
          'https://restapi.amap.com/v3/ip?key=b4dda3b955ae6d8525fb8aa373a66e2e',
        );
        if (
          areaRes.city.indexOf('香港') !== -1 ||
          areaRes.city.indexOf('台湾') !== -1 ||
          areaRes.city.indexOf('澳门') !== -1 ||
          areaRes.adcode === '900000'
        ) {
          localStorage.setItem('countryCode', '852');
        } else {
          localStorage.setItem('countryCode', '86');
        }

        let indexUrl = `${
          process.env.baseUrl
        }?s=99&p=mHome&k=1&v=1&c=1&a=${localStorage.getItem(
          'countryCode',
        )}&i=2`;
        const res = await request.get(indexUrl);
        let filterNav = [];
        if (localStorage.getItem('countryCode') === '852') {
          filterNav = res.data.navbar.filter(
            (item: any) => item.content !== 'prc',
          );
        } else {
          filterNav = res.data.navbar;
        }

        navbarRes = await request.get(filterNav[getCurrent(filterNav)].jsonUrl);

        dispatch({
          type: 'home/initCurrent',
          payload: filterNav,
        });
        setNavList(filterNav);
      }
      setItemData(navbarRes.data.comps);
    };

    try {
      init();
    } catch (error) {
      console.log(error);
    }
  }, []);

  function a11yProps(index: any) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }

  const tabData = navList.slice(0, -1).map((item: any, index: number) => {
    return item.contentTopImage ? (
      <Tab
        key={item.linkObjId}
        icon={<img src={item.contentTopImage} />}
        {...a11yProps(index)}
      />
    ) : (
      <Tab key={item.linkObjId} label={item.title} {...a11yProps(index)} />
    );
  });

  const handleCurrent = (num: number, currentData: any) => {
    //dva存储数据
    dispatch({
      type: 'home/updateCurrent',
      payload: { num, currentData },
    });
  };

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (newValue === current) return; //防抖
    request.get(navList[newValue].jsonUrl).then((res) => {
      handleCurrent(newValue, res.data.comps);
      setItemData(res.data.comps);
    });
  };

  return navData && navList ? ( //当navData存储至redux获取后再渲染
    <div
      style={{
        backgroundImage: ADBgImage ? `url(${ADBgImage})` : `url(${topBgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% auto',
      }}
    >
      {showAds && navData.length > 0 && (
        <WindowAds renderData={navData.slice(-1)[0]} />
      )}
      <Tabs
        value={current}
        onChange={handleChange}
        indicatorColor="primary"
        variant={navList.length <= 5 ? 'fullWidth' : 'scrollable'}
        scrollButtons="on"
        aria-label="scrollable force tabs icon example"
      >
        {tabData}
      </Tabs>
      {itemData && (
        <TabIndex
          layout={navData[current].layout}
          bgImage={navData[current].layout}
          itemData={itemData}
        />
      )}
    </div>
  ) : null;
};

export default connect(({ home }: any) => ({
  current: home.current,
  navData: home.navData,
  showAds: home.showAds,
  topBgImage: home.topBgImage,
  ADBgImage: home.ADBgImage,
}))(Home);
