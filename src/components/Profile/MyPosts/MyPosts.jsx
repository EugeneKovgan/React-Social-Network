import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = ({ updateNewPostText, addPost, posts, newPostText }) => {
  let newPostElement = React.createRef();
  const onAddPost = () => {
    addPost();
  };

  const onPostChange = () => {
    let text = newPostElement.current.value;
    updateNewPostText(text);
  };

  return (
    <div className={styles.myPosts}>
      <div className={styles.newPostBlock}>
        <textarea
          onChange={onPostChange}
          value={newPostText}
          ref={newPostElement}
        />
        <button onClick={onAddPost}>App post</button>
      </div>

      <div className={styles.postList}>
        {posts.map((item) => {
          return (
            <Post
              key={item.id}
              message={item.message}
              name={item.name}
              likes={item.likesCount}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyPosts;
