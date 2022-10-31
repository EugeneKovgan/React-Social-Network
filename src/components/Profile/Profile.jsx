import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.css";
import { updateNewPostText } from "../redux/state";

const Profile = ({ dialogsData, addPost }) => {
  return (
    <main className={styles.profile}>
      <ProfileInfo />
      <MyPosts
        dialogsData={dialogsData}
        addPost={addPost}
        updateNewPostText={updateNewPostText}
      />
    </main>
  );
};

export default Profile;
