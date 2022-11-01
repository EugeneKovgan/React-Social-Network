import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import styles from "./Profile.module.css";

const Profile = ({ state, addPost,updateNewPostText }) => {
  return (
    <main className={styles.profile}>
      <ProfileInfo />
      <MyPosts
          state={state}
        addPost={addPost}
        updateNewPostText={updateNewPostText}
      />
    </main>
  );
};

export default Profile;
