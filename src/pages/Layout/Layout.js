import { Outlet } from 'react-router-dom';

import { Navbar } from 'components/Navbar/Navbar';

import './Layout.scss';

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
