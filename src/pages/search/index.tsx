/*
 * @Author: your name
 * @Date: 2021-05-27 15:47:19
 * @LastEditTime: 2021-11-08 14:27:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\search\index.tsx
 */
import { useEffect, useState, useRef } from 'react';
import { SearchBar } from 'antd-mobile';
import request from '@/utils/request';
import { setSearchHistory, getLocaleText } from '@/utils/utils';
import styles from './index.less';
import SearchHistory from './components/SearchHistory';
import HotSearch from './components/HotSearch';
import ModelFlexList from '@/components/ModelFlexList';

const Search = () => {
  const [value, setValue] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [visible, setVisible] = useState(true);
  const [hotSearchData, setHotSearchData] = useState([]);
  const [searchListData, setSearchListData] = useState(null);
  const [searchToast, setSearchToast] = useState(false);

  const inputRef: any = useRef(null);
  useEffect(() => {
    inputRef.current && inputRef.current.focus();
    const getHotSearch = async () => {
      const hotSeachUrl = `${
        process.env.baseUrl
      }?s=99&p=mHotwords&&k=1&v=1&c=1&a=${localStorage.getItem(
        'countryCode',
      )}&i=2`;
      const hotRes = await request.get(hotSeachUrl);
      setHotSearchData(hotRes.data.hotwords);
      setPlaceholder(hotRes.data.hotwords[0].name);
    };

    try {
      getHotSearch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSearch = async (value: string) => {
    setValue(value);
    setSearchHistory(value);
    let searchUrl = `${
      process.env.baseUrl
    }?s=99&p=mSearch&k=1&v=1&c=1&a=${localStorage.getItem('countryCode')}&i=2`;
    try {
      setVisible(false);
      const searchRes = await request.get(searchUrl, { params: { wd: value } });
      setVisible(true);
      if (searchRes.data.result[0]) {
        setSearchListData(searchRes.data.result[0].list);
        setSearchToast(false);
      } else {
        setSearchToast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    placeholder && (
      <div className={styles.searchBox}>
        <SearchBar
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          cancelText={'取消'}
          onCancel={() => {
            setSearchListData(null);
          }}
          onSubmit={(value) => {
            value && onSearch(value);
          }}
          onClear={() => setValue('')}
          onChange={(value) => setValue(value)}
        />
        <div className={styles.searchBody}>
          {searchToast && (
            <div className={styles.searchNull}>
              <h4>{getLocaleText('search.page.searchToast1')}</h4>
              <h3>{getLocaleText('search.page.searchToast2')}</h3>
            </div>
          )}
          {!searchListData && visible && (
            <SearchHistory
              searchHistory={(name: any) => {
                onSearch(name);
              }}
              handleClear={() => {
                setVisible(false);
              }}
            />
          )}
          {!searchListData && hotSearchData && (
            <HotSearch
              hotSearchData={hotSearchData}
              searchHot={(name: any) => {
                onSearch(name);
              }}
            />
          )}
          {searchListData && <ModelFlexList renderData={searchListData} />}
        </div>
      </div>
    )
  );
};

export default Search;
