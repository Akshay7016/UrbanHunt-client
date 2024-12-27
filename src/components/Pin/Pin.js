import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import './Pin.scss';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
});

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
            <b>Rs {price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
