import { instance, ResponseType, ResultCodeEnum, ResultCodeEnumWithCaptcha } from './api';

type GetAuthMeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type loginResponseDataType = {
  userId: number;
};

export const authAPI = {
  getAuthMe() {
    return instance.get<ResponseType<GetAuthMeResponseDataType>>(`auth/me`, {}).then((response) => {
      return response.data;
    });
  },

  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance
      .post<ResponseType<loginResponseDataType, ResultCodeEnum | ResultCodeEnumWithCaptcha>>('auth/login', {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((response) => {
        return response.data;
      });
  },

  logout() {
    return instance.delete('auth/login').then((response) => {
      return response.data;
    });
  },
};
