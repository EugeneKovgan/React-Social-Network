import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { requiredField, Textarea } from "../../utils/validators";

const MyPosts = React.memo(props => {
  let { addPost, posts } = props;
  const onAddPost = (message) => {
    addPost(message.newPost);
  };

  return (
    <div className={styles.myPosts}>
      <PostReduxForm onSubmit={onAddPost} />
      <div className={styles.postList}>
        {[...posts].reverse().map((item) => {
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
});

const ReduxForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={styles.newPostBlock}>
      <Field
        className={styles.newPostForm}
        // component={"textarea"}
        component={Textarea}
        type={"text"}
        placeholder={"New post"}
        name={"newPost"}
        validate={requiredField}
      />
      <button>App post</button>
    </form>
  );
};

const PostReduxForm = reduxForm({
  form: "newPost"
})(ReduxForm);

export default MyPosts;
