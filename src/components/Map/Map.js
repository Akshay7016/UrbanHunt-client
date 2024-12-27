import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { Pin } from 'components/Pin/Pin';

import './Map.scss';

export const Map = ({ items }) => {
  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0]?.latitude, items[0]?.longitude]
          : ['19.7515', '75.7139']
      }
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin key={item.id} item={item} />
      ))}
    </MapContainer>
  );
};
