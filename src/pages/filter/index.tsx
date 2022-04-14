/*
 * @Author: your name
 * @Date: 2021-05-27 15:47:26
 * @LastEditTime: 2021-07-15 14:00:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\fiter\index.tsx
 */
/*
 * @Author: your name
 * @Date: 2021-05-27 15:47:19
 * @LastEditTime: 2021-06-16 18:21:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\search\index.tsx
 */
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { Toast } from 'antd-mobile';
import request from '@/utils/request';
import styles from './index.less';
import ModelFlexList from '@/components/ModelFlexList';

const Filter = (props: any) => {
  const [categorysData, setCategorysData] = useState<any>();
  const [filterList, setFilterList] = useState([]);
  const [filterUrl, setFilterUrl] = useState('');
  const [active, setActive] = useState<any>([]);
  const intl = useIntl();
  const { location } = props;
  let categoryId = location.state.categoryObj.elements[0].linkObjId;
  useEffect(() => {
    const categorysUrl = `${
      process.env.baseUrl
    }?s=99&p=mCategorys&&k=1&v=1&c=1&a=${localStorage.getItem(
      'countryCode',
    )}&i=2&categoryId=${categoryId}`;
    const getCategorys = async () => {
      const categorysRes = await request.get(categorysUrl);
      setCategorysData(categorysRes.data);
      let activeList = categorysRes.data.list.map((item: any) => {
        return item.categoryId;
      });
      setActive(activeList);
      setFilterUrl(categorysRes.data.jsonUrl);
      const filterRes = await request.get(categorysRes.data.jsonUrl);
      setFilterList(filterRes.data.assets);
    };

    try {
      getCategorys();
    } catch (error) {
      console.log(error);
    }
  }, []);

  //获取筛选数据
  const getFilterList = async (jsonUrl: string) => {
    const filterRes = await request.get(jsonUrl);
    filterRes.data.assets.length <= 0 &&
      Toast.info(
        intl.formatMessage({
          id: 'filter.page.failToast',
        }),
        3,
      );
    filterRes.data.assets && setFilterList(filterRes.data.assets);
  };

  const handleFilter = (
    listIndex: number,
    categoryCode: string,
    categoryId: string,
    reset: boolean,
  ) => {
    active.splice(listIndex, 1, categoryId);
    setActive(active);

    let newUrl;
    if (filterUrl.includes(categoryCode)) {
      let params = new URLSearchParams(filterUrl);

      let reqex = params.get(categoryCode);
      newUrl = !reset
        ? //@ts-ignore
          filterUrl.replace(reqex, categoryId)
        : filterUrl.replace(`&${categoryCode}=${reqex}`, '');
    } else {
      newUrl = `${filterUrl}&${categoryCode}=${categoryId}`;
    }
    setFilterUrl(newUrl);
    getFilterList(newUrl);
  };

  return categorysData ? (
    <div className={styles.filterBox}>
      <div style={{ margin: '0.2rem' }}>
        <div className={styles.filterContent}>
          {categorysData.list.map((listItem: any, listIndex: number) => {
            return (
              <div key={listItem.categoryId} className={styles.filterType}>
                <div
                  className={
                    active.includes(listItem.categoryId) ? styles.active : null
                  }
                  onClick={() =>
                    handleFilter(
                      listIndex,
                      listItem.categoryCode,
                      listItem.categoryId,
                      true,
                    )
                  }
                >
                  {listItem.categoryName}
                </div>

                {listItem.list.map((item: any, index: Number) => {
                  return (
                    <div
                      className={
                        active.includes(item.categoryId) ? styles.active : null
                      }
                      key={item.categoryId}
                      onClick={() =>
                        handleFilter(
                          listIndex,
                          listItem.categoryCode,
                          item.categoryId,
                          false,
                        )
                      }
                    >
                      {item.categoryName}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ margin: '0.2rem' }}>
        {filterList && <ModelFlexList renderData={filterList} />}
      </div>
    </div>
  ) : null;
};

export default Filter;
