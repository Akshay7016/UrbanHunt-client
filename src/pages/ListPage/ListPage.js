import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';

import { Filter } from 'components/Filter/Filter';
import { Card } from 'components/Card/Card';
import { Map } from 'components/Map/Map';
import { Spinner } from 'components/Spinner/Spinner';
import { apiRequest } from 'lib/apiRequest';

import './ListPage.scss';

export const ListPage = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const { data } = await apiRequest.get(`/posts${search}`);
        setPosts(data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [search]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          {posts.length > 0 ? (
            posts.map((item) => <Card key={item.id} item={item} />)
          ) : (
            <h3>😟 Sorry, no properties were found.</h3>
          )}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={posts} />
      </div>
    </div>
  );
};
