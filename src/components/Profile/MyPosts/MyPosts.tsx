import React from 'react';
// @ts-ignore
import styles from './MyPosts.module.css';
import Post from './Post/Post';
// @ts-ignore
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { requiredField, Textarea } from '../../utils/validators';
import { PostType } from '../../../types/types';

type PostReduxFormType = { newPost: string };
type PropsType = { posts: Array<PostType>; addPost: (newPostText: string) => void };

const MyPosts: React.FC<PropsType> = React.memo((props) => {
  let { addPost, posts } = props;
  const onAddPost = (message: PostReduxFormType) => {
    addPost(message.newPost);
  };

  return (
    <div className={styles.myPosts}>
      <PostReduxForm onSubmit={onAddPost} />
      <div className={styles.postList}>
        {[...posts].reverse().map((item) => {
          return <Post key={item.id} message={item.message} name={item.id} likes={item.likesCount} />; //need add name
        })}
      </div>
    </div>
  );
});

const ReduxForm: React.FC<InjectedFormProps<PostReduxFormType & PropsType> & PropsType> = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className={styles.newPostBlock}>
      <Field
        className={styles.newPostForm}
        component={Textarea}
        type={'text'}
        placeholder={'New post'}
        name={'newPost'}
        validate={requiredField}
      />
      <button>App post</button>
    </form>
  );
};

const PostReduxForm = reduxForm<PostReduxFormType>({
  form: 'newPost',
})(ReduxForm);

export default MyPosts;
