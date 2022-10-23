import styles from './Post.module.css';
import photo from '../../../../assets/img/artur.jpg';

const Post = (props) => {
  return (
    <div className={styles.post}>
      <img src={photo} alt='photo' />
      <div className={styles.textBlock}>
        <p>{props.message}</p>
        <p>likes = {props.likes}</p>
      </div>
    </div>
  );
};

export default Post;
