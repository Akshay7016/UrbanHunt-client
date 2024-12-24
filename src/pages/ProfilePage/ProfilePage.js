import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { userData } from 'lib/dummyData';
import { List } from 'components/List/List';
import { Chat } from 'components/Chat/Chat';
import { apiRequest } from 'lib/apiRequest';

import './ProfilePage.scss';

export const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      toast.toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar: <img src={userData.img} alt="user-image" />
            </span>
            <span>
              Username: <b>{userData.name}</b>
            </span>
            <span>
              E-mail: <b>akshay@test.com</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
};
