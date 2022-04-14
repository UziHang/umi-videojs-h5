/*
 * @Author: your name
 * @Date: 2021-05-27 18:16:49
 * @LastEditTime: 2021-09-01 17:35:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cmhk-mobile-h5\src\pages\components\AppRecommend4\index.tsx
 */
import ModelTitleBar from '../ModelTitleBar';
import ModelFlexList from '../ModelFlexList'; //头部标题栏

const MoreRecommend = (props: any) => {
  const { renderData } = props;

  return renderData.elements.filter((item: any) =>
    item.layout.includes('Page_Detail'),
  ).length > 0 ? (
    <div>
      <ModelTitleBar
        title={renderData.title}
        jumpData={renderData.elements.filter(
          (item: any) => !item.layout.includes('Page_Detail'),
        )}
      />
      <ModelFlexList
        renderData={renderData.elements.filter((item: any) =>
          item.layout.includes('Page_Detail'),
        )}
      />
    </div>
  ) : null;
};

export default MoreRecommend;
