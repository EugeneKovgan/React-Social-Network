import { ResultCodeEnum, ResultCodeEnumWithCaptcha } from '../../api/api';
import { securityAPI } from '../../api/security-api';
import { authAPI } from '../../api/auth-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
  id: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
  captchaURL: null as string | null,
};
export type InitialStateType = typeof initialState;

type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case 'SET_USERS_DATA':
    case 'GET_CAPTCHA_URL_SUCCESS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

const actions = {
  setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
    ({
      type: 'SET_USERS_DATA',
      payload: { id, email, login, isAuth },
    } as const),
  getCaptchaURLSuccess: (captchaURL: string) =>
    ({
      type: 'GET_CAPTCHA_URL_SUCCESS',
      payload: { captchaURL },
    } as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  const response = await authAPI.getAuthMe();
  if (response.resultCode === ResultCodeEnum.Success) {
    const { id, login, email } = response.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
  async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodeEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (response.resultCode === ResultCodeEnumWithCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaURL());
      }
      // let errorMessage = response.messages.length > 0 ? response.messages[0] : 'Some error';
      // dispatch(stopSubmit('login', { _error: errorMessage }));
    }
  };

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
  const response = await securityAPI.getCaptchaURL();
  const captchaURL = response.url;
  dispatch(actions.getCaptchaURLSuccess(captchaURL));
};

export const logout = (): ThunkType => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.resultCode === ResultCodeEnum.Success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
