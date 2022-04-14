/*
 * @Author: your name
 * @Date: 2021-06-01 14:15:49
 * @LastEditTime: 2021-07-09 09:52:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\special\index.tsx
 */
import React, { useEffect, useState } from 'react';
import request from '@/utils/request';
import { globalJump } from '@/utils/utils';
import styles from '../special/index.less';

const special = (props: any) => {
  const [list, setList] = useState([]);
  const [bgImg, setBgImg] = useState();
  const { location, route } = props;
  useEffect(() => {
    let specialUrl = location.state.jsonUrl;
    const getData = async () => {
      const specialRes = await request.get(specialUrl);
      // props.route.title=specialRes.data.comps[0].title;
      document.title = specialRes.data.comps[0].title;
      setList(specialRes.data.comps[0].elements);
      setBgImg(specialRes.data.comps[0].bgImage);
    };
    getData();
  }, []);

  let bgStyle = {
    width: '7.5rem',
    height: '11.26rem',
    backgroundImage: `url(${bgImg})`,
    backgroundSize: '100% auto',
    zIndex: -1,
  };

  return (
    list && (
      <div style={bgStyle}>
        <ul
          className={
            location.state.layout === 'app_more'
              ? styles.moreBox
              : styles.specialBox
          }
        >
          {list.map((item: any, index: number) => {
            return (
              <li
                key={item.elementId}
                className={styles.child}
                onClick={() => globalJump(item)}
              >
                <div className={styles.imgBox}>
                  {item.tagImage && (
                    <span
                      style={{
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        display: 'inline-block',
                        width: '0.52rem',
                        height: '0.28rem',
                        backgroundImage: `url(${item.tagImage})`,
                        backgroundSize: '100% 100%',
                      }}
                    ></span>
                  )}
                  <img src={item.contentImage} alt="" />
                </div>
                <div className={styles.content}>
                  <p>{item.title}</p>
                  {location.state.layout === 'app_more' && (
                    <p className={styles.summary}>{item.summary}</p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default special;
