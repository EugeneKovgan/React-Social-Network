// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { profileAPI } from '../../api/profile-api';
// @ts-ignore
import { stopSubmit } from 'redux-form';
import { PostType } from '../../types/types';
import { ProfileType } from '../../types/types';
import { PhotosType } from '../../types/types';
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
  posts: [
    {
      id: 1,
      message: 'Multi-layered client-server neural-net',
      likesCount: 15,
    },
    {
      id: 2,
      message: 'Proactive didactic contingency',
      likesCount: 12,
    },
    {
      id: 3,
      message: 'Face to face bifurcated interface',
      likesCount: 17,
    },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType | ReturnType<typeof stopSubmit>>;

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'ADD_POS':
      let newPost = {
        id: uuidv4(),
        name: 'New User',
        message: action.newPostText,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost] };
    case 'SET_USER_PROFILE':
      return { ...state, profile: action.profile };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'DELETE_POST':
      return { ...state, posts: state.posts.filter((p) => p.id !== action.postId) };
    case 'SAVE_PHOTO_SUCCESS':
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
    default:
      return state;
  }
};

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: 'ADD_POS',
      newPostText,
    } as const),

  setUserProfile: (profile: ProfileType) =>
    ({
      type: 'SET_USER_PROFILE',
      profile,
    } as const),

  deletePost: (postId: number) =>
    ({
      type: 'DELETE_POST',
      postId,
    } as const),

  setStatus: (status: string) =>
    ({
      type: 'SET_STATUS',
      status,
    } as const),

  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: 'SAVE_PHOTO_SUCCESS',
      photos,
    } as const),
};

export const getUserProfile =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.getProfileInfo(userId);
    dispatch(actions.setUserProfile(response));
  };

export const getStatus =
  (userId: number): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response));
  };

export const updateStatus =
  (status: string): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (!response.resultCode) {
      dispatch(actions.setStatus(status));
    }
  };

export const savePhoto =
  (file: File): ThunkType =>
  async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (!response.data.resultCode) {
      dispatch(actions.savePhotoSuccess(response.data.data));
    }
  };

export const saveProfile =
  (profile: ProfileType): ThunkType =>
  async (dispatch, getState) => {
    const userId = getState().auth.id;
    let response = await profileAPI.saveProfile(profile);
    if (!response.data.resultCode) {
      if (userId != null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error('user cant be null');
      }
    } else {
      console.log(response.data.messages[0]);
      dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
      return Promise.reject(response.data.messages[0]);
    }
  };

export default profileReducer;
