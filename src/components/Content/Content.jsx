import styles from "./Content.module.css";
import React, { Suspense } from "react";
import Login from "../Login/Login";
import { Route, Routes } from "react-router-dom";
import DialogsContainer from "../Dialogs/DialogsContainer";
import UsersContainer from "../Users/UsersContainer";
import ProfileContainer, { withRouter } from "../Profile/ProfileContainer";
import { compose } from "redux";
import { connect } from "react-redux";
import { Component } from "react";
import { InitializeApp } from "../redux/app-reducer";
import Preloader from "../Preloader/Preloader";

const News = React.lazy(() => import ("../News/News"));
const Music = React.lazy(() => import ("../Music/Music"));
const Settings = React.lazy(() => import ("../Settings/Settings"));

class Content extends Component {
  componentDidMount() {
    console.log("App_componentDidMount");
    this.props.InitializeApp();
  }

  render() {
    return this.props.initialize ? (
      <div className={styles.content}>
        <Suspense fallback={<Preloader />}>
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
        </Suspense>
      </div>
    ) : (
      <div className={styles.content}>
        <Preloader />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialize: state.app.initialized
});

export default compose(
  withRouter,
  connect(mapStateToProps, { InitializeApp })
)(Content);
