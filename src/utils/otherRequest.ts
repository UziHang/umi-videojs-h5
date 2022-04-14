import request from 'umi-request';
const localUser = localStorage.getItem('userInfo');
const userInfo = localUser ? JSON.parse(localUser) : null;
export const postWatchTime = (time: string) => {
  return request.post(`${process.env.UDSUrl}uds/cloud/watch/update?version=1`, {
    data: {
      userId: localStorage.getItem('userCode'),
      accountId: localStorage.getItem('mobile'),
      countryCode: userInfo.countryCode,
      userWatchTime: time,
    },
  });
};

export const postRelateWatchTime = (
  userId: string,
  accountId: string,
  time: string,
) => {
  return request.post(`${process.env.UDSUrl}uds/cloud/watch/update?version=1`, {
    data: {
      userId: userId,
      accountId: accountId,
      relateWatchTime: time,
    },
  });
};

export const postWatchList = () => {
  return request.post(`${process.env.UDSUrl}uds/cloud/watch/list?version=1`, {
    data: {
      userId: localStorage.getItem('userCode'),
      accountId: localStorage.getItem('mobile'),
      countryCode: userInfo.countryCode,
    },
  });
};

export const postExchange = (exchangeNum: number, exchangeTime: number) => {
  return request.post(
    `${process.env.UDSUrl}uds/cloud/watch/exchange?version=1`,
    {
      data: {
        userId: localStorage.getItem('userCode'),
        accountId: localStorage.getItem('mobile'),
        countryCode: userInfo.countryCode,
        exchangeTime: exchangeTime,
        exchangeNum: exchangeNum,
      },
    },
  );
};

export const biVod = (
  asset_type: string,
  asset_id: string,
  item_id: string,
  time: number,
  zb_assettime: number,
) => {
  try {
    const commonParams = {
      model: userInfo ? userInfo.appVer : 'unknown',
      user_id: userInfo ? userInfo.userCode : 'unknown',
      country_id: localStorage.getItem('countryCode'),
      city_id: null,
      device_id: userInfo ? userInfo.device : 'unknown',
      soft_v: '2.0.000',
      v: '1',
      site_id: '99',
      org_spid: '12',
      event: '8',
      error: '1',
      qb_assettime: 0,
    };
    return request.post(`${process.env.BiUrl}`, {
      data: {
        ...commonParams,
        create_datetime: new Date().getTime(),
        asset_type: asset_type,
        asset_id: asset_id,
        item_id: item_id,
        qb_datetime: new Date().getTime() - time,
        zb_datetime: new Date().getTime(),
        zb_assettime: zb_assettime,
        time: time,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
