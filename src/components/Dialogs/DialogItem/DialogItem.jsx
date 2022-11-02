import styles from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";

const DialogItem = ({ name, id }) => {
  const path = "./dialogs/" + id;
  return (
    <div className={styles.dialogItem}>
      <NavLink to={path}>{name}</NavLink>
    </div>
  );
};

export default DialogItem;
