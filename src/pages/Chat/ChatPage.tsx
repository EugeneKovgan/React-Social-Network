import styles from './ChatPage.module.css';
import photo from '../../assets/img/avatar.jpg';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessageType } from '../../api/chat-api';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startMessagesListening, stoptMessagesListening } from '../../components/redux/chat-reducer';
import { AppDispatch, AppStateType } from '../../components/redux/redux-store';
import React from 'react';

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stoptMessagesListening());
    };
  }, []);

  return (
    <div className={styles.chat}>
      {status === 'error' ? <div>need to restart</div> : ''}
      <>
        <AddMessageForm />
        <Messages />
      </>
    </div>
  );
};

const Messages: React.FC = React.memo(() => {
  console.log('...messages');
  const messages = useSelector((state: AppStateType) => state.chat.messages);
  const reversedMessages = [...messages].reverse();

  return (
    <div className={styles.messages}>
      {reversedMessages.map((item) => {
        return <Message key={item.id} props={item} />;
      })}
    </div>
  );
});

const Message: React.FC<{ props: ChatMessageType }> = React.memo(({ props }) => {
  console.log('one message');
  return (
    <div className={styles.message}>
      <div className={styles.info_block}>
        <img className={styles.post_avatar} src={props.photo ? props.photo : photo} alt='photo' />
        <p>{props.userName}</p>
      </div>
      <div className={styles.textBlock}>
        <div className={styles.header_block}>
          <p>{props.message}</p>
        </div>
        <div className={styles.footer_block}></div>
      </div>
    </div>
  );
});

const AddMessageForm: React.FC<{}> = () => {
  const [message, setMessage] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () => {
    if (message) {
      dispatch(sendMessage(message));
      setMessage('');
    }
  };

  return (
    <div className={styles.addMessageForm}>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      <button disabled={status !== 'ready'} onClick={sendMessageHandler}>
        add
      </button>
    </div>
  );
};

export default ChatPage;
