import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";

const MyPosts = ({ addPost, posts }) => {
  const onAddPost = (message) => {
    addPost(message.newPost);
  };

  return (
    <div className={styles.myPosts}>
      <PostReduxForm onSubmit={onAddPost} />
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

const ReduxForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={styles.newPostBlock}>
      <Field
        className={styles.newPostForm}
        component={"textarea"}
        type={"text"}
        placeholder={"New post"}
        name={"newPost"}
      />
      <button>App post</button>
    </form>
  );
};

const PostReduxForm = reduxForm({
  form: "newPost",
})(ReduxForm);

export default MyPosts;
