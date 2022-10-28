import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = ({ dialogsData }) => {
  return (
    <div className={styles.myPosts}>
      <div className={styles.newPostBlock}>
        <textarea name="" id="" rows="10"></textarea>
        <button>App post</button>
      </div>

      <div className={styles.postList}>
        {dialogsData.map((item) => {
          return (
            <Post
              key={item.id}
              message={item.company.name}
              likes={item.phone}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyPosts;
