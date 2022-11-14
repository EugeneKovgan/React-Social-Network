import React from "react";
import axios from "axios";
import styles from "./Users.module.css";
import avatar from "../../assets/img/avatar.jpg";

class Users extends React.Component {
  componentDidMount() {
    console.log("componentDidMount");
    axios
      .get("https://social-network.samuraijs.com/api/1.0/users")
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  }

  render() {
    return (
      <div className={styles.users_list}>
        {this.props.users.map((item) => (
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
                  this.props.unfollow(item.id);
                }}
              >
                "follow"
              </button>
            ) : (
              <button
                onClick={() => {
                  this.props.follow(item.id);
                }}
              >
                "unfollow"
              </button>
            )}
          </div>
        ))}
      </div>
    );
  }
}

export default Users;
