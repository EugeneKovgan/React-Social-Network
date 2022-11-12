import axios from "axios";
import styles from "./Users.module.css";
import avatar from "../../assets/img/avatar.jpg";

const Users = (props) => {
  const getUsers = () => {
    if (props.users.length == 0) {
      axios
        .get("https://social-network.samuraijs.com/api/1.0/users")
        .then((response) => {
          props.setUsers(response.data.items);
        });
    }
  };

  return (
    <div className={styles.users_list}>
      <button onClick={getUsers}>get users</button>

      {props.users.map((item) => (
        <div className={styles.user} key={item.id}>
          <img
            className={styles.avatar}
            src={item.photos.small ? item.photos.small : avatar}
            alt="avatar"
          />

          <span>{item.name}</span>
          {item.followed ? (
            <button
              onClick={() => {
                props.unfollow(item.id);
              }}
            >
              "follow"
            </button>
          ) : (
            <button
              onClick={() => {
                props.follow(item.id);
              }}
            >
              "unfollow"
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Users;
