import { ResultCodeEnum, ResultCodeEnumWithCaptcha } from '../../api/api';
import { securityAPI } from '../../api/security-api';
import { authAPI } from '../../api/auth-api';
// @ts-ignore
import { stopSubmit } from 'redux-form';
const SET_USERS_DATA = 'SET_USERS_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

type InitialStateType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaURL: string | null;
};
let initialState: InitialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaURL: null,
};

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_USERS_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

type SetAuthUserDataActionPayloadType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};
type SetAuthUserDataActionType = { type: typeof SET_USERS_DATA; payload: SetAuthUserDataActionPayloadType };

const setAuthUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): SetAuthUserDataActionType => ({
  type: SET_USERS_DATA,
  payload: { id, email, login, isAuth },
});

type GetCaptchaURLSuccessType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS;
  payload: { captchaURL: string };
};

const getCaptchaURLSuccess = (captchaURL: string): GetCaptchaURLSuccessType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaURL },
});

export const getAuthUserData = () => async (dispatch: any) => {
  const response = await authAPI.getAuthMe();
  if (response.resultCode === ResultCodeEnum.Success) {
    const { id, login, email } = response.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string | any) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (response.resultCode === ResultCodeEnumWithCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaURL());
      }
      let errorMessage = response.messages.length > 0 ? response.messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: errorMessage }));
    }
  };

export const getCaptchaURL = () => async (dispatch: any) => {
  const response = await securityAPI.getCaptchaURL();
  const captchaURL = response.url;
  console.log(captchaURL);
  dispatch(getCaptchaURLSuccess(captchaURL));
};

export const logout = () => async (dispatch: any) => {
  const response = await authAPI.logout();
  if (response.resultCode === ResultCodeEnum.Success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
