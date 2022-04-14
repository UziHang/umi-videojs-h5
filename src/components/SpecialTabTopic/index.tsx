/*
 * @Author: wuzh
 * @LastEditTime: 2021-09-27 11:31:45
 * @LastEditors: Please set LastEditors
 * @Description: 特色专题页
 */

import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { globalJump } from '@/utils/utils';
const SpecialTabTopic = (props: any) => {
  const { renderData } = props;

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
      {renderData.elements.map((item: any) => {
        return (
          <img
            key={item.elementId}
            data-src={item.contentImage}
            style={{
              width: `${item.summary.split('|')[0] / 100}rem`,
              height: `${item.summary.split('|')[1] / 100}rem`,
              top: `${item.summary.split('|')[2] / 100}rem`,
              left: `${item.summary.split('|')[3] / 100}rem`,
              position: 'absolute',
            }}
            className="lazyload"
            onClick={() => globalJump(item)}
          />
        );
      })}
    </div>
  ) : null;
};

export default SpecialTabTopic;
