import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <main className={styles.content}>
      Profile
      <ProfileInfo />
      <MyPosts />
    </main>
  );
};

export default Profile;
