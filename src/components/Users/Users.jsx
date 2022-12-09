import styles from "./Users.module.css";
import Paginator from "./Paginator";
import User from "./User";

const Users = ({
                 totalUsersCount,
                 pageSize,
                 currentPage,
                 onPageChanged,
                 users,
                 followingInProgress,
                 follow,
                 unfollow
               }) => {

  return (
    <div className={styles.usersMainBlock}>
      <Paginator totalUsersCount={totalUsersCount}
                 pageSize={pageSize}
                 currentPage={currentPage}
                 onPageChanged={onPageChanged}
                 followingInProgress={followingInProgress}
                 follow={follow}
                 unfollow={unfollow} />

      <div className={styles.users_list}>
        {users.map((item) => (
          <User key={item.id} item={item} followingInProgress={followingInProgress} follow={follow}
                unfollow={unfollow} />

        ))}
      </div>
    </div>
  );
};

export default Users;
