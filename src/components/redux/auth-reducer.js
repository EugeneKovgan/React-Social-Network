import { authAPI, userAPI } from "../../api/api";

const SET_USERS_DATA = "SET_USERS_DATA";

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS_DATA:
      return { ...state, ...action.data, isAuth: true };
    default:
      return state;
  }
};

const setAuthUserData = (id, email, login) => ({
  type: SET_USERS_DATA,
  data: { id, email, login },
});

export const getAuthUserData = () => (dispatch) => {
  authAPI.getAuthMe().then((response) => {
    if (response.resultCode === 0) {
      let { id, login, email } = response.data;
      dispatch(setAuthUserData(id, email, login));
    }
  });
};

export default authReducer;
