import { MessageType, chatAPI } from '../../api/chat-api';
import { ResultCodeEnum, ResultCodeEnumWithCaptcha } from '../../api/api';
import { securityAPI } from '../../api/security-api';
import { authAPI } from '../../api/auth-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { Dispatch } from 'redux';

let initialState = {
  messages: [] as MessageType[],
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

const chatReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case 'chat/MESSAGES_RECEIVED':
      return { ...state, messages: [...state.messages, ...action.payload.messages] };
    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: MessageType[]) =>
    ({
      type: 'chat/MESSAGES_RECEIVED',
      payload: { messages },
    } as const),
};

let _newMessageHandler: ((messages: MessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};

export const stoptMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;
