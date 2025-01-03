import { Link } from 'react-router-dom';

import './Card.scss';

export const Card = ({
  item: { id, images, title, address, price, bedroom, bathroom, city },
}) => {
  return (
    <div className="card">
      <Link to={`/${id}`} className="imageContainer">
        <img src={images[0]} alt="hotel-image" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${id}`}>{title}</Link>
        </h2>
        <p className="address">
          <img src="/images/pin.png" alt="pin-image" />
          <span>
            {address}, {city}
          </span>
        </p>
        <p className="price">Rs {price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/images/bed.png" alt="bed-png" />
              <span>{bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/images/bath.png" alt="bath-png" />
              <span>{bathroom} bathroom</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
