import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <main className={styles.profile}>
      <ProfileInfo />
      <MyPosts />
    </main>
  );
};

export default Profile;
