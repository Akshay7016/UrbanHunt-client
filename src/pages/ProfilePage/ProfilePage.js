import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { List } from 'components/List/List';
import { Chat } from 'components/Chat/Chat';
import { apiRequest } from 'lib/apiRequest';
import { useAuthContext } from 'context/AuthContext';

import './ProfilePage.scss';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      updateUser(null);
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
            <button onClick={() => navigate('/profile/update')}>
              Update Profile
            </button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser?.avatar ?? '/images/avatar.jpg'}
                alt="user-image"
              />
            </span>
            <span>
              Username: <b>{currentUser?.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser?.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button onClick={() => navigate("/createPost")}>Create New Post</button>
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
