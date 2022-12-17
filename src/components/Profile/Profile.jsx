import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";

const Profile = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
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
