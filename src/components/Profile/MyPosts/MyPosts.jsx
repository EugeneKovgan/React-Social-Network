import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = ({ state, addPost, updateNewPostText }) => {
  let newPostElement = React.createRef();
  const click = () => {
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
          ref={newPostElement}
          value={state.profilePage.newPostText}
        />
        <button onClick={click}>App post</button>
      </div>

      <div className={styles.postList}>
        {state.profilePage.posts.map((item) => {
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
