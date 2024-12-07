import { listData } from 'lib/dummyData';
import { Filter } from 'components/Filter/Filter';
import { Card } from 'components/Card/Card';
import { Map } from 'components/Map/Map';

import './ListPage.scss';

export const ListPage = () => {
  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {listData.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={listData} />
      </div>
    </div>
  );
};
