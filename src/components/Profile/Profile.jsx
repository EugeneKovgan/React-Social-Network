import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import React from "react";

const Profile = (props) => {

  return (
    <main className={styles.profile}>
      <ProfileInfo profile={props.profile} />
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
