import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './Register.scss';

export const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submitHandler = (data) => {
    console.log('Data', data);
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
              <span>
                {errors?.username?.message}
                <sup>*</sup>
              </span>
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
            {errors?.email?.message && (
              <span>
                {errors?.email?.message}
                <sup>*</sup>
              </span>
            )}
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
              <span>
                {errors?.password?.message}
                <sup>*</sup>
              </span>
            )}
          </div>

          <button>Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imageConatiner">
        <img src="/images/bg.png" alt="bg-img" />
      </div>
    </div>
  );
};
