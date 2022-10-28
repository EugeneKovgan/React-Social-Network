import styles from "./Dialog.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = ({ dialogsData }) => {
  return (
    <div className={styles.dialogs}>
      <div className={styles.dialogs_items}>
        {dialogsData.map((item) => {
          return <DialogItem key={item.id} name={item.name} id={item.id} />;
        })}
      </div>
      <div className={styles.messages}>
        {dialogsData.map((item) => {
          return <Message key={item.id} message={item.company.catchPhrase} />;
        })}
      </div>
    </div>
  );
};

export default Dialogs;
