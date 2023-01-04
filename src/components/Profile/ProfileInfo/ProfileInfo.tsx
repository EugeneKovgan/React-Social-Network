// @ts-ignore
import styles from './ProfileInfo.module.css';
import { ChangeEvent } from 'react';
// @ts-ignore
import photo from '../../../assets/img/avatar.jpg';
import Preloader from '../../Preloader/Preloader';
import ProfileStatusHooks from './ProfileStatusHooks';
import { useState } from 'react';
import ProfileInfoBlock from './ProfileInfoBlock';
import ProfileInfoBlockForm from './ProfileInfoBlockForm';
import { ProfileType } from '../../../types/types';

type ProfileInfoType = {
  updateStatus: (status: string) => void;
  profile: ProfileType | null;
  status: string;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

const ProfileInfo: React.FC<ProfileInfoType> = ({ updateStatus, profile, status, isOwner, savePhoto, saveProfile }) => {
  let [editMode, setEditMode] = useState(false);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      console.log('photo');
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: ProfileType) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  if (!profile) return <Preloader />;
  return (
    <div className={styles.ProfileInfo}>
      <ProfileStatusHooks updateStatus={updateStatus} isOwner={isOwner} status={status} />
      <img src={profile.photos.small || photo} alt='photo' />
      {isOwner ? <input className={styles.files_btn} onChange={onMainPhotoSelected} type='file' /> : ''}
      {editMode ? (
        <ProfileInfoBlockForm profile={profile} onSubmit={onSubmit} initialValues={profile} />
      ) : (
        <ProfileInfoBlock profile={profile} isOwner={isOwner} activateEditMode={activateEditMode} />
      )}
    </div>
  );
};

export default ProfileInfo;
