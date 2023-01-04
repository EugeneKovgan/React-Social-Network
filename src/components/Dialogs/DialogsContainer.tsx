import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';
import { actions } from '../redux/dialogs-reducer';
import { AppStateType } from '../redux/redux-store';

const mapStateToProps = (state: AppStateType) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    SendMessage: (newMessageBody: any) => {
      dispatch(actions.sendMessageCreator(newMessageBody));
    },
  };
};

export default compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps), WithAuthRedirect)(Dialogs);
