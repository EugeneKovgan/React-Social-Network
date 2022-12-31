import { Action, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
// @ts-ignore
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import appReducer from './app-reducer';
import { ThunkAction } from 'redux-thunk';

let reducers = combineReducers({
  dialogsPage: dialogsReducer,
  profilePage: profileReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});

type RootReducerType = typeof reducers;
export type AppStateType = ReturnType<RootReducerType>;

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never;

export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

let store = createStore(reducers, applyMiddleware(thunk));
// @ts-ignore
window.store = store;

export default store;
