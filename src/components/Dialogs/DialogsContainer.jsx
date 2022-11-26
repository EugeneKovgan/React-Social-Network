import store, {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import React from "react";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
    SendMessage: () => {
      dispatch(sendMessageCreator());
    },
  };
};

const AuthRedirectComponent = WithAuthRedirect(Dialogs);

const DialogsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRedirectComponent);

export default DialogsContainer;
