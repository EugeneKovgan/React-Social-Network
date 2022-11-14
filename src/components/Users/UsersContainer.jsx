import { connect } from "react-redux";
// import Users from "./Users";
import Users from "./UsersClass";
import { followAC, setUsersAC, unfollowAC } from "../redux/users-reducer";

const mapStateToProps = (state) => {
  return { users: state.usersPage.users };
};

const mapDispatchToProps = (dispatch) => {
  return {
    follow: (userId) => {
      dispatch(followAC(userId));
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId));
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users));
    },
  };
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersContainer;
