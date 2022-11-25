import { Component } from "react";
import { connect } from "react-redux";
import {
  followSuccess,
  setUsers,
  unfollowSuccess,
  setCurrentPage,
  setTotalUsersCount,
  setIsFetching,
  setFollowingProgress,
  getUsers,
  follow,
  unfollow,
} from "../redux/users-reducer";
import { userAPI } from "../../api/api";
import Preloader from "../Preloader/Preloader";
import Users from "./Users";

class UsersContainer extends Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
    // this.props.setIsFetching(true);
    // userAPI
    //   .getUsers(this.props.currentPage, this.props.pageSize)
    //   .then((response) => {
    //     this.props.setIsFetching(false);
    //     this.props.setUsers(response.items);
    //     this.props.setTotalUsersCount(response.totalCount);
    //   });
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
    // this.props.setIsFetching(true);
    // userAPI.getUsers(pageNumber, this.props.pageSize).then((response) => {
    //   this.props.setIsFetching(false);
    //   this.props.setUsers(response.items);
    // });
  };

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            onPageChanged={this.onPageChanged}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            followingInProgress={this.props.followingInProgress}
            // setFollowingProgress={this.props.setFollowingProgress}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  setCurrentPage,
  // setTotalUsersCount,
  getUsers,
})(UsersContainer);
