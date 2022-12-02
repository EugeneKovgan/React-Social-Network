import React, { Component } from "react";
import Profile from "./Profile";
import {
  getStatus,
  getUserProfile,
  updateStatus,
} from "../redux/profile-reducer";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";
import { compose } from "redux";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class ProfileContainer extends Component {
  componentDidMount() {
    console.log("ProfileContainer_componentDidMount");
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isAuth: state.auth.isAuth,
  authorizedUserId: state.auth.id,
});

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus }),
  withRouter,
  WithAuthRedirect //need to fix
)(ProfileContainer);
