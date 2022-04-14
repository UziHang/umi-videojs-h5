import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
const WinterOlympics = (props: any) => {
  const { renderData } = props;

  return renderData ? (
    <div
      style={{
        width: `${renderData.summary.split('|')[0] / 100}rem`,
        height: `${renderData.summary.split('|')[1] / 100}rem`,
        backgroundImage: `url(${renderData.bgImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
        position: 'absolute',
        top: '9.2rem',
        left: '38px',
        //@ts-ignore
        zIndex: '99',
        padding: '20px 0',
      }}
    >
      {renderData.elements.map((item: any, index: number) => {
        return (
          <div
            key={index}
            style={{
              width: `${renderData.summary.split('|')[0] / 100}rem`,
              height: `30px`,
              lineHeight: '55px',
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.32rem',
            }}
          >
            <div
              style={{
                width: `${renderData.summary.split('|')[0] / 100}rem`,
                margin: '1px 0px',
              }}
            >
              {index === 0 ? (
                <div
                  style={{
                    backgroundImage: `url(${item.contentImage})`,
                    width: '20px',
                    height: '14px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    display: 'inline-block',
                    margin: '2px 7vw',
                    marginBottom: '-2px',
                  }}
                ></div>
              ) : (
                <div
                  style={{
                    width: '20px',
                    height: '14px',
                    margin: '2px 7vw',
                    display: 'inline-block',
                    textAlign: 'center',
                  }}
                >
                  {index}
                </div>
              )}
              <span
                style={{
                  width: '20px',
                  marginRight: '13vw',
                }}
              >
                {item.title}
              </span>
              <span
                style={{
                  width: '20px',
                  marginRight: '4.2vw',
                }}
              >
                {item.content.split('|')[0]}
              </span>
              <span
                style={{
                  width: '20px',
                  marginRight: '4vw',
                }}
              >
                {item.content.split('|')[1]}
              </span>
              <span
                style={{
                  width: '20px',
                  marginRight: '8vw',
                }}
              >
                {item.content.split('|')[2]}
              </span>
              <span
                style={{
                  width: '20px',
                }}
              >
                {item.content.split('|')[3]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};

export default WinterOlympics;
