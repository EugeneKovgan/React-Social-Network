import { v4 as uuidv4 } from "uuid";
import { profileAPI } from "../../api/api";
import { stopSubmit } from "redux-form";

const ADD_POS = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

let initialState = {
  posts: [
    {
      id: 1,
      name: "Leanne Graham",
      message: "Multi-layered client-server neural-net",
      likesCount: 15
    },
    {
      id: 2,
      name: "Ervin Howell",
      message: "Proactive didactic contingency",
      likesCount: 12
    },
    {
      id: 3,
      name: "Clementine Bauch",
      message: "Face to face bifurcated interface",
      likesCount: 17
    }
  ],
  profile: null,
  status: ""
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POS:
      let newPost = {
        id: uuidv4(),
        name: "New User",
        message: action.newPostText,
        likesCount: ""
      };
      return { ...state, posts: [...state.posts, newPost], newPostText: "" };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };
    case SAVE_PHOTO_SUCCESS:
      return { ...state, profile: { ...state.profile, photos: action.photos } };

    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POS,
  newPostText
});

const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile
});

const setStatus = (status) => ({
  type: SET_STATUS,
  status
});

const savePhotoSuccess = (photos) => ({
  type: SAVE_PHOTO_SUCCESS,
  photos
});

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await profileAPI.getProfileInfo(userId);
  dispatch(setUserProfile(response));
};

export const getStatus = (userId) => async (dispatch) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response));
};

export const updateStatus = (status) => async (dispatch) => {
  let response = await profileAPI.updateStatus(status);
  if (!response.data.resultCode) {
    dispatch(setStatus(status));
  }
};

export const savePhoto = (file) => async (dispatch) => {
  let response = await profileAPI.savePhoto(file);
  if (!response.data.resultCode) {
    dispatch(savePhotoSuccess(file));
  }
};

export const saveProfile = (profile) => async (dispatch, getState) => {
  const userId = getState().auth.id;
  let response = await profileAPI.saveProfile(profile);
  // debugger
  if (!response.data.resultCode) {
    dispatch(getUserProfile(userId));
  } else {
    console.log(response.data.messages[0]);
    dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
    return Promise.reject(response.data.messages[0]);
  }
};

export default profileReducer;
