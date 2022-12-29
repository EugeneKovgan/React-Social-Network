import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { userAPI } from '../../api/api';
import { UserType } from '../../types/types';
import { AppStateType } from './redux-store';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>, //array of users id's
};

type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map((item) => {
          if (item.id === action.userId) {
            return { ...item, followed: true };
          }
          return item;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((item) => {
          if (item.id === action.userId) {
            return { ...item, followed: false };
          }
          return item;
        }),
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
          : state.followingInProgress.filter((id) => id !== action.userId),
        // state.followingInProgress.find((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

type ActionsTypes =
  | FollowSuccessActionType
  | UnfollowSuccessActionType
  | SetUsersActionType
  | SetCurrentPageActionType
  | SetTotalUsersCountActionType
  | SetIsFetchingActionType
  | SetFollowingProgressActionType;

type FollowSuccessActionType = { type: typeof FOLLOW; userId: number };
export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId });

type UnfollowSuccessActionType = { type: typeof UNFOLLOW; userId: number };
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId });

type SetUsersActionType = { type: typeof SET_USERS; users: Array<UserType> };
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });

type SetCurrentPageActionType = { type: typeof SET_CURRENT_PAGE; currentPage: number };
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type SetTotalUsersCountActionType = { type: typeof SET_TOTAL_USERS_COUNT; count: number };
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

type SetIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING; isFetching: boolean };
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type SetFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
  isFetching: boolean;
  userId: number;
};
export const setFollowingProgress = (isFetching: boolean, userId: number): SetFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const requestUsers = (page: number, pageSize: number) => {
  return async (dispatch: DispatchType, getState: GetStateType) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(page));
    let response = await userAPI.getUsers(page, pageSize);
    dispatch(setIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
  };
};

export const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType
) => {
  dispatch(setFollowingProgress(true, userId));
  let response = await apiMethod(userId);
  if (!response.data.resultCode) {
    dispatch(actionCreator(userId));
  }
  dispatch(setFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = userAPI.follow.bind(userId);
    _followUnfollowFlow(dispatch, userId, apiMethod, followSuccess);
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    let apiMethod = userAPI.unfollow.bind(userId);
    _followUnfollowFlow(dispatch, userId, apiMethod, unfollowSuccess);
  };
};

export default usersReducer;
