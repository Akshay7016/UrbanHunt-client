import { useLoaderData } from 'react-router-dom';

import { Filter } from 'components/Filter/Filter';
import { Card } from 'components/Card/Card';
import { Map } from 'components/Map/Map';

import './ListPage.scss';

export const ListPage = () => {
  const posts = useLoaderData();

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {posts.length > 0 ? (
            posts.map((item) => <Card key={item.id} item={item} />)
          ) : (
            <h4>Sorry, no properties were found.</h4>
          )}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={posts} />
      </div>
    </div>
  );
};
