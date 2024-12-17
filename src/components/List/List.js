import { listData } from 'lib/dummyData';
import { Card } from 'components/Card/Card';

import './List.scss';

export const List = () => {
  return (
    <div className="list">
      {listData.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};
