/*
 * @Description:
 * @Author: jiangjie
 * @Date: 2022-02-07 11:21:23
 * @LastEditTime: 2022-02-07 15:45:54
 * @LastEditors: jiangjie
 * @Reference:
 */
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import './style.less';
import winterOlympicsBg from '../../assets/images/winterOlympics/bg.png';
import gold from '../../assets/images/winterOlympics/gold.png';
import sliver from '../../assets/images/winterOlympics/silver.png';
import copper from '../../assets/images/winterOlympics/copper.png';
const WinterOlympics = (props: any) => {
  const { renderData } = props;

  return renderData ? (
    <div
      style={{
        width: `${renderData.summary.split('|')[0] / 100}rem`,
        height: `${renderData.summary.split('|')[1] / 100}rem`,
        backgroundImage: `url(${winterOlympicsBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        position: 'absolute',
        top: '9.2rem',
        left: '38px',
        //@ts-ignore
        zIndex: '99',
        padding: '15px 10px',
      }}
    >
      <table className="winterOlympics">
        <thead>
          <tr>
            <th>排名</th>
            <th
              align="left"
              style={{
                boxSizing: 'border-box',
                width: '100px',
                overflow: 'hidden',
              }}
            >
              <span style={{ marginLeft: '20px' }}>国家/地区</span>
            </th>
            <th>
              <img
                style={{ width: '25px', height: '30px' }}
                width={25}
                height={30}
                src={gold}
              />
            </th>
            <th>
              <img
                style={{ width: '25px', height: '30px' }}
                width={25}
                height={30}
                src={sliver}
              />
            </th>
            <th>
              <img
                style={{ width: '25px', height: '30px' }}
                width={25}
                height={30}
                src={copper}
              />
            </th>
            <th>总数</th>
          </tr>
        </thead>
        <tbody>
          {renderData.elements.map((item: any, index: number) => {
            if (index === 0) {
              // 中国单独第一行
              return (
                <tr key={index}>
                  <td align="center">
                    <img
                      style={{ width: '20px', height: '14px' }}
                      width={20}
                      height={14}
                      src={item.contentImage}
                    />
                  </td>
                  <td
                    align="left"
                    style={{
                      boxSizing: 'border-box',
                      width: '100px',
                      wordBreak: 'keep-all',
                      wordWrap: 'break-word',
                    }}
                  >
                    <span style={{ marginLeft: '20px' }}>{item.title}</span>
                  </td>
                  <td align="center">{item.content.split('|')[0]}</td>
                  <td align="center">{item.content.split('|')[1]}</td>
                  <td align="center">{item.content.split('|')[2]}</td>
                  <td align="center">{item.content.split('|')[3]}</td>
                </tr>
              );
            } else {
              return (
                <tr key={index}>
                  <td align="center">{index}</td>
                  <td
                    align="left"
                    style={{
                      boxSizing: 'border-box',
                      width: '100px',
                      wordBreak: 'keep-all',
                      wordWrap: 'break-word',
                    }}
                  >
                    <span style={{ marginLeft: '20px' }}>{item.title}</span>
                  </td>
                  <td align="center">{item.content.split('|')[0]}</td>
                  <td align="center">{item.content.split('|')[1]}</td>
                  <td align="center">{item.content.split('|')[2]}</td>
                  <td align="center">{item.content.split('|')[3]}</td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default WinterOlympics;
