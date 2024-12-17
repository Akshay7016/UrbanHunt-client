import { useState } from 'react';

import { userData } from 'lib/dummyData';

import './Chat.scss';

export const Chat = () => {
  const [chat, setChat] = useState(true);
  const { img, name } = userData;

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {[1, 2, 3, 4, 5].map(() => (
          <div className="message">
            <img src={img} alt="user-image" />
            <span>{name}</span>
            <p>Some message.....</p>
          </div>
        ))}
      </div>

      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={img} alt="user-iamge" />
              <span>{name}</span>
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            <div className="chatMessage">
              <p>Hi</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>How are you</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Hi</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>I am fine</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>How are you?</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>I am doing good</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Lorem Lorem Lorem Lorem</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem Lorem Lorem Lorem</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Lorem Lorem Lorem Lorem</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem Lorem Lorem Lorem</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Lorem Lorem Lorem Lorem</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage">
              <p>Lorem Lorem Lorem Lorem</p>
              <span>1 hour ago</span>
            </div>
            <div className="chatMessage own">
              <p>Lorem Lorem Lorem Lorem</p>
              <span>1 hour ago</span>
            </div>
          </div>
          <div className="bottom">
            <textarea></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};
