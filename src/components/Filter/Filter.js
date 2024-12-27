import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import queryString from 'query-string';

import './Filter.scss';

export const Filter = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { city } = queryString.parse(search);
  const { register, getValues } = useForm();

  const searchPosts = () => {
    const [inputCity, type, property, minPrice, maxPrice, bedroom] = getValues([
      'city',
      'type',
      'property',
      'minPrice',
      'maxPrice',
      'bedroom',
    ]);

    navigate(
      `/list?type=${type}&city=${inputCity}&minPrice=${minPrice}&maxPrice=${maxPrice}&property=${property}&bedroom=${bedroom}`,
    );
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{city}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="City"
            {...register('city')}
          />
        </div>
      </div>

      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select id="type" {...register('type')}>
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="property">Property</label>
          <select id="property" {...register('property')}>
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            placeholder="any"
            {...register('minPrice', {
              min: 0,
              max: 10000000,
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            placeholder="any"
            {...register('maxPrice', {
              min: 0,
              max: 10000000,
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="number"
            id="bedroom"
            placeholder="any"
            {...register('bedroom', {
              valueAsNumber: true,
            })}
          />
        </div>

        <button onClick={searchPosts}>
          <img src="/images/search.png" alt="search-image" />
        </button>
      </div>
    </div>
  );
};
