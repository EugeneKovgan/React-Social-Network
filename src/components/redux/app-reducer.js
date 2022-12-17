import { getAuthUserData } from "./auth-reducer";

const SET_INITIALIZED = "SET_INITIALIZED";

const initialState = {
  initialized: false
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIALIZED:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const setInitialized = () => ({
  type: SET_INITIALIZED
});

export const InitializeApp = () => (dispatch) => {
  const res = dispatch(getAuthUserData());
  res.then(() => {
    dispatch(setInitialized());
  });
};

export default appReducer;
