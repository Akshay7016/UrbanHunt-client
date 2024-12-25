import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuthContext } from 'context/AuthContext';
import { apiRequest } from 'lib/apiRequest';
import UploadWidget from 'components/UploadWidget/UploadWidget';

import './UpdateProfile.scss';

export const UpdateProfile = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: currentUser?.username,
      email: currentUser?.email,
    },
  });

  const updateProfile = async (data) => {
    try {
      setIsLoading(true);
      const { data: userDetails } = await apiRequest.put(
        `/users/${currentUser?.id}`,
        { ...data, avatar },
      );
      updateUser(userDetails);
      toast.success('Details updated');
      navigate('/profile');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit(updateProfile)} noValidate>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              {...register('username', {
                required: 'Username is required',
              })}
              id="username"
              placeholder="Username"
            />
            {errors?.username?.message && (
              <span>{errors?.username?.message}</span>
            )}
          </div>

          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Enter valid email address',
                },
              })}
              id="email"
              placeholder="Email"
            />
            {errors?.email?.message && <span>{errors?.email?.message}</span>}
          </div>

          <div className="item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              {...register('password')}
              id="password"
              placeholder="Password"
            />
          </div>

          <button disabled={isLoading}>Update</button>
        </form>
      </div>
      <div className="imageContainer">
        <img src={avatar ?? '/images/avatar.jpg'} alt="user-avatar" />
        <UploadWidget
          uwConfig={{
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET_NAME,
            multiple: false,
            // Allow max 300KB image size
            maxImageFileSize: 308000,
            folder: process.env.REACT_APP_CLOUDINARY_AVATAR_FOLDER_NAME,
            clientAllowedFormats: ['jpeg', 'jpg', 'png'],
          }}
          setAvatar={setAvatar}
        />
      </div>
    </div>
  );
};
