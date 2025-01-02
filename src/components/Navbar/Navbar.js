import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuthContext } from 'context/AuthContext';
import { useNotificationStore } from 'lib/notificationStore';
import { apiRequest } from 'lib/apiRequest';

import './navbar.scss';

export const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { currentUser, updateUser } = useAuthContext();
  const fetch = useNotificationStore((state) => state.fetch);
  const notificationCount = useNotificationStore((state) => state.count);

  if (currentUser) {
    fetch();
  }

  const closeSideBar = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      navigate('/');
      await apiRequest.post('/auth/logout');
      updateUser(null);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

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
        {currentUser ? (
          <div className="user">
            <img
              src={currentUser?.avatar ?? '/images/avatar.jpg'}
              alt="user-image"
              onClick={() => navigate('/profile')}
            />
            <span>{currentUser?.username}</span>
            <Link to="/profile" className="profile">
              {notificationCount > 0 && (
                <div className="notification">{notificationCount}</div>
              )}
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
          <Link to="/" onClick={closeSideBar}>
            Home
          </Link>
          <Link to="/" onClick={closeSideBar}>
            About
          </Link>
          <Link to="/" onClick={closeSideBar}>
            Contact
          </Link>
          <Link to="/" onClick={closeSideBar}>
            Agents
          </Link>
          {!currentUser && (
            <>
              <Link to="/login" onClick={closeSideBar}>
                Sign in
              </Link>
              <Link to="/register" onClick={closeSideBar}>
                Sign up
              </Link>
            </>
          )}
          {currentUser && (
            <>
              <Link to="/profile">Profile</Link>
              <Link onClick={handleLogout}>Logout</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
