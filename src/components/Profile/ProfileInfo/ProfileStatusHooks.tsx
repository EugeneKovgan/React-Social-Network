// @ts-ignore
import styles from './ProfileInfo.module.css';
import { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { ProfileType } from '../../../types/types';

type ProfileStatusHooksType = {
  updateStatus: (status: string) => void;
  statusInput: string;
  isOwner: boolean;
  // profile: ProfileType;
  // activateEditMode: string;
  // isOwner: boolean;
};

const ProfileStatusHooks: React.FC<ProfileStatusHooksType> = ({ statusInput, isOwner, updateStatus }) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(statusInput);

  useEffect(() => {
    setStatus(status);
  }, [status]);

  const activateEditMode = () => {
    if (isOwner) {
      setEditMode(true);
    }
  };

  const deActivateEditMode = () => {
    setEditMode(false);
    updateStatus(status);
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
          <input
            onChange={onStatusChange}
            onBlur={deActivateEditMode}
            autoFocus={true}
            value={status}
            // Дублируешь? Ты го$ноко&ер! Оторвать тебе руку! Ты больше не самурай!
          />
        )}
      </div>
    </div>
  );
};

export default ProfileStatusHooks;
