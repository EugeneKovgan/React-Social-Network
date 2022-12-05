import styles from "./ProfileInfo.module.css";
import { useState } from "react";

const ProfileStatusHooks = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deActivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  console.log("ProfileStatus_render");
  return (
    <div className={styles.ProfileInfo}>
      <div className={styles.statusBlock}>
        {!editMode ?
          (<p onDoubleClick={activateEditMode}>
            {props.status || "no status"}
          </p>) :
          (<input
            onChange={onStatusChange}
            onBlur={deActivateEditMode}
            autoFocus={true}
            value={status}
            // Дублируешь? Ты го$ноко&ер! Оторвать тебе руку! Ты больше не самурай!
          />)}
      </div>
    </div>
  );

};

export default ProfileStatusHooks;
