import axios from 'axios';
import { getCaptchaURL } from '../components/redux/auth-reducer';
import { ProfileType } from '../types/types';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: { 'api-key': '0b874356-c466-4f4a-a5c1-851157f6c2a3' },
});

export const userAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`, {}).then((response) => {
      return response.data;
    });
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`, {});
  },

  follow(userId: number) {
    return instance.post(`follow/${userId}`, {});
  },

  getProfileInfo(userId: number) {
    console.warn('use profileAPI ');
    profileAPI.getProfileInfo(userId);
  },
};

export const profileAPI = {
  getProfileInfo(userId: number) {
    return instance.get(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },

  getStatus(userId: number) {
    return instance.get(`profile/status/${userId}`).then((response) => {
      return response.data;
    });
  },

  updateStatus(status: string) {
    return instance.put(`profile/status`, { status: status }).then((response) => {
      return response.data;
    });
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instance.put('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put('profile', profile);
  },
};

export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeEnumWithCaptcha {
  CaptchaIsRequired = 10,
}

type GetAuthMeResponseType = {
  data: { id: number; email: string; login: string };
  resultCode: ResultCodeEnum;
  messages: Array<string>;
};

type loginResponseType = {
  data: { userId: number };
  resultCode: ResultCodeEnum | ResultCodeEnumWithCaptcha;
  messages: Array<string>;
};

export const authAPI = {
  getAuthMe() {
    return instance.get<GetAuthMeResponseType>(`auth/me`, {}).then((response) => {
      return response.data;
    });
  },

  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<loginResponseType>('auth/login', { email, password, rememberMe, captcha }).then((response) => {
      return response.data;
    });
  },

  logout() {
    return instance.delete('auth/login').then((response) => {
      return response.data;
    });
  },
};

export const securityAPI = {
  getCaptchaURL() {
    return instance.get(`security/get-captcha-url`);
  },
};
