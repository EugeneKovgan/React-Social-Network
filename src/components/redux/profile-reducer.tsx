// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { profileAPI } from '../../api/api';
// @ts-ignore
import { stopSubmit } from 'redux-form';
import { PostType } from '../../types/types';
import { ProfileType } from '../../types/types';
import { PhotosType } from '../../types/types';

const ADD_POS = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const DELETE_POST = 'DELETE_POST';

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
  newPostText: '',
};

type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POS:
      let newPost = {
        id: uuidv4(),
        name: 'New User',
        message: action.newPostText,
        likesCount: 0,
      };
      return { ...state, posts: [...state.posts, newPost], newPostText: '' };
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case DELETE_POST:
      return { ...state, posts: state.posts.filter((p) => p.id !== action.postId) };
    case SAVE_PHOTO_SUCCESS:
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };
    default:
      return state;
  }
};
type AddPostActionCreatorActionType = { type: typeof ADD_POS; newPostText: string };
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorActionType => ({
  type: ADD_POS,
  newPostText,
});
type SetUserProfileActionType = { type: typeof SET_USER_PROFILE; profile: ProfileType };
const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});
type DeletePostActionType = { type: typeof DELETE_POST; postId: number };
const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
});
type SetStatusActionType = { type: typeof SET_STATUS; status: string };
const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
});
type SavePhotoSuccessActionType = { type: typeof SAVE_PHOTO_SUCCESS; photos: PhotosType };
const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getProfileInfo(userId);
  dispatch(setUserProfile(response));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  let response = await profileAPI.updateStatus(status);
  if (!response.data.resultCode) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(file);
  if (!response.data.resultCode) {
    dispatch(savePhotoSuccess(file));
  }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.id;
  let response = await profileAPI.saveProfile(profile);
  if (!response.data.resultCode) {
    dispatch(getUserProfile(userId));
  } else {
    console.log(response.data.messages[0]);
    dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
