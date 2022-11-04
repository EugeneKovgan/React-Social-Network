import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = ({ store }) => {
  return (
    <main className={styles.profile}>
      <ProfileInfo />
      <MyPostsContainer store={store} />
    </main>
  );
};

export default Profile;
