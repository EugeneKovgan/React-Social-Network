import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
  return (
    <div className={styles.myPosts}>
      <div className={styles.newPostBlock}>
        <textarea name="" id="" rows="10"></textarea>
        <button>App post</button>
      </div>

      <div className={styles.postList}>
        <Post message="hello" likes="5" />
        <Post message="hello my friend" likes="3" />
        <Post message="hello my friend - 2" likes="7" />
        <Post message="hello my friend - 3" likes="2" />
      </div>
    </div>
  );
};

export default MyPosts;
