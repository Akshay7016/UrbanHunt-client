import { Slider } from 'components/Slider/Slider';
import { singlePostData, userData } from 'lib/dummyData';

import './SinglePage.scss';

export const SinglePage = () => {
  const { title, images, address, price, description } = singlePostData;
  const { img, name } = userData;

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={images} />

          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{title}</h1>
                <div className="address">
                  <img src="/images/pin.png" alt="pin-icon" />
                  <span>{address}</span>
                </div>
                <div className="price">$ {price}</div>
              </div>
              <div className="user">
                <img src={img} alt="user-image" />
                <p>{name}</p>
              </div>
            </div>
            <div className="bottom">
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper"></div>
      </div>
    </div>
  );
};
