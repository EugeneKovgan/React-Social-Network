import ProfileInfo from './ProfileInfo/ProfileInfo';
import styles from './Profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import React from 'react';
import { ProfileType } from '../../types/types';

type PropsType = {
  updateStatus: (status: string) => void;
  profile: ProfileType | null;
  status: string;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};
const Profile: React.FC<PropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
  return (
    <main className={styles.profile}>
      <ProfileInfo
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        isOwner={isOwner}
        savePhoto={savePhoto}
        saveProfile={saveProfile}
      />
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
