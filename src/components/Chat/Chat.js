import { useState } from 'react';
import toast from 'react-hot-toast';
import { format } from 'timeago.js';
import { useForm } from 'react-hook-form';

import { useAuthContext } from 'context/AuthContext';
import { apiRequest } from 'lib/apiRequest';

import './Chat.scss';

export const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);
  const { currentUser } = useAuthContext();
  const { register, handleSubmit, reset } = useForm();

  const handleOpenChat = async (chatId, receiver) => {
    try {
      const { data } = await apiRequest.get(`/chats/${chatId}`);
      setChat({ ...data, receiver });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const sendMessage = async ({ message = '' }) => {
    if (!message) {
      return;
    }

    try {
      const { data } = await apiRequest.post(`/messages/${chat.id}`, {
        text: message,
      });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    reset();
  };

  return (
    <div className="chat">
      {!chat ? (
        <div className="messages">
          <h1>Messages</h1>
          {chats.map((item) => (
            <div
              className="message"
              key={item.id}
              onClick={() => handleOpenChat(item.id, item.receiver)}
              style={{
                backgroundColor: item?.seenBy?.includes(currentUser?.id)
                  ? 'white'
                  : '#fecd514e',
              }}
            >
              <img
                src={item?.receiver?.avatar || '/images/avatar.jpg'}
                alt="user-image"
              />
              <span>{item?.receiver?.username}</span>
              <p>{item.lastMessage}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat?.receiver?.avatar || '/images/avatar.jpg'}
                alt="user-image"
              />
              <span>{chat?.receiver?.username}</span>
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat?.messages?.map((message) => (
              <div
                key={message.id}
                className={`chatMessage ${message.userId === currentUser.id ? 'own' : ''}`}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit(sendMessage)} className="bottom">
            <textarea {...register('message')}></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};
