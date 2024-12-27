import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import './SearchBar.scss';

const types = ['buy', 'rent'];

export const SearchBar = () => {
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState('buy');
  const { register, handleSubmit } = useForm();

  const navigateToListPage = (data) => {
    const { city, minPrice, maxPrice } = data;
    navigate(
      `/list?type=${propertyType}&city=${city}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    );
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setPropertyType(type)}
            className={propertyType === type ? 'active' : ''}
          >
            {type}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit(navigateToListPage)} noValidate>
        <input type="text" placeholder="City" {...register('city')} />
        <input
          type="number"
          placeholder="Min Price"
          {...register('minPrice', {
            min: 0,
            max: 10000000,
            valueAsNumber: true,
          })}
        />
        <input
          type="number"
          placeholder="Max Price"
          {...register('maxPrice', {
            min: 0,
            max: 10000000,
            valueAsNumber: true,
          })}
        />
        <button>
          <img src="/images/search.png" alt="search" />
        </button>
      </form>
    </div>
  );
};
