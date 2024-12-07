import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

import './Pin.scss';

export const Pin = ({
  item: { id, title, images, bedroom, price, latitude, longitude },
}) => {
  return (
    <Marker position={[latitude, longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={images[0]} alt="hotel-image" />
          <div className="textContainer">
            <Link to={`/${id}`}>{title}</Link>
            <span>{bedroom} bedroom</span>
            <b>$ {price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
