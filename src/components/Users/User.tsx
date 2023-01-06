import styles from './Users.module.css';
import avatar from '../../assets/img/avatar.jpg';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';

type PropsType = {
  item: UserType;
  followingInProgress: Array<number>;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
};

const User: React.FC<PropsType> = ({ followingInProgress, follow, unfollow, item }) => {
  return (
    <div className={styles.user}>
      <NavLink to={`/profile/${item.id}`}>
        <img className={styles.avatar} src={item.photos.small ? item.photos.small : avatar} alt='avatar' />
      </NavLink>
      <div className={styles.informBlock}>
        <span>{item.name}</span>
        {item.followed ? (
          <button
            disabled={followingInProgress.some((id) => id === item.id)}
            className={styles.unfollow}
            onClick={() => {
              unfollow(item.id);
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            disabled={followingInProgress.some((id) => id === item.id)}
            className={styles.follow}
            onClick={() => {
              follow(item.id);
            }}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default User;
