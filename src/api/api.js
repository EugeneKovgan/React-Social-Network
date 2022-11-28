import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: { "api-key": "0b874356-c466-4f4a-a5c1-851157f6c2a3" },
});

export const userAPI = {
  getUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`, {})
      .then((response) => {
        return response.data;
      });
  },

  unfollow(userId) {
    return instance.delete(`follow/${userId}`, {});
  },

  follow(userId) {
    return instance.post(`follow/${userId}`, {});
  },

  getProfileInfo(userId) {
    console.warn("use profileAPI ");
    profileAPI.getProfileInfo(userId);
  },
};

export const profileAPI = {
  getProfileInfo(userId) {
    return instance.get(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },

  getStatus(userId) {
    return instance.get(`profile/status/${userId}`).then((response) => {
      return response.data;
    });
  },

  updateStatus(status) {
    return instance
      .put(`profile/status`, { status: status })
      .then((response) => {
        return response.data;
      });
  },
};

export const authAPI = {
  getAuthMe() {
    return instance.get(`auth/me`, {}).then((response) => {
      console.log(response);
      return response.data;
    });
  },
};
