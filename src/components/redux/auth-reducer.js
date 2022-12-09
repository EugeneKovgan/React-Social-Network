import { authAPI, userAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SET_USERS_DATA = "SET_USERS_DATA";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const setAuthUserData = (id, email, login, isAuth) => ({
  type: SET_USERS_DATA,
  payload: { id, email, login, isAuth }
});

export const getAuthUserData = () => async (dispatch) => {
  let response = await authAPI.getAuthMe();
  if (!response.resultCode) {
    let { id, login, email } = response.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe) => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe);
  console.log(response);
  if (!response.resultCode) {
    dispatch(getAuthUserData());
  } else {
    let errorMessage =
      response.messages.length > 0 ? response.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: errorMessage }));
  }
};

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout();
  if (!response.resultCode) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
