import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { userData } from 'lib/dummyData';

import './navbar.scss';

export const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = false;

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/images/logo.png" alt="UrbanHunt-logo" />
          <span>UrbanHunt</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>
      <div className="right">
        {user ? (
          <div className="user">
            <img
              src={userData.img}
              alt="user-image"
              onClick={() => navigate('/profile')}
            />
            <span>{userData.name}</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src={open ? '/images/close.png' : '/images/menu.png'}
            alt="menuIcon"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className={open ? 'menu active' : 'menu'}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>
          <Link to="/">Sign in</Link>
          <Link to="/">Sign up</Link>
        </div>
      </div>
    </nav>
  );
};
