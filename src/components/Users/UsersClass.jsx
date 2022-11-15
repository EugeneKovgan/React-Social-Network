import React from "react";
import axios from "axios";
import styles from "./Users.module.css";
import avatar from "../../assets/img/avatar.jpg";

class Users extends React.Component {
  componentDidMount() {
    console.log("componentDidMount");
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };

  render() {
    const usersCount = this.props.totalUsersCount;
    const pagesCount = Math.ceil(
      this.props.totalUsersCount / this.props.pageSize
    );
    const pages = [];
    for (
      let i = Math.max(this.props.currentPage - 5, 1);
      i <= Math.max(1, Math.min(this.props.currentPage + 5, pagesCount));
      i++
    ) {
      pages.push(i);
    }

    return (
      <div className={styles.usersMainBlock}>
        <div>Total users count: {usersCount}</div>

        <div className={styles.pagesCounterBlock}>
          page:
          {pages.map((item) => {
            return (
              <p
                className={
                  this.props.currentPage === item
                    ? styles.selectedPage
                    : styles.page
                }
                key={item}
                onClick={(e) => this.onPageChanged(item)}
              >
                {item}
              </p>
            );
          })}
        </div>

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
      </div>
    );
  }
}

export default Users;
