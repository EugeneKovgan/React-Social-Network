// @ts-ignore
import styles from './Users.module.css';
import Paginator from './Paginator';
import User from './User';
import { UserType } from '../../types/types';
import { FilterType } from '../redux/users-reducer';

type PropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  onFilterChanged: (filter: FilterType) => void;
  users: Array<UserType>;
  followingInProgress: Array<number>; //[] as Array<number>
  follow: () => void;
  unfollow: () => void;
};

const Users: React.FC<PropsType> = ({
  totalUsersCount,
  pageSize,
  currentPage,
  onPageChanged,
  onFilterChanged,
  users,
  followingInProgress,
  follow,
  unfollow,
}) => {
  return (
    <div className={styles.usersMainBlock}>
      {/* <UsersSearchForm onFilterChanged={onFilterChanged} /> */}

      <Paginator
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        // @ts-ignore
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
