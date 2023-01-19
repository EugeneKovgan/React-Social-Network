import { ChatMessageType, chatAPI, StatusType } from '../../api/chat-api';
import { ResultCodeEnum, ResultCodeEnumWithCaptcha } from '../../api/api';
import { securityAPI } from '../../api/security-api';
import { authAPI } from '../../api/auth-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { Dispatch } from 'redux';
import { v4 as uuidv4 } from 'uuid';

type ChatMessageTypeWithID = ChatMessageType & { id: string };
let initialState = {
  messages: [] as ChatMessageTypeWithID[],
  status: 'pending' as StatusType,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

const chatReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case 'chat/MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map((m: any) => ({ ...m, id: uuidv4() }))].filter(
          (m, index, array) => {
            return index >= array.length - 100;
          }
        ),
      };
    case 'chat/STATUS_CHANGED':
      return { ...state, status: action.payload.status };
    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: 'chat/MESSAGES_RECEIVED',
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: 'chat/STATUS_CHANGED',
      payload: { status },
    } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};

export const stoptMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;
