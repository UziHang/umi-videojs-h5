/*
 * @Author: wuzh
 * @LastEditTime: 2021-11-04 17:51:12
 * @LastEditors: Please set LastEditors
 * @Description: 特色专题页
 */

import { useState } from 'react';
import request from '@/utils/request';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { globalJump } from '@/utils/utils';
const SpecialTabVote = (props: any) => {
  const { renderData } = props;
  const [renderList, setRenderList] = useState(props.renderData.elements);
  const [showGif, setShowGif] = useState(
    props.renderData.elements.map(() => {
      return false;
    }),
  );
  const [handleVote, setHandleVote] = useState(
    props.renderData.elements.map(() => {
      return false;
    }),
  );
  const iconList = [
    {
      icon: require('@/assets/images/index/love.png'),
    },
    {
      icon: require('@/assets/images/index/loved.png'),
    },
    {
      icon: require('@/assets/images/index/vote.gif'),
    },
  ];

  const onVote = (index: number) => {
    let myVote = [...handleVote];
    let myGif = [...showGif];
    myGif[index] = true;
    myVote[index] = true;
    setHandleVote(myVote);
    setShowGif(myGif);
    setTimeout(() => {
      setShowGif(
        props.renderData.elements.map(() => {
          return false;
        }),
      );
    }, 1000);
    try {
      request.post(`${process.env.voteUrl}`, {
        data: {
          assetId: renderList[index].linkObjId,
          siteId: 99,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return renderData ? (
    <div
      style={{
        width: '7.5rem',
        height: `${renderData.summary.split('|')[1] / 100}rem`,
        backgroundImage: `url(${renderData.bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        position: 'relative',
      }}
    >
      {renderList.map((item: any, index: number) => {
        return (
          <div
            key={item.elementId}
            style={{
              width: `${item.summary.split('|')[0] / 100}rem`,
              height: `${item.summary.split('|')[1] / 100}rem`,
              top: `${item.summary.split('|')[2] / 100}rem`,
              left: `${item.summary.split('|')[3] / 100}rem`,
              position: 'absolute',
            }}
          >
            <img
              data-src={item.contentImage}
              style={{
                width: `${item.summary.split('|')[0] / 100}rem`,
                height: `${item.summary.split('|')[1] / 100}rem`,
              }}
              className="lazyload"
              onClick={() => globalJump(item)}
            />
            {index >= 1 && (
              <div
                style={{
                  top: `${0.1 + item.summary.split('|')[1] / 100}rem`,
                  left: '4.5rem',
                  position: 'absolute',
                  display: 'flex',
                  justifySelf: 'center',
                }}
                onClick={() => {
                  if (handleVote[index]) {
                    return;
                  } else {
                    onVote(index);
                  }
                }}
              >
                <span>赞</span>
                {!showGif[index] && (
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundImage: handleVote[index]
                        ? `url(${iconList[1].icon})`
                        : `url(${iconList[0].icon})`,
                      backgroundSize: 'cover',
                      width: '14px',
                      height: '12px',
                      margin: '4px',
                    }}
                  ></span>
                )}
                {showGif[index] && (
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundImage: `url(${iconList[2].icon})`,
                      backgroundSize: 'cover',
                      width: '40px',
                      height: '40px',
                      margin: '-10px',
                    }}
                  ></span>
                )}
                <span>{handleVote[index] ? item.nice + 1 : item.nice}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  ) : null;
};

export default SpecialTabVote;
