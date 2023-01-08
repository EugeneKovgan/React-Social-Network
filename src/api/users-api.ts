import { instance, GetItemsType, ResponseType } from './api';

export const userAPI = {
  getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
    return instance
      .get<GetItemsType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`),
        {}
      )
      .then((response) => {
        return response.data;
      });
  },

  unfollow(userId: number) {
    return instance.delete(`follow/${userId}`, {}).then((response) => response.data) as Promise<ResponseType>;
  },

  follow(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`, {}).then((response) => response.data);
  },

  // getProfileInfo(userId: number) {
  //   console.warn('use profileAPI ');
  //   profileAPI.getProfileInfo(userId);
  // },
};
