import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";

const Profile = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  return (
    <main className={styles.profile}>
      <ProfileInfo
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        isOwner={isOwner}
        savePhoto={savePhoto}
      />
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
