import styles from "./Post.module.css";
import ProfileInfo from "../../ProfileInfo/ProfileInfo";

const Post = (props) => {
  return (
    <div className={styles.post}>
      <ProfileInfo />
      <div className={styles.textBlock}>
        <p>{props.message}</p>
        <p>likes = {props.likes}</p>
      </div>
    </div>
  );
};

export default Post;
