import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import './ContactUs.scss';

export const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = () => {
    toast.success(
      "Thank you! We've received your message and will get back to you soon.",
    );
    reset();
  };

  return (
    <div className="contactPage">
      <div className="contact">
        <h1>Contact Us</h1>
        <p>
          We would love to hear from you! Whether you have questions, feedback,
          or suggestions, feel free to get in touch using the form below.
        </p>
        <form onSubmit={handleSubmit(submitHandler)} noValidate>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              {...register('name', {
                required: 'Name is required',
              })}
            />
            {errors?.name?.message && <span>{errors?.name?.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: 'Enter valid email address',
                },
              })}
            />
            {errors?.email?.message && <span>{errors?.email?.message}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows="5"
              {...register('message', {
                required: 'Message is required',
              })}
            ></textarea>
            {errors?.message?.message && (
              <span>{errors?.message?.message}</span>
            )}
          </div>
          <button className="btn">Send Message</button>
        </form>
      </div>
    </div>
  );
};
