import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import styles from './Profile.module.css';

const Profile = ({ state, dispatch }) => {
  return (
    <main className={styles.profile}>
      <ProfileInfo />
      <MyPosts state={state} dispatch={dispatch} />
    </main>
  );
};

export default Profile;
