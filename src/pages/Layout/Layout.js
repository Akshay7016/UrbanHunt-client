import { Navigate, Outlet } from 'react-router-dom';

import { Navbar } from 'components/Navbar/Navbar';

import './Layout.scss';
import { useAuthContext } from 'context/AuthContext';

export const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export const RequireAuth = () => {
  const { currentUser } = useAuthContext();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
