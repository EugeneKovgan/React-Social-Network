import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";

const Profile = ({ profile, status, updateStatus }) => {
  return (
    <main className={styles.profile}>
      <ProfileInfo
        profile={profile}
        status={status}
        updateStatus={updateStatus}
      />
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
