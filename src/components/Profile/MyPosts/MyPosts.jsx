import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = ({ dialogsData }) => {
  let newPostElement = React.createRef();
  const click = () => {
    let text = newPostElement.current.value;
    alert(text);
  };
  return (
    <div className={styles.myPosts}>
      <div className={styles.newPostBlock}>
        <textarea ref={newPostElement} name="" id="" rows="10"></textarea>
        <button onClick={click}>App post</button>
      </div>

      <div className={styles.postList}>
        {dialogsData.map((item) => {
          return (
            <Post
              key={item.id}
              message={item.company.name}
              phone={item.phone}
              name={item.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyPosts;
