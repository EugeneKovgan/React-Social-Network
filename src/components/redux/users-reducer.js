import { userAPI } from "../../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((item) => {
          if (item.id === action.userId) {
            return { ...item, followed: true };
          }
          return item;
        })
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((item) => {
          if (item.id === action.userId) {
            return { ...item, followed: false };
          }
          return item;
        })
      };
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.count };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId)
      };
    }
    default:
      return state;
  }
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });

export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  currentPage
});

export const setTotalUsersCount = (totalUsersCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount
});

export const setIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching
});

export const setFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId
});

export const requestUsers = (page, pageSize) => {
  return async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page));
    let response = await userAPI.getUsers(page, pageSize);
    dispatch(setIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
  };
};

export const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
  dispatch(setFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (!response.data.resultCode) {
    dispatch(actionCreator(userId));
  }
  dispatch(setFollowingProgress(false, userId));
};

export const follow = (userId) => {
  return async (dispatch) => {
    let apiMethod = userAPI.follow.bind(userId);
    followUnfollowFlow(dispatch, userId, apiMethod, followSuccess);
  };
};

export const unfollow = (userId) => {
  return async (dispatch) => {
    let apiMethod = userAPI.unfollow.bind(userId);
    followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
  };
};

export default usersReducer;
