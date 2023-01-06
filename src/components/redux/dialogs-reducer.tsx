import { v4 as uuidv4 } from 'uuid';
import { InferActionsTypes } from './redux-store';

type DialogType = { id: string | number; name: string };
type MessageType = { id: string | number; message: string };

let initialState = {
  dialogs: [
    { id: 1, name: 'Dima' },
    { id: 2, name: 'Dima_2' },
    { id: 3, name: 'Dima_3' },
    { id: 4, name: 'Dima_4' },
    { id: 5, name: 'Dima_5' },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'Hello' },
    { id: 3, message: 'Dima_3' },
    { id: 4, message: 'Dima_4' },
    { id: 5, message: 'Dima_5' },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SEND_NEW_MESSAGE':
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: uuidv4(), message: body }],
      };
    default:
      return state;
  }
};

export const actions = {
  sendMessageCreator: (newMessageBody: string) =>
    ({
      type: 'SEND_NEW_MESSAGE',
      newMessageBody,
    } as const),
};

export default dialogsReducer;
