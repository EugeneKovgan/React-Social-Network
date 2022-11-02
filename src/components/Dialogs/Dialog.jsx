import styles from "./Dialog.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";
import store, {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../redux/state";

const Dialogs = ({ store }) => {
  let state = store.getState().dialogsPage;
  let newMessageBody = state.newMessageBody;
  const click = () => {
    store.dispatch(sendMessageCreator());
  };
  let onNewMessageChange = (e) => {
    let body = e.target.value;
    store.dispatch(updateNewMessageBodyCreator(body));
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
          <button onClick={click}>App post</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
