import styles from './Post.module.css';
import photo from '../../../../assets/img/avatar.jpg';

const Post = (props) => {
  return (
    <div className={styles.post}>
      <div className={styles.info_block}>
        <img className={styles.post_avatar} src={photo} alt='photo' />
        <p>{props.name}</p>
      </div>

      <div className={styles.textBlock}>
        <div className={styles.header_block}>
          <p>{props.message}</p>
          <p>Phone: {props.phone}</p>
        </div>
        <div className={styles.footer_block}>
          <p>Likes:{props.likes} </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
