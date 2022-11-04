import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";

const Dialogs = ({ dialogsPage, updateNewMessageBody, SendMessage }) => {
  let state = dialogsPage;
  let newMessageBody = state.newMessageBody;
  const onSendMessageClick = () => {
    SendMessage();
  };
  let onNewMessageChange = (e) => {
    let body = e.target.value;
    updateNewMessageBody(body);
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogs_items}>
        {state.dialogs.map((item) => {
          return <DialogItem key={item.id} name={item.name} id={item.id} />;
        })}
      </div>
      <div className={styles.messages}>
        {state.messages.map((item) => {
          return <Message key={item.id} message={item.message} />;
        })}
        <div className={styles.newPostBlock}>
          <textarea value={newMessageBody} onChange={onNewMessageChange} />
          <button onClick={onSendMessageClick}>App post</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
