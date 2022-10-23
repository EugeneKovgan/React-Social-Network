import styles from './Post.module.css';
import photo from '../../../../assets/img/artur.jpg';

const Post = () => {
  return (
    <div className={styles.post}>
      <img src={photo} alt='photo' />
      <p>post 1</p>
    </div>
  );
};

export default Post;
