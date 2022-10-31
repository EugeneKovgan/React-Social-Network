import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = ({ dialogsData, addPost, updateNewPostText }) => {
  let newPostElement = React.createRef();
  const click = () => {
    addPost();
    // updateNewPostText("");
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
          value={dialogsData.profilePage.newPostText}
        />
        <button onClick={click}>App post</button>
      </div>

      <div className={styles.postList}>
        {dialogsData.profilePage.posts.map((item) => {
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
