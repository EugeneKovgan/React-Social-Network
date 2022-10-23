import MyPosts from './MyPosts/MyPosts';
import styles from './Profile.module.css';

const Profile = () => {
  return (
    <main className={styles.content}>
      <MyPosts />
    </main>
  );
};

export default Profile;
