import { instance, ResponseType } from './api';
import { PhotosType, ProfileType } from '../types/types';

export const profileAPI = {
  getProfileInfo(userId: number) {
    return instance.get<ProfileType>(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },

  getStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`).then((response) => {
      return response.data;
    });
  },

  updateStatus(status: string) {
    return instance.put<ResponseType>(`profile/status`, { status: status }).then((response) => {
      return response.data;
    });
  },
  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append('image', photoFile);
    return instance.put<ResponseType<PhotosType>>('profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put<ResponseType>('profile', profile);
  },
};
