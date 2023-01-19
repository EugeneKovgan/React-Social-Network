import styles from './ProfileInfo.module.css';
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';

type PropsType = {
  updateStatus: (status: string) => void;
  status: string;
  isOwner: boolean;
};

const ProfileStatusHooks: React.FC<PropsType> = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    if (props.isOwner) {
      setEditMode(true);
    }
  };

  const deActivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div className={styles.ProfileInfo}>
      <div className={styles.statusBlock}>
        {!editMode ? (
          <p onDoubleClick={activateEditMode}>{status || 'no status'}</p>
        ) : (
          <input onChange={onStatusChange} onBlur={deActivateEditMode} autoFocus={true} value={status} />
        )}
      </div>
    </div>
  );
};

export default ProfileStatusHooks;
