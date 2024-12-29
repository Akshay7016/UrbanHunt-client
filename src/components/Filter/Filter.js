import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './Filter.scss';

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { register, getValues } = useForm({
    defaultValues: {
      city: searchParams.get('city') || '',
      type: searchParams.get('type') || '',
      property: searchParams.get('property') || '',
      ...(searchParams.get('minPrice') && {
        minPrice: searchParams.get('minPrice'),
      }),
      ...(searchParams.get('maxPrice') && {
        maxPrice: searchParams.get('maxPrice'),
      }),
      ...(searchParams.get('bedroom') && {
        bedroom: searchParams.get('bedroom'),
      }),
    },
  });

  const searchPosts = () => {
    setSearchParams(getValues());
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get('city')}</b>
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
