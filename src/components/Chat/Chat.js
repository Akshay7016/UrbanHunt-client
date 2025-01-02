import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { format } from 'timeago.js';
import { useForm } from 'react-hook-form';

import { useAuthContext } from 'context/AuthContext';
import { apiRequest } from 'lib/apiRequest';
import { useSocketContext } from 'context/SocketContext';
import { useNotificationStore } from 'lib/notificationStore';
import { useSelectChat } from 'lib/selectChatStore';

import './Chat.scss';

export const Chat = ({ chats }) => {
  const messageEndRef = useRef();
  const chatRefs = useRef({});
  const [chat, setChat] = useState(null);
  const { currentUser } = useAuthContext();
  const { socket } = useSocketContext();
  const { register, handleSubmit, reset } = useForm();
  const decrease = useNotificationStore((state) => state.decrease);
  const selectedChat = useSelectChat((state) => state.selectChat);
  const setSelectedChat = useSelectChat((state) => state.setSelectChat);

  const handleOpenChat = async (chatId, receiver) => {
    try {
      const { data } = await apiRequest.get(`/chats/${chatId}`);
      setChat({ ...data, receiver });
      if (!data?.seenBy?.includes(currentUser.id)) {
        decrease();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const handleCloseChatModal = () => {
    setChat(null);
    setSelectedChat(null);
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
      socket.emit('sendMessage', {
        receiverId: chat.receiver?.id,
        data,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    reset();
  };

  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put(`/chats/read/${chat.id}`);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };

    if (socket && chat) {
      socket.on('getMessage', (data) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }

    return () => {
      if (socket) {
        socket.off('getMessage');
      }
    };
  }, [socket, chat]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  useEffect(() => {
    if (selectedChat && chatRefs.current[selectedChat]) {
      chatRefs.current[selectedChat].click(); // Trigger a click on the matching div
    }
  }, [selectedChat]);

  return (
    <div className="chat">
      {!chat ? (
        <div className="messages">
          <h1>Messages</h1>
          {chats.map((userChat) => (
            <div
              className="message"
              key={userChat.id}
              ref={(curr) => (chatRefs.current[userChat.id] = curr)}
              onClick={() => handleOpenChat(userChat.id, userChat.receiver)}
              style={{
                backgroundColor: userChat?.seenBy?.includes(currentUser?.id)
                  ? 'white'
                  : '#fecd514e',
              }}
            >
              <img
                src={userChat?.receiver?.avatar || '/images/avatar.jpg'}
                alt="user-image"
              />
              <span>{userChat?.receiver?.username}</span>
              <p>{userChat.lastMessage}</p>
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
            <span className="close" onClick={handleCloseChatModal}>
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
            <div ref={messageEndRef}></div>
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
