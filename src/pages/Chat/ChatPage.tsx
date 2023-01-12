import styles from './ChatPage.module.css';
import photo from '../../assets/img/avatar.jpg';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MessageType } from '../../api/chat-api';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stoptMessagesListening } from '../../components/redux/chat-reducer';
import { AppDispatch, AppStateType } from '../../components/redux/redux-store';

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  // const dispatch = useDispatch();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stoptMessagesListening());
    };
  }, []);

  return (
    <div className={styles.chat}>
      <AddMessageForm />
      <Messages />
    </div>
  );
};

const Messages: React.FC<{}> = ({}) => {
  const messages = useSelector((state: AppStateType) => state.chat.messages);

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

const AddMessageForm: React.FC<{}> = () => {
  const [message, setMessage] = useState('');
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');
  const dispatch: AppDispatch = useDispatch();

  const sendMessageHandler = () => {
    if (message) {
      dispatch(sendMessage(message));
      setMessage('');
    }
  };

  return (
    <div className={styles.addMessageForm}>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      <button disabled={false} onClick={sendMessageHandler}>
        add
      </button>
    </div>
  );
};

export default ChatPage;
