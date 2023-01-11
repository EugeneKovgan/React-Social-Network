import styles from './ChatPage.module.css';
import photo from '../../assets/img/avatar.jpg';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type MessageType = { message: string; photo: string; userId: number; userName: string };

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

const Chat: React.FC = () => {
  const [wsChanel, setWsChanel] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;

    const closeHandler = () => {
      console.log('close WS');
      setTimeout(createChanel, 3000);
    };

    function createChanel() {
      ws?.removeEventListener('close', closeHandler);
      ws?.close();

      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
      ws.addEventListener('close', closeHandler);
      setWsChanel(ws);
    }
    createChanel();

    return () => {
      ws.removeEventListener('close', closeHandler);
      ws.close();
    };
  }, []);

  return (
    <div className={styles.chat}>
      <AddMessageForm wsChanel={wsChanel} />
      <Messages wsChanel={wsChanel} />
    </div>
  );
};

const Messages: React.FC<{ wsChanel: WebSocket | null }> = ({ wsChanel }) => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      let newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    };
    wsChanel?.addEventListener('message', messageHandler);

    return () => {
      wsChanel?.removeEventListener('message', messageHandler);
    };
  }, [wsChanel]);

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

const AddMessageForm: React.FC<{ wsChanel: WebSocket | null }> = ({ wsChanel }) => {
  const [message, setMessage] = useState('');
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

  useEffect(() => {
    let openHandler = () => {
      setReadyStatus('ready');
    };

    wsChanel?.addEventListener('open', openHandler);
    return () => {
      wsChanel?.removeEventListener('open', openHandler);
    };
  }, [wsChanel]);

  const sendMessage = () => {
    if (message) {
      wsChanel?.send(message);
      setMessage('');
    }
  };

  return (
    <div className={styles.addMessageForm}>
      <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
      <button disabled={wsChanel === null || readyStatus !== 'ready'} onClick={sendMessage}>
        add
      </button>
    </div>
  );
};

export default ChatPage;
