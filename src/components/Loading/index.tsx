/*
 * @Author: your name
 * @Date: 2021-06-18 11:59:08
 * @LastEditTime: 2021-07-08 17:22:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5-react\src\Loading.tsx
 */
const imgUrl = require('@/assets/images/index/loading.gif');

const Loading = () => {
  return (
    <div
      className="loading"
      style={{
        backgroundImage: `url(${imgUrl})`,
        width: '64px',
        height: '64px',
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        WebkitTransform: 'translate(-50%,-50%)',
      }}
    ></div>
  );
};

export default Loading;
