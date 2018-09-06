import { createAction } from 'typesafe-actions';
import { AppReducer, mapReducers, ReducerMap } from '../../lib/ReduxHelpers';
import { IAuthenticatedContext } from '../../models';

/* ------------- Types and Action Creators ------------- */

export interface IAuthPayloadSuccess {
  authContext: IAuthenticatedContext
}

const actions = {
  authSuccess: createAction('auth/SUCCESS', resolve => (payload: IAuthPayloadSuccess) => resolve(payload)),
  authLogout: createAction('auth/LOGOUT'),
};


export const AuthActions = actions;

export type IAuthenticationState =
  { authenticated: false } |
  {
    authenticated: true;
    authContext: IAuthenticatedContext;
  };

/* ------------- Initial State ------------- */

export const INITIAL_STATE: IAuthenticationState = {
  authenticated: false
};

/* ------------- Reducers ------------- */

const authSuccess: AppReducer<IAuthenticationState, IAuthPayloadSuccess> = (
  state: IAuthenticationState,
  { payload }) => {

  return {
    ...state,
    authenticated: true,
    ...payload
  }
};

const authLogout: AppReducer<IAuthenticationState, undefined> = (
  state: IAuthenticationState
) => {
  return {
    authenticated: false
  }
}

/* ------------- Hookup Reducers To Types ------------- */

const reducerMap: ReducerMap<typeof actions, IAuthenticationState> = {
  authSuccess,
  authLogout
};


export const AuthenticationReducer = mapReducers(
  INITIAL_STATE,
  reducerMap,
  actions
);

export default AuthenticationReducer;
