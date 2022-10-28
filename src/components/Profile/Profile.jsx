import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.css";

const Profile = ({ dialogsData }) => {
  return (
    <main className={styles.profile}>
      <ProfileInfo />
      <MyPosts dialogsData={dialogsData} />
    </main>
  );
};

export default Profile;
