import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { List } from 'components/List/List';
import { Chat } from 'components/Chat/Chat';
import { apiRequest } from 'lib/apiRequest';
import { useAuthContext } from 'context/AuthContext';
import { Spinner } from 'components/Spinner/Spinner';

import './ProfilePage.scss';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useAuthContext();
  const [posts, setPosts] = useState({});
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      navigate('/');
      await apiRequest.post('/auth/logout');
      updateUser(null);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const getProfilePosts = async () => {
      try {
        setIsLoading(true);
        const { data } = await apiRequest.get('/users/profilePosts');
        const { data: chatsData } = await apiRequest.get('/chats');
        setPosts(data);
        setChats(chatsData);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    getProfilePosts();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

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
            <button onClick={() => navigate('/createPost')}>
              Create New Post
            </button>
          </div>
          <List posts={posts?.userPosts} />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List posts={posts?.savedPosts} />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat chats={chats} />
        </div>
      </div>
    </div>
  );
};
