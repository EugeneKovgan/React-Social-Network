// import { store, actions } from '../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
// import React from 'react';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { actions } from '../redux/dialogs-reducer';

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SendMessage: (newMessageBody) => {
      dispatch(actions.sendMessageCreator(newMessageBody));
    },
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps), WithAuthRedirect)(Dialogs);
