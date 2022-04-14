//@ts-ignore
import { history, useIntl } from 'umi';

// 观看本地存储
export const setSearchHistory = (value: string): void => {
  if ('searchHistoryData' in localStorage) {
    let searchHistoryData = JSON.parse(localStorage['searchHistoryData']);
    if (searchHistoryData.includes(value)) {
      searchHistoryData = searchHistoryData.filter((item: any) => {
        return item !== value;
      });
    } else if (searchHistoryData.length >= 16) {
      searchHistoryData.splice(0, 1);
    }
    searchHistoryData.push(value);

    localStorage.setItem(
      'searchHistoryData',
      JSON.stringify(searchHistoryData),
    );
  } else {
    localStorage.setItem('searchHistoryData', JSON.stringify([value]));
  }
};

//观看记录本地获取
export const getSearchHistory = () => {
  if ('searchHistoryData' in localStorage) {
    let searchHistoryData = JSON.parse(
      localStorage['searchHistoryData'],
    ).reverse();
    return searchHistoryData;
  } else {
    return;
  }
};

// 删除观看记录
export const deleteSearchHistory = (): void => {
  if ('searchHistoryData' in localStorage) {
    localStorage.removeItem('searchHistoryData');
  } else {
    return;
  }
};

//获取首页当前栏目标识
export const getCurrent = (arr: []) => {
  let num;
  if (location.search.indexOf('?linkObjId') !== -1) {
    const linkObjId = location.search.split('linkObjId=')[1];
    num = arr.findIndex((item: any) => item.linkObjId === linkObjId);
  } else {
    num = arr.findIndex((item: any) => item.content === '1');
  }
  return num === -1 ? 0 : num;
};

// 全局元素子集跳转统一处理
export const globalJump = (itemObj: any) => {
  const layout = itemObj.layout;
  switch (layout) {
    case 'Page_Detail_Movie':
    case 'Page_Detail_Variety':
    case 'Page_Detail_Series':
      history.push({
        state: { detailUrl: itemObj.jsonUrl },
        pathname: '/detail',
      });
      break;
    case 'app_text_information':
      if (itemObj.jsonUrl) {
        if (itemObj.jsonUrl === '/activity') {
          history.push({
            pathname: '/activity',
          });
        } else {
          window.location.href = itemObj.jsonUrl;
        }
      } else {
        window.location.href = itemObj.newsInfo.content;
      }

      break;
    case 'Category_Sort':
      window.location.href = `${
        window.location.href.split('home')[0]
      }home?linkObjId=${itemObj.linkObjId}`;
      break;
    case 'app_more':
    case 'app_special_list':
      history.push({
        state: { jsonUrl: itemObj.jsonUrl, layout: itemObj.layout },
        pathname: '/special',
      });
      break;
    case 'app_ad_banner': //兼容老版本 广告位跳转
      window.location.href = itemObj.jsonUrl;
      break;
    case 'app_share': //唤起分享
      //@ts-ignore
      Jegotrip.share(
        JSON.stringify({
          title: itemObj.title, //this.videoNameData.assetName,
          desc: itemObj.summary,
          url: itemObj.jsonUrl,
          pic: itemObj.contentImage,
          fn: '',
        }),
      );
      break;
    default:
      console.log('没有对应的layout' + JSON.stringify(itemObj));
  }
};

// 全局全球化语言处理
export const getLocaleText = (textId: string) => {
  const intl = useIntl();
  return intl.formatMessage({
    id: textId,
  });
};
