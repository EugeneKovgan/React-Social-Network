import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: { "API-KEY": "0b874356-c466-4f4a-a5c1-851157f6c2a3" },
});

export const userAPI = {
  userId: null,

  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`, {})
      .then((response) => {
        return response.data;
      });
  },

  getAuthMe() {
    return instance.get(`auth/me`, {}).then((response) => {
      this.userId = response.data.data.id;
      return response.data;
    });
  },

  getProfileInfo(userId) {
    return instance.get(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },

  unfollow(userId) {
    return instance.delete(`follow/${userId}`, {});
  },

  follow(userId) {
    return instance.post(`follow/${userId}`, {});
  },
};
