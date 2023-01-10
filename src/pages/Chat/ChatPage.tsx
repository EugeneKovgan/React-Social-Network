import styles from './ChatPage.module.css';
import photo from '../../assets/img/avatar.jpg';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const wsChanel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

type MessageType = { message: string; photo: string; userId: number; userName: string };

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  return (
    <div className={styles.chat}>
      <AddMessageForm />
      <Messages />
    </div>
  );
};

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    wsChanel.addEventListener('message', (e) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    });
  }, []);

  return (
    <div className={styles.messages}>
      {[...messages].reverse().map((item) => {
        return <Message key={uuidv4()} props={item} />;
      })}
    </div>
  );
};

const Message: React.FC<{ props: MessageType }> = ({ props }) => {
  return (
    <div className={styles.message}>
      <div className={styles.info_block}>
        <img className={styles.post_avatar} src={props.photo ? props.photo : photo} alt='photo' />
        <p>{props.userName}</p>
        {/* <p>{message.userId}</p> */}
      </div>

      <div className={styles.textBlock}>
        <div className={styles.header_block}>
          <p>{props.message}</p>
        </div>
        <div className={styles.footer_block}></div>
      </div>
    </div>
  );
};

const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const sendMessage = () => {
    if (message) {
      wsChanel.send(message);
      setMessage('');
    }
  };
  return (
    <div className='AddMessageForm'>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      <button onClick={sendMessage}>add</button>
    </div>
  );
};

export default ChatPage;
