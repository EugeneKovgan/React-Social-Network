import styles from "./Content.module.css";
import Login from "../Login/Login";
import News from "../News/News";
import Music from "../Music/Music";
import Settings from "../Settings/Settings";
import { Route, Routes } from "react-router-dom";
import DialogsContainer from "../Dialogs/DialogsContainer";
import UsersContainer from "../Users/UsersContainer";
import ProfileContainer, { withRouter } from "../Profile/ProfileContainer";
import { compose } from "redux";
import { connect } from "react-redux";
import { getAuthUserData } from "../redux/auth-reducer";
import { Component } from "react";
import { InitializeApp } from "../redux/app-reducer";
import Preloader from "../Preloader/Preloader";

class Content extends Component {
  componentDidMount() {
    console.log("App_componentDidMount");
    this.props.InitializeApp();
  }

  render() {
    return this.props.initialize ? (
      <div className={styles.content}>
        <Routes>
          <Route path="/profile" element={<ProfileContainer />}>
            <Route path=":userId" element={<ProfileContainer />} />
          </Route>
          <Route path="/dialogs/*" element={<DialogsContainer />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/users/*" element={<UsersContainer />} />
          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    ) : (
      <div className={styles.content}>
        <Preloader />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialize: state.app.initialized,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { InitializeApp })
)(Content);
