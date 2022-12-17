import { authAPI, securityAPI, userAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const SET_USERS_DATA = "SET_USERS_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaURL: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const setAuthUserData = (id, email, login, isAuth) => ({
  type: SET_USERS_DATA,
  payload: { id, email, login, isAuth }
});

const getCaptchaURLSuccess = (captchaURL) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaURL }
});

export const getAuthUserData = () => async (dispatch) => {
  const response = await authAPI.getAuthMe();
  if (!response.resultCode) {
    const { id, login, email } = response.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);
  console.log(response);
  if (!response.resultCode) {
    dispatch(getAuthUserData());
  } else {
    if (response.resultCode === 10) {
      dispatch(getCaptchaURL());
    }
    let errorMessage =
      response.messages.length > 0 ? response.messages[0] : "Some error";
    dispatch(stopSubmit("login", { _error: errorMessage }));
  }
};

export const getCaptchaURL = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaURL();
  const captchaURL = response.data.url;
  console.log(captchaURL);
  dispatch(getCaptchaURLSuccess(captchaURL));
};

export const logout = () => async (dispatch) => {
  const response = await authAPI.logout();
  if (!response.resultCode) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
