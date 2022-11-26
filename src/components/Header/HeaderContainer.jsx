import { Component } from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { getAuthUserData, setAuthUserData } from "../redux/auth-reducer";

class HeaderContainer extends Component {
  componentDidMount() {
    console.log("HeaderContainer_componentDidMount");
    this.props.getAuthUserData();
  }

  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);
