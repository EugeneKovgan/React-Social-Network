import { getAuthUserData } from './auth-reducer';
import { InferActionsTypes } from './redux-store';

const initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET_INITIALIZED':
      return { ...state, initialized: true };
    default:
      return state;
  }
};

const actions = {
  setInitialized: () =>
    ({
      type: 'APP/SET_INITIALIZED',
    } as const),
};

export const InitializeApp = () => (dispatch: any) => {
  const res = dispatch(getAuthUserData());
  res.then(() => {
    dispatch(actions.setInitialized());
  });
};

export default appReducer;
