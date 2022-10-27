import styles from "./Dialogs.module.css";
import { NavLink } from "react-router-dom";

const Dialogs = () => {
  return (
    <div className={styles.dialogs}>
      dialogs (messages)
      <div className={styles.dialogs_items}>
        <div className={styles.dialog + " " + styles.active}>
          <NavLink to="./dialogs/1">Eugene</NavLink>
        </div>
        <div className={styles.dialog}>
          <NavLink to="./dialogs/2">Eugene</NavLink>
        </div>
        <div className={styles.dialog}>
          <NavLink to="./dialogs/3">Eugene</NavLink>
        </div>
      </div>
      <div className={styles.messages}>
        <div className="message">hi</div>
        <div className="message">hi-hi</div>
        <div className="message">hello</div>
      </div>
    </div>
  );
};

export default Dialogs;
