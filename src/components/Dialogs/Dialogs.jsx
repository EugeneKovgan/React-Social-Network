import styles from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = ({ name, id }) => {
  // console.log(name);
  const path = "./dialogs/" + id;
  return (
    <div className={styles.dialog + " " + styles.active}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  );
};

const Message = ({ message }) => {
  console.log(message);
  return <div className="message">{message}</div>;
};

const Dialogs = () => {
  return (
    <div className={styles.dialogs}>
      dialogs (messages)
      <div className={styles.dialogs_items}>
        <DialogItem name="Eugene" id="1" />
        <DialogItem name="Dima" id="2" />
        <DialogItem name="Eugene" id="3" />
      </div>
      <div className={styles.messages}>
        <Message message="hello" />
        <Message message="hello-2" />
        <Message message="hello-3" />
      </div>
    </div>
  );
};

export default Dialogs;
