import styles from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
  return (
    <div className={styles.myPosts}>
      <div>
        <textarea name='' id='' cols='30' rows='10'></textarea>
        <button>App post</button>
      </div>
      <div className={styles.postList}>
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default MyPosts;
