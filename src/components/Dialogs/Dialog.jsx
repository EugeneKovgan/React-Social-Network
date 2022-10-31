import styles from "./Dialog.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import React from "react";

const Dialogs = ({ dialogsData }) => {
  let newPostElement = React.createRef();
  const click = () => {
    let text = newPostElement.current.value;
    alert(text);
  };

  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogs_items}>
        {dialogsData.profilePage.posts.map((item) => {
          return <DialogItem key={item.id} name={item.name} id={item.id} />;
        })}
      </div>
      <div className={styles.messages}>
        {dialogsData.profilePage.posts.map((item) => {
          return <Message key={item.id} message={item.message} />;
        })}
        <div className={styles.newPostBlock}>
          <textarea ref={newPostElement} name="" id="" />
          <button onClick={click}>App post</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
