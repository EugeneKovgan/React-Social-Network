import styles from "./Users.module.css";
import avatar from "../../assets/img/avatar.jpg";
import { NavLink } from "react-router-dom";
import { userAPI } from "../../api/api";

const Users = (props) => {
  const usersCount = props.totalUsersCount;
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];
  for (
    let i = Math.max(props.currentPage - 5, 1);
    i <= Math.max(1, Math.min(props.currentPage + 5, pagesCount));
    i++
  ) {
    pages.push(i);
  }

  return (
    <div className={styles.usersMainBlock}>
      <div className={styles.total}>
        Total users count: <p>{usersCount}</p>
      </div>

      <div className={styles.pagesCounterBlock}>
        page:
        {pages.map((item) => {
          return (
            <p
              className={
                props.currentPage === item ? styles.selectedPage : styles.page
              }
              key={item}
              onClick={(e) => props.onPageChanged(item)}
            >
              {item}
            </p>
          );
        })}
      </div>

      <div className={styles.users_list}>
        {props.users.map((item) => (
          <div className={styles.user} key={item.id}>
            <NavLink to={`/profile/${item.id}`}>
              <img
                className={styles.avatar}
                src={item.photos.small ? item.photos.small : avatar}
                alt="avatar"
              />
            </NavLink>
            <div className={styles.informBlock}>
              <span>{item.name}</span>
              {item.followed ? (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === item.id
                  )}
                  className={styles.unfollow}
                  onClick={() => {
                    props.setFollowingProgress(true, item.id);
                    userAPI.unfollow(item).then((response) => {
                      if (response.data.resultCode === 0) {
                        props.unfollow(item.id);
                      }
                      props.setFollowingProgress(false, item.id);
                    });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some(
                    (id) => id === item.id
                  )}
                  className={styles.follow}
                  onClick={() => {
                    props.setFollowingProgress(true, item.id);
                    userAPI.follow(item).then((response) => {
                      if (response.data.resultCode === 0) {
                        props.follow(item.id);
                      }
                      props.setFollowingProgress(false, item.id);
                    });
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
