import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';

import UploadWidget from 'components/UploadWidget/UploadWidget';
import { apiRequest } from 'lib/apiRequest';

import './NewPostPage.scss';

export const NewPostPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const imagesGreaterThanZero = images.length > 0;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addPost = async (data) => {
    const {
      title,
      price,
      address,
      city,
      bedroom,
      bathroom,
      latitude,
      longitude,
      type,
      property,
      utilities,
      pet,
      income,
      size,
      school,
      bus,
      restaurant,
    } = data;
    try {
      setIsLoading(true);

      const res = await apiRequest.post('/posts', {
        postData: {
          title,
          price,
          images,
          address,
          city,
          bedroom,
          bathroom,
          type,
          property,
          latitude,
          longitude,
        },
        postDetail: {
          desc,
          utilities,
          pet,
          income,
          size,
          school,
          bus,
          restaurant,
        },
      });
      toast.success('Post added');
      navigate(`/${res?.data?.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit(addPost)} noValidate>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                {...register('title', {
                  required: 'Title is required',
                })}
              />
              {errors?.title?.message && (
                <span className="inputError">{errors?.title?.message}</span>
              )}
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                {...register('price', {
                  required: 'Price is required',
                  valueAsNumber: true,
                })}
              />
              {errors?.price?.message && (
                <span className="inputError">{errors?.price?.message}</span>
              )}
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                {...register('address', {
                  required: 'Address is required',
                })}
              />
              {errors?.address?.message && (
                <span className="inputError">{errors?.address?.message}</span>
              )}
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setDesc} value={desc} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                {...register('city', {
                  required: 'City is required',
                })}
              />
              {errors?.city?.message && (
                <span className="inputError">{errors?.city?.message}</span>
              )}
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input
                type="number"
                id="bedroom"
                {...register('bedroom', {
                  required: 'Bedroom count is required',
                  min: {
                    value: 1,
                    message: 'Minimum 1 bedroom is required',
                  },
                  valueAsNumber: true,
                })}
              />
              {errors?.bedroom?.message && (
                <span className="inputError">{errors?.bedroom?.message}</span>
              )}
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input
                type="number"
                id="bathroom"
                {...register('bathroom', {
                  required: 'Bathroom count is required',
                  min: {
                    value: 1,
                    message: 'Minimum 1 bathroom is required',
                  },
                  valueAsNumber: true,
                })}
              />
              {errors?.bathroom?.message && (
                <span className="inputError">{errors?.bathroom?.message}</span>
              )}
            </div>

            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                id="latitude"
                {...register('latitude', {
                  required: 'Latitude is required',
                })}
              />
              {errors?.latitude?.message && (
                <span className="inputError">{errors?.latitude?.message}</span>
              )}
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                id="longitude"
                {...register('longitude', {
                  required: 'Longitude is required',
                })}
              />
              {errors?.longitude?.message && (
                <span className="inputError">{errors?.longitude?.message}</span>
              )}
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select id="type" {...register('type')}>
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select id="property" {...register('property')}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select id="utilities" {...register('utilities')}>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select id="pet" {...register('pet')}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not allowed</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                type="text"
                id="income"
                {...register('income', {
                  required: 'Income policy details required',
                })}
              />
              {errors?.income?.message && (
                <span className="inputError">{errors?.income?.message}</span>
              )}
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input
                type="number"
                id="size"
                {...register('size', {
                  required: 'Size is required',
                  valueAsNumber: true,
                })}
              />
              {errors?.size?.message && (
                <span className="inputError">{errors?.size?.message}</span>
              )}
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input
                type="number"
                id="school"
                {...register('school', {
                  required: 'School distance is required',
                  valueAsNumber: true,
                })}
              />
              {errors?.school?.message && (
                <span className="inputError">{errors?.school?.message}</span>
              )}
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input
                type="number"
                id="bus"
                {...register('bus', {
                  required: 'Bus stand distance is required',
                  valueAsNumber: true,
                })}
              />
              {errors?.bus?.message && (
                <span className="inputError">{errors?.bus?.message}</span>
              )}
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input
                type="number"
                id="restaurant"
                {...register('restaurant', {
                  required: 'Restaurant distance is required',
                  valueAsNumber: true,
                })}
              />
              {errors?.restaurant?.message && (
                <span className="inputError">
                  {errors?.restaurant?.message}
                </span>
              )}
            </div>
            <button disabled={isLoading} className="sendButton">
              Add
            </button>
          </form>
        </div>
      </div>
      <div className={`sideContainer ${imagesGreaterThanZero && 'hasImages'}`}>
        {imagesGreaterThanZero > 0 && (
          <div className="imageContainer">
            {images.map((image, index) => (
              <img src={image} key={index} alt={`post-image-${index}`} />
            ))}
          </div>
        )}
        <UploadWidget
          uwConfig={{
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET_NAME,
            folder: process.env.REACT_APP_CLOUDINARY_POSTS_FOLDER_NAME,
            multiple: true,
            maxFiles: 4,
            // Allow max 500KB image size
            maxImageFileSize: 512500,
            clientAllowedFormats: ['jpeg', 'jpg', 'png'],
          }}
          setState={setImages}
          buttonTitle="Select Property Images"
        />
      </div>
      <h1 className="mediumScreenHeader">Add New Post</h1>
    </div>
  );
};
