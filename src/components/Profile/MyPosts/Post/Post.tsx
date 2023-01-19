import styles from './Post.module.css';
import photo from '../../../../assets/img/avatar.jpg';
import React from 'react';

type PropsType = {
  name: string;
  message: string;
  likes: number;
};

const Post: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.post}>
      <div className={styles.info_block}>
        <img className={styles.post_avatar} src={photo} alt='photo' />
        <p>{props.name}</p>
      </div>

      <div className={styles.textBlock}>
        <div className={styles.header_block}>
          <p>{props.message}</p>
        </div>
        <div className={styles.footer_block}>
          <p>Likes:{props.likes} </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
