import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = () => {
  return (
    <main className={styles.profile}>
      <ProfileInfo />
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
