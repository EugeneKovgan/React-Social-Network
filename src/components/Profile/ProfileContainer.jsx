import React, { Component } from "react";
import Profile from "./Profile";
import { getUserProfile } from "../redux/profile-reducer";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { userAPI } from "../../api/api";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";

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
      userId = userAPI.userId; // need to fix
    }
    this.props.getUserProfile(userId);
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} />;
  }
}

let AuthRedirectComponent = WithAuthRedirect(ProfileContainer);

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
});

const WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, { getUserProfile })(
  WithUrlDataContainerComponent
);
