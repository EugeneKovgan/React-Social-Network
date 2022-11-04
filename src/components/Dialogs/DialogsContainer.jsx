import store, {
  sendMessageCreator,
  updateNewMessageBodyCreator,
} from "../redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = ({ store }) => {
  let state = store.getState().dialogsPage;

  const onSendMessage = () => {
    store.dispatch(sendMessageCreator());
  };
  let onNewMessageChange = (body) => {
    store.dispatch(updateNewMessageBodyCreator(body));
  };

  return (
    <Dialogs
      dialogsPage={state}
      updateNewMessageBody={onNewMessageChange}
      SendMessage={onSendMessage}
    />
  );
};

export default DialogsContainer;
