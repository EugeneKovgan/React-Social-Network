import { profileAPI } from "../../api/api";

const ADD_POS = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";

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
        id: 4,
        name: "New User",
        message: action.newPostText,
        likesCount: 7
      };
      return { ...state, posts: [...state.posts, newPost], newPostText: "" };

    case SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case SET_STATUS:
      return { ...state, status: action.status };

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

export default profileReducer;
