import { getAuthUserData } from './auth-reducer';

const SET_INITIALIZED = 'SET_INITIALIZED';

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state: InitialStateType = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, initialized: true };
    default:
      return state;
  }
};
type SetInitializedActionType = {
  type: typeof SET_INITIALIZED;
};
export const setInitialized = (): SetInitializedActionType => ({
  type: SET_INITIALIZED,
});

export const InitializeApp = () => (dispatch: any) => {
  const res = dispatch(getAuthUserData());
  res.then(() => {
    dispatch(setInitialized());
  });
};

export default appReducer;
