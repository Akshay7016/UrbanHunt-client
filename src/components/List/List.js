import { Card } from 'components/Card/Card';

import './List.scss';

export const List = ({ posts = [] }) => {
  return (
    <div className="list">
      {posts.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
};
