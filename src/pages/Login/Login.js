import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { apiRequest } from 'lib/apiRequest';
import { useAuthContext } from 'context/AuthContext';

import './Login.scss';

export const Login = () => {
  const navigate = useNavigate();
  const { updateUser, currentUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = async (data) => {
    try {
      setIsLoading(true);
      const { data: userData } = await apiRequest.post('/auth/login', data);
      updateUser(userData);
      reset();
      navigate('/');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="loginPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit(submitHandler)} noValidate>
          <h1>Welcome back</h1>
          <div className="inputFieldContainer">
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
              })}
              placeholder="Email"
            />
            {errors?.email?.message && <span>{errors?.email?.message}</span>}
          </div>

          <div className="inputFieldContainer">
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
              })}
              placeholder="Password"
            />
            {errors?.password?.message && (
              <span>{errors?.password?.message}</span>
            )}
          </div>

          <button disabled={isLoading}>Login</button>
          <Link to="/register">Don't you have an account?</Link>
        </form>
      </div>
      <div className="imageConatiner">
        <img src="/images/bg.png" alt="bg-img" />
      </div>
    </div>
  );
};
