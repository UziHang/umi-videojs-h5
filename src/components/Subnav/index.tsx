/*
 * @Author: your name
 * @Date: 2021-06-15 10:22:47
 * @LastEditTime: 2021-11-08 10:04:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\src\components\Subnav\index.tsx
 */
import { connect } from 'dva';
import { history } from 'umi';
import styles from './index.less';

const Subnav = (props: any) => {
  const rightNav = [
    {
      icon: require('@/assets/images/index/gift@2x.gif'),
      page: '/activity',
      show: localStorage.getItem('userInfo'),
    },
    {
      icon: require('@/assets/images/index/fiter@2x.png'),
      page: '/filter',
      show: props.categoryObj,
    },
  ];

  return (
    <div
      className={styles.navBox}
      style={{
        marginBottom: props.ADBgImage ? `10vh` : `0`,
      }}
    >
      <div
        className={styles.searchBox}
        onClick={() => {
          history.push({
            pathname: '/search',
          });
        }}
      >
        <span className={styles.icon}></span>
        {props.searchWord}
      </div>

      {rightNav.find((item) => item.show) && (
        <div className={styles.navBox}>
          {rightNav.map((item, index) => {
            return (
              item.show &&
              item.page !== '/activity' && (
                <img
                  key={index}
                  src={item.icon}
                  onClick={() => {
                    history.push({
                      state: { categoryObj: props.categoryObj },
                      pathname: item.page,
                    });
                  }}
                  alt=""
                />
              )
            );
          })}
        </div>
      )}
      <div className={styles.giftBox}>
        {rightNav.map((item, index) => {
          return (
            item.page === '/activity' && (
              <img
                key={index}
                src={item.icon}
                onClick={() => {
                  history.push({
                    pathname: item.page,
                  });
                }}
                alt=""
              />
            )
          );
        })}
      </div>
    </div>
  );
};

export default connect(({ home }: any) => ({
  searchWord: home.searchWord,
  ADBgImage: home.ADBgImage,
}))(Subnav);
