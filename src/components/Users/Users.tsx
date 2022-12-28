// @ts-ignore
import styles from './Users.module.css';
import Paginator from './Paginator';
import User from './User';
import { UserType } from '../../types/types';

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  users: Array<UserType>;
  followingInProgress: Array<number>; //[] as Array<number>
  follow: () => void;
  unfollow: () => void;
};

let Users: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  users,
  followingInProgress,
  follow,
  unfollow,
}) => {
  return (
    <div className={styles.usersMainBlock}>
      <Paginator
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        followingInProgress={followingInProgress}
        follow={follow}
        unfollow={unfollow}
      />

      <div className={styles.users_list}>
        {users.map((item) => (
          <User
            key={item.id}
            item={item}
            followingInProgress={followingInProgress}
            follow={follow}
            unfollow={unfollow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
