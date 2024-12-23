import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { apiRequest } from 'lib/apiRequest';

import './Register.scss';

export const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (data) => {
    try {
      setIsLoading(true);
      await apiRequest.post('/auth/register', data);
      toast.success('Registration successful');
      reset();
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <div className="formContainer">
        <form onSubmit={handleSubmit(submitHandler)} noValidate>
          <h1>Create an Account</h1>
          <div className="inputFieldContainer">
            <input
              type="text"
              {...register('username', {
                required: 'Username is required',
              })}
              placeholder="Username"
            />
            {errors?.username?.message && (
              <span>{errors?.username?.message}</span>
            )}
          </div>

          <div className="inputFieldContainer">
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Enter valid email address',
                },
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

          <button disabled={isLoading}>Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imageConatiner">
        <img src="/images/bg.png" alt="bg-img" />
      </div>
    </div>
  );
};
