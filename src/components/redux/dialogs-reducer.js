const UPDATE_NEW_MESSAGE = "UPDATE_NEW_MESSAGE";
const SEND_NEW_MESSAGE = "SEND_NEW_MESSAGE";

const dialogsReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE:
      state.newMessageBody = action.body;
      return state;
    case SEND_NEW_MESSAGE:
      let body = state.newMessageBody;
      state.newMessageBody = "";
      state.messages.push({ id: 6, message: body });
      return state;
    default:
      return state;
  }
};

export const sendMessageCreator = () => ({
  type: SEND_NEW_MESSAGE,
});
export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE,
  body: body,
});

export default dialogsReducer;
