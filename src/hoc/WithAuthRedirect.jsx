import { Navigate } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';

let mapStateToPropsForRedirect = (state) => ({
  isAuth: state.auth.isAuth,
});

export const WithAuthRedirect = (IncomingComponent) => {
  class RedirectComponent extends Component {
    render() {
      if (!this.props.isAuth) return <Navigate to='/login' />;
      return <IncomingComponent {...this.props} />;
    }
  }

  let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

  return ConnectedAuthRedirectComponent;
};
