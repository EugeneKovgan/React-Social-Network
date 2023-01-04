import React from 'react';
// @ts-ignore
import styles from './MyPosts.module.css';
import Post from './Post/Post';
// @ts-ignore
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { requiredField, Textarea } from '../../utils/validators';
import { PostType } from '../../../types/types';

type PostReduxFormType = { newPost: string };

export type MapPropsType = { posts: Array<PostType> };
export type DispatchPropsType = { addPost: (newPostText: string) => void };

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = React.memo((props) => {
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

const ReduxForm: React.FC<InjectedFormProps<PostReduxFormType & MapPropsType> & MapPropsType> = (props) => {
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
